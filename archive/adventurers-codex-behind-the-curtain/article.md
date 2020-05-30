slug: adventurers-codex-behind-the-curtain
published: Tue, 20 Jun 2017 at 09:52 PM
updated: Sat, 30 May 2020 at 08:39 PM
title: Adventurer's Codex: Behind the Curtain
author: Brian Schrader
tags: adventurer's codex, development, dnd
status: publish

> Our tale starts as many such tales often do. It was the end of July in the year two-thousand and fifteen by western reckoning and three friends met in a busy tavern in a sleepy neighborhood in San Diego. Their quest: to change the way Dungeons and Dragons would be played forever.

Almost two years ago, I started a project with a few friends that last year we turned into a full-on company: [Adventurer's Codex][ac-home]. For no particular reason, I've never spoken about the project here, but I'm going to change that, if nothing but for posterity. Originally I wanted to write a single "What I've learned while building Adventurer's Codex" post, but it got too big and covered so many unrelated topics that I'm just going to have to make it into a series of smaller posts.


## A Codex, But For Adventurers!

For those who don't know: Adventurer's Codex is a web-based toolset for playing 5th Edition Dungeons and Dragons (D&D 5e). It has a number of features for both players and DMs (Dungeon Masters, aka Game Masters) with a focus on real-time, collaborative play. I've played D&D for years, and so have the other two founders, and we all think that while the classic pen-and-paper version of D&D is great, there are some definite improvements to be made.

If you're interested in [seeing what Adventurer's Codex can do, checkout the site and try it out][ac-home], and if you don't know what D&D is, or you've never played, then I strongly encourage you to try it.


## No Choice but to Rise to the Challenge

Software design has always been interesting to me. I've spent countless hours learning about just how lots of mature projects, like CPython, Cocoa, and iOS, work at the high level, and how their designs limit or enhance their core features. So when it came down to designing Adventurer's Codex, I jumped at the chance. The only trouble was: I'd never actually designed anything so big before; none of us had. And so, like with many projects, the architecture for Adventurer's Codex grew as we did.

When we started, I had no idea how to professionally set up servers, design modern APIs, or design multi-tier web applications. I had this website, which I was proud of, and in-and-out of my day job I'd built lots of different types of web and native software. Coming from iOS/Cocoa and Java/Spring development at the time meant that I was always accustomed to having a very large, opinionated framework to guide the design of whatever I was building, but when it comes to front-end Javascript, that's just not the case. In the browser, we were forced/free to pick and choose our own tools, libraries, and conventions and because of this, we stumbled a lot in the early days: tearing through three different data storage strategies and three more major code architecture changes. Every one of these experiences taught us something about software design, but it also slowed us down, and nearly burnt me out, but all of that is (hopefully) behind us now.

Although getting this far has been a huge undertaking, because of the way we chose to develop Adventurer's Codex, we've been able to slowly roll out bits and pieces of infrastructure over almost a year while still having a working product. If I had to give advice for anyone in the same position: ask people who've done it before. A few invaluable people at my local programming meetup group had experience with all of the things I didn't and were more than happy to point me in the right direction. The internet is great, but it's actually pretty difficult to find out how to design modern web systems from scratch with just a vague notion and Google.

TL;DR: Turns out, designing, architecting, and managing complex software is hard...

<div class="footnote">
* Woo, broke the streak!
</div>


[ac-home]: //adventurerscodex.com/
