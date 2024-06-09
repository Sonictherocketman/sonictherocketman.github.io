slug: remembering-things-is-hard
published: Sun, 03 Nov 2019 at 06:59 PM
updated: Sun, 09 Jun 2024 05:13:52 
title: Remembering Things is Hard
author: Brian Schrader
tags: code, software, preflight, git
status: publish

I'm not very good at remembering things, even simple things, and I'm even worse at grinding (doing a simple or repetitive task more than once). That's one reason why I love being a developer: often times, I can script simple, repetitive, and common tasks.

When it comes to development, although most of my projects leverage some form of automated continuous testing and linting, by the time I've pushed up my code and the tests have run, I've moved on to some other task. This means that when my code has a failing test or a linting error, I have to stop the new thing that I'm doing, stash my changes, and fix the error. I *should* remember to run the tests before I push my code, but I never do.

So in lieu of doing the hard work to remember to run the tests and becoming a better person in the process, I've written a `pre-commit` script that runs before I commit my code. That way I can't commit my code without fixing the error, or explicitly ignoring it (with the `-n` flag).*

<div class="footnote">
* This also helps avoid the unprofessional looking "Fixes linting" commits.
</div>

----

Here's my `.git/hooks/pre-commit` file for any Django project. Give it a shot yourself and let me know if it helps you write better code.

<pre><code class="bash">#! /bin/bash
set -e;
log() { echo "[$(date)] $1"; }

cat << EOF
-----------------------------------
Running the tests...
You might want to get a coffee. ☕️
-----------------------------------
log "Linting the code..."
flake8
log "Running the tests..."
./manage.py test
log "Done."
</code></pre>


<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
