// SocialSpec Validator
// --------------------
// Browser-only validator for the SocialSpec drafts (followspec, aboutspec,
// contactspec). Given a domain it fetches the three /.well-known files and
// checks each for reachability, Content-Type, CORS, and basic structure.
//
// It runs entirely in the client, so a file is only readable cross-origin if
// the target sends the Access-Control-Allow-Origin header the spec asks for —
// the CORS requirement gets verified for free.

(function () {
  const FILES = [
    {
      key: 'opml',
      label: 'following.opml',
      path: '/.well-known/following.opml',
      spec: 'followspec.org',
      specUrl: 'https://followspec.org',
      hint: 'An OPML 2.0 list of the feeds you follow (one <outline> each).',
    },
    {
      key: 'about',
      label: 'about.md',
      path: '/.well-known/about.md',
      spec: 'aboutspec.org',
      specUrl: 'https://aboutspec.org',
      hint: 'A markdown profile card with YAML front matter containing a `summary`.',
    },
    {
      key: 'vcf',
      label: 'contact.vcf',
      path: '/.well-known/contact.vcf',
      spec: 'contactspec.org',
      specUrl: 'https://contactspec.org',
      hint: 'A vCard (3.0+) with your name (FN), and ideally email and url.',
    },
  ];

  const form = document.getElementById('check-form');
  const input = document.getElementById('site-input');
  const btn = document.getElementById('check-btn');
  const summaryEl = document.getElementById('summary');
  const filesEl = document.getElementById('files');
  const embedEl = document.getElementById('embed');
  const embedHtml = document.getElementById('embed-html');
  const embedMd = document.getElementById('embed-md');
  const shareEl = document.getElementById('share');
  const shareUrlEl = document.getElementById('share-url');
  const shareCopyBtn = document.getElementById('share-copy');

  // Accepted query names for prefilling/auto-checking a site, in order.
  const PARAM_NAMES = ['domain', 'site', 'url', 'host', 'q'];

  // ── URL handling ───────────────────────────────────────────────────────────
  function normalizeSite(raw) {
    let v = (raw || '').trim();
    if (!v) return null;
    if (!/^https?:\/\//i.test(v)) v = 'https://' + v;
    let url;
    try { url = new URL(v); } catch (e) { return null; }
    // Drop a trailing path — well-known lives at the site root.
    return { base: url.origin, host: url.hostname };
  }

  function fileUrl(base, path) {
    return new URL(path.replace(/^\//, ''), base + '/');
  }

  // ── Fetching ───────────────────────────────────────────────────────────────
  // Returns {ok, status, contentType, cors, body, fetchError}.
  // A thrown fetch (TypeError) means the browser blocked it cross-origin
  // (no permissive CORS), the host was unreachable, or the request failed.
  async function fetchFile(base, path) {
    const res = { ok: false, status: 0, contentType: '', cors: false, body: '', fetchError: false };
    try {
      const r = await fetch(fileUrl(base, path), { method: 'GET', redirect: 'follow' });
      res.status = r.status;
      res.contentType = r.headers.get('Content-Type') || '';
      res.cors = true;                 // a cross-origin read succeeded
      res.ok = r.ok;                   // 200..299
      res.body = await r.text();
    } catch (e) {
      res.fetchError = true;
    }
    return res;
  }

  // ── Content-type assertions ────────────────────────────────────────────────
  // The spec names a target Content-Type; we're lenient (many static hosts
  // serve text/plain or omit it), so a wrong type is a warning, not a failure.
  function expectType(contentType, wanted) {
    const ct = (contentType || '').toLowerCase();
    if (ct.includes(wanted)) return { match: true, note: ct.split(';')[0].trim() || wanted };
    if (!ct) return { match: false, note: 'no Content-Type header' };
    return { match: false, note: ct.split(';')[0].trim() + ' (expected ' + wanted + ')' };
  }

  // ── Per-file structural checks ─────────────────────────────────────────────
  // Each returns an array of {ok:boolean, text:string, info?:boolean}.

  function checkOpml(res) {
    const checks = [
      { ok: res.ok, text: 'reachable at ' + res.path + ' (' + (res.status || 'blocked') + ')' },
    ];
    if (!res.ok) return checks;
    const type = expectType(res.contentType, 'text/x-opml');
    checks.push({ ok: type.match, info: !type.match, text: 'content type: ' + type.note });

    const doc = new DOMParser().parseFromString(res.body, 'text/xml');
    const parserErr = doc.querySelector('parsererror');
    const opml = doc.documentElement && doc.documentElement.tagName.toLowerCase() === 'opml'
      ? doc.documentElement : null;

    checks.push({ ok: !parserErr && !!opml, text: 'valid OPML document' });
    if (opml) {
      const version = opml.getAttribute('version');
      checks.push({ ok: version === '2.0', info: version !== '2.0', text: 'opml version 2.0' + (version && version !== '2.0' ? ' (found ' + version + ')' : '') });
      const title = opml.querySelector('head title');
      checks.push({ ok: !!title && !!title.textContent.trim(), info: true, text: 'has a <head><title>' });
      const outlines = Array.from(opml.querySelectorAll('outline')).filter(function (o) {
        return o.getAttribute('xmlUrl');
      });
      const named = outlines.filter(function (o) { return o.getAttribute('text'); });
      checks.push({
        ok: outlines.length > 0,
        text: outlines.length > 0
          ? outlines.length + ' feed' + (outlines.length === 1 ? '' : 's') + ' listed' + (named.length < outlines.length ? ' (' + named.length + ' named)' : '')
          : 'no <outline xmlUrl=...> entries found',
      });
    }
    return checks;
  }

  function checkAbout(res) {
    const checks = [
      { ok: res.ok, text: 'reachable at ' + res.path + ' (' + (res.status || 'blocked') + ')' },
    ];
    if (!res.ok) return checks;
    const type = expectType(res.contentType, 'text/markdown');
    checks.push({ ok: type.match, info: !type.match, text: 'content type: ' + type.note });

    const body = res.body || '';
    const trimmed = body.replace(/^﻿/, '').trim();
    const hasFence = /^---\s*$/m.test(trimmed);
    checks.push({ ok: hasFence, text: 'has YAML front matter (--- … ---)' });

    // Look for a `summary:` key within the opening fence.
    let summaryOk = false;
    if (hasFence) {
      const m = trimmed.match(/^---\s*\n([\s\S]*?)\n---/);
      if (m) summaryOk = /^\s*summary\s*:/m.test(m[1]);
    }
    checks.push({ ok: summaryOk, text: 'front matter includes a `summary` key' });

    const words = (body.split(/\s+/).filter(Boolean)).length;
    checks.push({ ok: words > 1, info: true, text: words + ' words of markdown body' });
    return checks;
  }

  function checkVcf(res) {
    const checks = [
      { ok: res.ok, text: 'reachable at ' + res.path + ' (' + (res.status || 'blocked') + ')' },
    ];
    if (!res.ok) return checks;
    const type = expectType(res.contentType, 'text/vcard');
    checks.push({ ok: type.match, info: !type.match, text: 'content type: ' + type.note });

    const body = (res.body || '').replace(/^﻿/, '');
    checks.push({ ok: /\bBEGIN:VCARD\b/i.test(body) && /\bEND:VCARD\b/i.test(body), text: 'contains a BEGIN/END:VCARD block' });
    checks.push({ ok: /^\s*VERSION:[34]\.0/im.test(body), info: !/^\s*VERSION:4\.0/im.test(body), text: 'declares VERSION (prefers 4.0)' });
    checks.push({ ok: /^\s*FN:.\+/im.test(body), text: 'has a display name (FN)' });
    checks.push({ ok: /^\s*EMAIL:.\+/im.test(body), text: 'has an email (EMAIL)' });
    checks.push({ ok: /^\s*URL:.\+/im.test(body), text: 'has a url (URL)' });
    return checks;
  }

  const CHECKERS = { opml: checkOpml, about: checkAbout, vcf: checkVcf };

  // ── Status aggregation ─────────────────────────────────────────────────────
  // fail  → present but structurally broken, or unreachable
  // pass  → reachable and all hard checks hold
  // warn  → reachable but one or more hard checks soft-failed (e.g. only warnings)
  function statusFor(res, checks) {
    if (!res.ok) return 'fail';
    const hardFail = checks.some(function (c) { return c.ok === false && c.info === false; });
    // Warnings (info:true) alone → warn; a real structural failure → warn too,
    // since the file is present at least.
    return hardFail ? 'warn' : 'pass';
  }

  const PILL = {
    pass: { cls: 'pass', label: 'supports' },
    warn: { cls: 'warn', label: 'partial' },
    fail: { cls: 'fail', label: 'missing' },
    wait: { cls: 'wait', label: 'checking' },
  };

  // ── Rendering ──────────────────────────────────────────────────────────────
  function renderFile(fkey, res, checks, status) {
    const f = FILES.filter(function (x) { return x.key === fkey; })[0];
    const li = (function (c) {
      const cls = c.info ? 'info' : (c.ok ? 'ok' : 'no');
      return '<li class="' + cls + '">' + escapeHtml(c.text) + '</li>';
    });
    return {
      html:
        '<div class="file">' +
          '<div class="file-head">' +
            '<code>' + f.label + '</code>' +
            '<span class="pill ' + PILL[status].cls + '">' + PILL[status].label + '</span>' +
          '</div>' +
          '<ul class="checks">' + checks.map(li).join('') + '</ul>' +
          (status === 'wait' ? '' :
            '<p style="margin:.6rem 0 0;color:var(--muted);font-size:.74rem;">' +
              f.hint + ' <a href="' + f.specUrl + '" target="_blank" rel="noopener" style="border-bottom:1px solid var(--border);">' + f.spec + '</a>' +
            '</p>') +
        '</div>',
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderSummary(statuses, host) {
    const pass = statuses.filter(s => s === 'pass').length;
    const warn = statuses.filter(s => s === 'warn').length;
    const label = host + '';
    let score, cls, msg;
    if (pass === 3) {
      score = 3; cls = 'pass';
      msg = 'Fully supports SocialSpec — all three files present and valid.';
    } else if (pass + warn > 0) {
      score = pass; cls = 'partial';
      msg = 'Partially supports SocialSpec (' + pass + ' of 3 fully valid' + (warn ? ', ' + warn + ' present with issues' : '') + ').';
    } else {
      score = 0; cls = 'fail';
      msg = 'No valid SocialSpec files found' + (statuses.every(s => s === 'fail') ? ' — files may be missing, or not served with CORS.' : '.');
    }
    summaryEl.innerHTML =
      '<div style="display:flex;align-items:baseline;gap:.6rem;">' +
        '<span class="score ' + cls + '">' + score + '/3</span>' +
        '<span>' + escapeHtml(msg) + '</span>' +
      '</div>';
    summaryEl.style.display = 'block';

    if (pass === 3) renderEmbed(host);
    else embedEl.style.display = 'none';

    showShare(host);
  }

  function showShare(host) {
    const url = validatorSelfUrl(host);
    shareUrlEl.textContent = url;
    shareUrlEl.dataset.url = url;
    shareCopyBtn.textContent = 'Copy';
    shareEl.style.display = 'flex';
  }

  function validatorSelfUrl(host) {
    return location.origin + location.pathname + '?domain=' + encodeURIComponent(host);
  }

  function renderEmbed(host) {
    const url = validatorSelfUrl(host);
    embedHtml.textContent =
      '<a href="' + url + '" rel="noopener">SOCIAL&nbsp;SPEC ✓</a>';
    embedMd.textContent =
      '[SOCIAL SPEC ✓](' + url + ')';
    embedEl.style.display = 'block';
  }

  // ── Run a full check ───────────────────────────────────────────────────────
  async function check(rawSite) {
    const site = normalizeSite(rawSite);
    if (!site) {
      summaryEl.style.display = 'block';
      summaryEl.innerHTML = '<span class="score fail">?</span> <span>Could not parse that as a domain. Try <code>example.com</code>.</span>';
      filesEl.innerHTML = '';
      return;
    }

    embedEl.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Checking…';
    summaryEl.style.display = 'none';
    filesEl.innerHTML = FILES.map(function (f) {
      const res = { ok: false, path: f.path, status: 0, contentType: '', body: '' };
      return renderFile(f.key, res, [{ ok: false, info: true, text: 'checking…' }], 'wait').html;
    }).join('');

    const results = await Promise.all(FILES.map(function (f) {
      return fetchFile(site.base, f.path);
    }));

    const statuses = results.map(function (res, i) {
      const f = FILES[i];
      const checks = CHECKERS[f.key](res);
      const status = statusFor(res, checks);
      const node = renderFile(f.key, res, checks, status);
      return { key: f.key, status: status, html: node.html };
    });

    filesEl.innerHTML = statuses.map(function (s) { return s.html; }).join('');
    renderSummary(statuses.map(function (s) { return s.status; }), site.host);

    btn.disabled = false;
    btn.textContent = 'Check';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    check(input.value);
  });

  // Copy the share link for the last-checked site. Prefers the async
  // Clipboard API; falls back to a temporary textarea so it also works
  // over non-secure contexts where the clipboard is unavailable.
  shareCopyBtn.addEventListener('click', function () {
    const url = shareUrlEl.dataset.url || shareUrlEl.textContent;
    function done(ok) {
      shareCopyBtn.textContent = ok ? 'Copied ✓' : 'Copy failed';
      setTimeout(function () { shareCopyBtn.textContent = 'Copy'; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { done(true); }, function () { fallback(); });
    } else {
      fallback();
    }
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
  });

  // Deep link: ?domain=example.com (or ?site / ?url / ?host / ?q) prefills
  // the input and triggers an immediate check.
  const params = new URLSearchParams(location.search);
  const prefill = PARAM_NAMES.map(function (n) { return params.get(n); }).find(Boolean);
  if (prefill) {
    input.value = prefill;
    check(prefill);
  }
})();
