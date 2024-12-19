slug: gits-hidden-feature-notes
published: Sun, 04 Mar 2018 at 08:37 PM
updated: Thu, 19 Dec 2024 20:03:54 
title: Git's Hidden Feature: Notes
author: Brian Schrader
tags: git, development, software, programming
status: publish

When I'm programming I tend to create a lot of experimental branches to test my ideas before actually implementing them, and a lot of times I'll leave these branches in some half-state or with uncommitted changes. Then when I come back I've forgotten what I was doing and why. After running into exactly this problem earlier today, I started wondring if there was something built into Git that would give me a place to write notes to myself without committing.

Well, apparently there is: Git has built in notes!

According [to the docs][docs] you can use the command `git notes` which:

> Adds, removes, or reads notes attached to objects, without touching the objects themselves.

It's always exciting for me to discover a cool new tool, and even more so when I learn more about one I already use.

[Git Notes Documentation &#8594;][docs]

[docs]: https://git-scm.com/docs/git-notes
