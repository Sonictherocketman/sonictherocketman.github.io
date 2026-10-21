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
  const profileEl = document.getElementById('profile');
  const shareEl = document.getElementById('share');
  const shareUrlEl = document.getElementById('share-url');
  const shareCopyBtn = document.getElementById('share-copy');

  // Accepted query names for prefilling/auto-checking a site, in order.
  const PARAM_NAMES = ['domain', 'site', 'url', 'host', 'q'];

  // ── URL handling ───────────────────────────────────────────────────────────
  function normalizeSite(raw) {
    let v = (raw || '').trim();
    if (!v) return null;
    // Default to the protocol this page was served under so it also works in
    // dev over http (e.g. http://localhost:8000); an explicit scheme wins.
    if (!/^https?:\/\//i.test(v)) v = location.protocol + '//' + v;
    let url;
    try { url = new URL(v); } catch (e) { return null; }
    // Keep host (with any port, for dev) for display/share/deep-links, and the
    // full origin for fetching. Trailing paths are irrelevant — well-known
    // lives at the site root.
    const host = url.hostname + (url.port ? ':' + url.port : '');
    return { base: url.origin, host: host };
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

    checks.push({ ok: !parserErr && !!opml, required: true, text: 'valid OPML document' });
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
    checks.push({ ok: hasFence, required: true, text: 'has YAML front matter (--- … ---)' });

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
    checks.push({ ok: /\bBEGIN:VCARD\b/i.test(body) && /\bEND:VCARD\b/i.test(body), required: true, text: 'contains a BEGIN/END:VCARD block' });
    checks.push({ ok: /^\s*VERSION:[34]\.0/im.test(body), info: !/^\s*VERSION:4\.0/im.test(body), text: 'declares VERSION (prefers 4.0)' });
    // `[^:]*` allows property params (e.g. EMAIL;PREF=1:...) before the colon,
    // and `.+` is one-or-more (the earlier `.\+` matched a literal plus).
    checks.push({ ok: /^\s*FN[^:]*:.+/im.test(body), text: 'has a display name (FN)' });
    checks.push({ ok: /^\s*EMAIL[^:]*:.+/im.test(body), text: 'has an email (EMAIL)' });
    checks.push({ ok: /^\s*URL[^:]*:.+/im.test(body), text: 'has a url (URL)' });
    return checks;
  }

  const CHECKERS = { opml: checkOpml, about: checkAbout, vcf: checkVcf };

  // ── Profile preview ────────────────────────────────────────────────────────
  // Pull a single field out of a vCard body (content lines are KEY:VALUE, any
  // params on the key line are ignored). Returns null when absent/empty.
  function vcfField(body, key) {
    const m = body.match(new RegExp('^\\s*' + key + '.*?:(.+)$', 'im'));
    if (!m) return null;
    const val = m[1].trim();
    return val ? val : null;
  }

  // Pull the `summary` front-matter value and the markdown body (everything
  // after the closing fence) out of an about.md file.
  function aboutData(res) {
    const out = { summary: null, body: '' };
    if (!res || !res.ok) return out;
    const trimmed = (res.body || '').replace(/^﻿/, '').trim();
    const m = trimmed.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (m) {
      const fm = m[1];
      const sm = fm.match(/^\s*summary\s*:\s*(.+)$/m);
      if (sm) {
        let val = sm[1].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        out.summary = val || null;
      }
      out.body = m[2].trim();
    } else {
      // No front matter at all — treat the whole file as the body.
      out.body = trimmed;
    }
    return out;
  }

  // Render an about body (real markdown) to HTML, safely. Uses marked for full
  // markdown (reference links, headings, lists, raw HTML blocks, …) and
  // DOMPurify to strip anything unsafe before it's inserted. If either lib
  // failed to load, fall back to escaping so a raw file can still never run.
  function mdToHtml(md) {
    let html;
    if (typeof window.marked !== 'undefined' && window.marked.parse) {
      html = window.marked.parse(md);
    } else {
      return escapeHtml(md);
    }
    if (typeof window.DOMPurify !== 'undefined') {
      html = window.DOMPurify.sanitize(html, { ADD_ATTR: ['target', 'rel'] });
    }
    return html;
  }

  // After inserting the rendered HTML, point relative links/images at the
  // subject site (a bare /archive/… in someone's about.md shouldn't resolve
  // against the validator's own origin) and force new tabs on links.
  function fixLinks(root, base) {
    root.querySelectorAll('a[href]').forEach(function (a) {
      const h = a.getAttribute('href');
      if (h && h.charAt(0) === '/' && h.charAt(1) !== '/') a.setAttribute('href', base + h);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
    root.querySelectorAll('img[src]').forEach(function (img) {
      const s = img.getAttribute('src');
      if (s && s.charAt(0) === '/' && s.charAt(1) !== '/') img.setAttribute('src', base + s);
    });
  }

  // The list of feeds from the following OPML (display name + feed/home URL).
  function opmlFeeds(res) {
    if (!res || !res.ok) return [];
    const doc = new DOMParser().parseFromString(res.body, 'text/xml');
    if (doc.querySelector('parsererror')) return [];
    const opml = doc.documentElement;
    if (!opml || opml.tagName.toLowerCase() !== 'opml') return [];
    return Array.from(opml.querySelectorAll('outline'))
      .filter(function (o) { return o.getAttribute('xmlUrl'); })
      .map(function (o) {
        const xmlUrl = o.getAttribute('xmlUrl');
        let home = xmlUrl;
        try { home = new URL(xmlUrl).origin + '/'; } catch (e) {}
        return { name: (o.getAttribute('text') || '').trim() || home, feed: xmlUrl, home: home };
      })
      .slice(0, 24); // keep the card tidy if someone follows a lot
  }

  function initials(name) {
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  // Build "as much as the files allow": each section appears only when its
  // underlying data is present, mirroring how the spec's own demo degrades.
  function buildProfile(opts) {
    const host = opts.host;
    const vcf = opts.results.vcf;
    const about = opts.results.about;
    const opml = opts.results.opml;

    const name = vcfField(vcf.body, 'FN');
    const email = vcfField(vcf.body, 'EMAIL');
    const website = vcfField(vcf.body, 'URL');
    const aboutInfo = aboutData(about);
    const feeds = opmlFeeds(opml);

    const hasOverview = !!(aboutInfo.summary || email || website);
    const hasAbout = !!aboutInfo.body;
    const hasFollowing = feeds.length > 0;

    // Nothing at all → don't render the card.
    if (!name && !hasOverview && !hasAbout && !hasFollowing) {
      profileEl.style.display = 'none';
      profileEl.innerHTML = '';
      return;
    }

    const handle = (website ? new URL(website).hostname : host) || host;

    const tabs = [];
    if (hasOverview) tabs.push({ id: 'overview', label: 'Overview' });
    if (hasAbout) tabs.push({ id: 'about', label: 'About' });
    if (hasFollowing) tabs.push({ id: 'following', label: 'Following' + (feeds.length ? ' · ' + feeds.length : '') });
    const activeId = tabs.length ? tabs[0].id : null;

    let html = '<div class="profile-card">';

    // Identity.
    html += '<div class="profile-head">' +
      '<div class="profile-ava">' + escapeHtml(initials(name)) + '</div>' +
      '<div class="profile-id">' +
        (name ? '<div class="profile-name">' + escapeHtml(name) + '</div>' : '') +
        '<div class="profile-handle">🔗 ' + escapeHtml(handle) + '</div>' +
      '</div>' +
    '</div>';

    // Tab bar.
    html += '<div class="ptabbar">';
    tabs.forEach(function (t) {
      html += '<button type="button" class="ptab' + (t.id === activeId ? ' active' : '') + '" data-tab="' + t.id + '">' + escapeHtml(t.label) + '</button>';
    });
    html += '</div>';

    // Overview: bio + contact links.
    if (hasOverview) {
      html += '<div class="ptab-panel" data-panel="overview"' + (activeId !== 'overview' ? ' hidden' : '') + '>';
      if (aboutInfo.summary) html += '<p class="profile-bio">' + escapeHtml(aboutInfo.summary) + '</p>';
      if (email || website) {
        html += '<div class="profile-links">';
        if (email) html += '<a href="mailto:' + escapeHtml(email) + '">✉ ' + escapeHtml(email) + '</a>';
        if (website) html += '<a href="' + escapeHtml(website) + '" target="_blank" rel="noopener">🌐 ' + escapeHtml(new URL(website).hostname) + '</a>';
        html += '</div>';
      }
      html += '</div>';
    }

    // About: full markdown body (rendered safely, relative links re-pointed).
    if (hasAbout) {
      html += '<div class="ptab-panel" data-panel="about"' + (activeId !== 'about' ? ' hidden' : '') + '>';
      html += '<div class="profile-about">' + mdToHtml(aboutInfo.body) + '</div>';
      html += '</div>';
    }

    // Following: chip list of feeds.
    if (hasFollowing) {
      html += '<div class="ptab-panel" data-panel="following"' + (activeId !== 'following' ? ' hidden' : '') + '>';
      html += '<div class="chips">' + feeds.map(function (f) {
        let domain = '';
        try { domain = new URL(f.home).hostname; } catch (e) { domain = f.home; }
        const label = f.name && f.name !== f.home && f.name !== domain ? f.name : domain;
        return '<span class="chip">' +
          '<img src="//www.google.com/s2/favicons?domain=' + encodeURIComponent(domain) + '&sz=32" alt="" loading="lazy" onerror="this.remove()">' +
          (label ? '<a href="' + escapeHtml(f.home) + '" target="_blank" rel="noopener">' + escapeHtml(label) + '</a>' : '<span>' + escapeHtml(domain) + '</span>') +
        '</span>';
      }).join('') + '</div>';
      html += '</div>';
    }

    html += '</div>' + '<hr class="profile-divider">';
    profileEl.innerHTML = html;
    profileEl.style.display = 'block';

    // Re-point any relative links/images in the rendered about body to the
    // subject site, and force links to open in new tabs.
    if (hasAbout && opts.base) {
      const aboutPanel = profileEl.querySelector('[data-panel="about"] .profile-about');
      if (aboutPanel) fixLinks(aboutPanel, opts.base);
    }

    // Small inline tab switching. Re-added each check (profile.innerHTML
    // was replaced, so previous listeners are already gone).
    profileEl.querySelectorAll('.ptab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.dataset.tab;
        profileEl.querySelectorAll('.ptab').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        profileEl.querySelectorAll('.ptab-panel').forEach(function (p) {
          p.hidden = (p.dataset.panel !== id);
        });
      });
    });
  }

  // ── Status aggregation ─────────────────────────────────────────────────────
  // Checks carry `info` (pure note — never affects status) and, for the ones
  // that must hold, `required` (true → a real fail if missed). Everything else
  // that fails is a soft "issues" state.
  //   fail  → unreachable, or a required structural check missed
  //   warn  → reachable, required checks pass, but one or more others missed
  //   pass  → reachable and all checks hold
  function statusFor(res, checks) {
    if (!res.ok) return 'fail';
    const reqFail = checks.some(function (c) { return c.ok === false && c.required; });
    if (reqFail) return 'fail';
    const softFail = checks.some(function (c) { return c.ok === false && !c.info; });
    return softFail ? 'warn' : 'pass';
  }

  const PILL = {
    pass: { cls: 'pass', label: 'pass' },
    warn: { cls: 'warn', label: 'issues' },
    fail: { cls: 'fail', label: 'fail' },
    wait: { cls: 'wait', label: 'checking' },
  };

  // One-word status, used in the summary breakdown line.
  const STATUS_WORD = { pass: 'pass', warn: 'issues', fail: 'fail' };

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
    // Overall verdict: worst file status wins.
    let cls, verdict;
    if (statuses.every(s => s.status === 'pass')) {
      cls = 'pass'; verdict = 'pass';
    } else if (statuses.some(s => s.status === 'pass')) {
      cls = 'partial'; verdict = 'issues';
    } else {
      cls = 'fail'; verdict = 'fail';
    }

    // Breakdown line so the total is always traceable to the cards below.
    // Each status word is colored to match its per-file card.
    const breakdown = statuses.map(function (s) {
      return s.label + ': <span class="brk brk-' + s.status + '">' +
        STATUS_WORD[s.status] + '</span>';
    }).join('  ·  ');

    let msg;
    if (cls === 'pass') {
      msg = 'All three SocialSpec files are present and well-formed.';
    } else if (statuses.every(s => s.status === 'fail')) {
      msg = 'No SocialSpec files could be read — they may not exist, or the site may not send CORS headers.';
    } else {
      msg = 'Some SocialSpec files passed, but others need fixes (details below).';
    }

    summaryEl.innerHTML =
      '<div style="display:flex;align-items:baseline;gap:.6rem;">' +
        '<span class="score ' + cls + '">' + verdict + '</span>' +
        '<span style="color:var(--muted);font-size:.85rem;">' + escapeHtml(msg) + '</span>' +
      '</div>' +
      '<div style="margin-top:.35rem;color:var(--muted);font-size:.82rem;">' +
        breakdown +
      '</div>';
    summaryEl.style.display = 'block';

    showShare(host);
  }

  function showShare(host) {
    // Only offer a share link for a site actually entered in the box.
    if (!(input.value || '').trim()) {
      shareEl.style.display = 'none';
      return;
    }
    const url = validatorSelfUrl(host);
    shareUrlEl.textContent = url;
    shareUrlEl.dataset.url = url;
    shareCopyBtn.textContent = 'Copy';
    shareEl.style.display = 'flex';
  }

  function validatorSelfUrl(host) {
    return location.origin + location.pathname + '?domain=' + encodeURIComponent(host);
  }

  // ── Run a full check ───────────────────────────────────────────────────────
  async function check(rawSite) {
    const site = normalizeSite(rawSite);
    if (!site) {
      shareEl.style.display = 'none';
      profileEl.style.display = 'none';
      summaryEl.style.display = 'block';
      summaryEl.innerHTML = '<span class="score fail">?</span> <span>Could not parse that as a domain. Try <code>example.com</code>.</span>';
      filesEl.innerHTML = '';
      return;
    }

    // Update the URL so the checked site is shareable/bookmarkable.
    if (history.replaceState) {
      history.replaceState(null, '', location.pathname + '?domain=' + encodeURIComponent(site.host));
    }

    shareEl.style.display = 'none';
    profileEl.style.display = 'none';
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

    const byKey = {};
    results.forEach(function (res, i) { byKey[FILES[i].key] = res; });
    buildProfile({ host: site.host, base: site.base, results: byKey });

    const statuses = results.map(function (res, i) {
      const f = FILES[i];
      const checks = CHECKERS[f.key](res);
      const status = statusFor(res, checks);
      const node = renderFile(f.key, res, checks, status);
      return { key: f.key, label: f.label, status: status, html: node.html };
    });

    filesEl.innerHTML = statuses.map(function (s) { return s.html; }).join('');
    renderSummary(statuses, site.host);

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
