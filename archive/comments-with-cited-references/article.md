slug: comments-with-cited-references
published: Thu, 09 Feb 2017 at 12:29 PM
updated: Thu, 21 Oct 2021 at 02:27 AM
title: Comments with Cited References
author: Brian Schrader
tags: code, links,
status: publish

A while back I got into the habit of adding links to any source code that I copy from the web. It's a small addition but it's helped me a lot when I need to go back and fix bugs long after I've forgotten what I did or why.

<code class="swift"><pre>
// From: http://bit.ly/2ltsDF6
extension Data {
    /// Create hexadecimal string representation of `Data` object.
    ///
    /// - returns: `String` representation of this `Data` object.
    func hexadecimal() -> String {
        return map { String(format: "%02x", $0) }
            .joined(separator: "")
    }
}
</pre></code>

This technique is also really useful if you encounter unsupported or buggy behavior in some framework or library and you write a weird workaround or unconventional solution. In those cases I don't just document that it *is* a workaround, I try to link to a place that explains or tracks the bug (like the GitHub Issue or Stack Overflow page).

<code class="swift"><pre>
switch identifier {
case "SpecialWaitStep", "OtherSpecialWaitStep":
    // Wait steps aren't backward navigable.
    // https://github.com/ResearchKit/ResearchKit/issues/914
    return nil
default:
    return getStep("...")
}
</pre></code>

This way if anyone (future me included) needs to go back to fix that section of code, they'll at least know why that hack is there.<sup>1</sup>

<div class="footnote">
<sup>1.</sup> Hell, maybe by then the issue has been solved and they can even remove your hacky code.
</div>

<!-- Begin Syntax Stylesheet -->
<link rel="stylesheet" href="/bin/highlight.default.min.css">
<script src="/bin/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
