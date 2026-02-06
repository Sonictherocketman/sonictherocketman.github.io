slug: software-performance-in-an-asmjs-world
published: Mon, 16 Nov 2015 at 10:03 AM
updated: Fri, 06 Feb 2026 00:10:33 
title: Software performance in an ASM.js world
author: Brian Schrader
tags: web, js
status: publish

There's been [a lot][1] of talk [recently][2] about using [Javascript as the
assembly language of the web][3], and tools like [ASM.js][4] 
allow developers to write code in any language they want and compile it,
instead of to a native binary, into a subset of Javascript that can be run very
efficiently in the browser. In fact, in testing Mozilla and Unreal were able to
cross compile a few modern video games in to Javascript from C and the games 
played at [half native speed!][5] Frankly, that's amazing. 

[1]: http://talkpython.fm/episodes/show/32/pypy.js-pypy-python-in-your-browser
[2]: https://www.youtube.com/watch?v=PiBfOFqDIAI
[3]: http://www.hanselman.com/blog/JavaScriptIsAssemblyLanguageForTheWebSematicMarkupIsDeadCleanVsMachinecodedHTML.aspx
[4]: https://en.wikipedia.org/wiki/Asm.js
[5]: https://www.youtube.com/watch?v=cWIRUaR9G4w 

## The Benefits of PyPy.js and ASM.js

If you've ever seen Gary Bernhart's talk, [*The Birth and Death of
Javascript*](https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript)
then you've seen this kind of thing before. One really cool project involving 
ASM.js is [PyPy.js by Ryan Kelly][5.1] which aims to be a fully compliant PyPy 
implementation running in the browser. One of the big issues with compiling a
language to Javascript has always been how to make it fast, but during 
his PyCon 2015 talk Ryan demonstrated that although the PyPy.js version was 
indeed [10x slower than the native PyPy interpreter, it was over 1.2x *faster* 
than the native CPython interpreter][6] which is the version of Python that
most of us are actually using. While that may be a testament to just how good 
the PyPy interpreter and JIT compiler are, it does have some interesting 
implications for Python on the web.

<center><pre><code class="html">&lt;script type="text/python" src="main.py"&gt;&lt;/script&gt;
</code></pre></center>

[5.1]: http://pypyjs.org
[6]: https://youtu.be/PiBfOFqDIAI?t=16m19s

Ryan has [gone on to say][7] that, in his opinion, one of the major issues with
using his PyPy.js in real world cases is that in order to begin running your
code in Python on the web, each page has to download the PyPy.js
interpreter, and it's not a small download. Currently, he says that the
interpreter weighs in around 5MB when compressed. Once it's loaded however,
the browser can cache the interpreter locally and avoid that cost in the
future. To me, initial startup time is not really the big issue though, and
while it's true that 5MB is a crazy big file to be transmitting over the web,
most sites already force users to download that [much data in ad tracking code 
alone][8]. 

[7]: http://talkpython.fm/episodes/show/32/pypy.js-pypy-python-in-your-browser
[8]: http://brianschrader.com/archive/re-the-ethics-of-modern-web-ad-blocking/

## What's the problem then?

<img alt="An example of web site memory usage" class="body-image-right" src="http://brianschrader.com/images/blog/act-mon-safari-3.png" />

In my mind, the issues facing developers using this new toolchain are not
initial file downloads or startup time costs. These are one-time costs if
developers leverage the new HTML 5 caching APIs like AppCaching and
LocalStorage. Users are already accustomed to "Installing" software and moving
that process to the web is something I'm confident designers and developers can
do well. My concern has far more to do with runtime performance, specifically
memory usage. In a world where most sites running lots of Javascript already
use **hundreds of megabytes**, full ports of the PyPy interpreter on top of
fully fledged applications are just going to make performance worse.

Web applications are immense resource hogs. What typically takes kilobytes of
memory in a native application takes megabytes on the web. Frankly, that kind
of usage is pretty unacceptable as is, and bolting an interpreter on top of
that will only make the problem worse. 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">X, my window
manager (dwm), terminal (xterm), shells (zsh), etc. add up to about 80 MB of
RAM. Chrome is using 4 GB of RAM. 50 times more.</p>&mdash; Gary Bernhardt
(@garybernhardt) <a
href="https://twitter.com/garybernhardt/status/664577127094681600">November 11,
2015</a></blockquote><script async src="//platform.twitter.com/widgets.js"
charset="utf-8"></script>

## What's the solution?

Looking at the history of programming languages and performance, you could make
the argument that this is just the next step. You could, for example, argue
that the jump from native code to interpreted languages like Python had a
similar cost in speed and performance, and I'd grant you that point. It
certainly could be that the web is the single most important and viable
development platform and that the performance costs will be worth it. 

The jump to using the web as the virtual machine in which we run the software of 
tomorrow should be one we take with caution. The speed penalties aren't large, 
and I'm happy that that's true, but with most desktop  users still having less 
than 6GB of memory and mobile users teetering around a third of that, developers 
will have to be careful not to try too much at once. Games can allocate gigabytes 
of memory and get away with it, but when a user's entire application suite is in 
the cloud, memory will be, as it almost always has been, a precious resource.

<script src="http://brianschrader.com/bin/highlight.min.js"></script>
<link rel="stylesheet"
href="http://brianschrader.com/bin/highlight.default.min.css">
<script>hljs.initHighlightingOnLoad();</script>


