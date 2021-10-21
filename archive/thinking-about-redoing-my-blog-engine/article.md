slug: thinking-about-redoing-my-blog-engine
published: Sat, 11 Oct 2014 at 10:04 PM
updated: Thu, 21 Oct 2021 at 02:27 AM
title: Thinking about redoing my blog engine
author: Brian Schrader
tags: blog engine, programming
status: publish

I think I've decided to go ahead and ditch my web host and switch my blog over to Linode. I could just move the Git repo and transfer the domain, but leaving a web host for a VPS provider gives me a lot more freedom with how I could run my site.

I'm looking into tweaking my blog engine to support Dropbox integration like [Second Crack][sc] does. I always liked that system, but my current web host doesn't allow that; Linode does (Linode really doesn't care what I do).

[sc]: https://github.com/marcoarment/secondcrack

I'm pretty sold on the idea, and I just need to figure out how I'm going to do it. I'd also like to be able to publish posts from my phone and iPad, so I'm going to have to figure out how to do that too. Since the site is run by committing from a local Git repo to the web server (something that wouldn't be easily done on iOS), I'm going to have to come up with something. 