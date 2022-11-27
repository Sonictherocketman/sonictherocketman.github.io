slug: the-little-engine-that-could
published: Sat, 26 Sep 2020 at 11:52 PM
updated: Sun, 27 Nov 2022 04:42:13 
title: The Little Engine that Could
author: Brian Schrader
tags: blogging, programming, longevity
status: publish

I originally wrote the blog engine for this site [in 2014][2]. I've added a few little features and fixed a couple of bugs over the years, but most of the code hasn't been touched or improved since it was originally written. Over the past few weeks though, I've improved the engine dramatically. I've fixed a number of  long-standing bugs, improved some of the functionality, and added multi-site and podcasting support. That said most of the code is still identical to how it was in 2014. It's crazy to me just how much value I've gotten out of that code. Not only did it teach me how to make blogging software and helped me get a handle on Python, it has powered every blog post I've written since.

After nearly 7 years, the site recently needed an overhaul. I wanted to set up a new site for my book at [goingindie.tech][1] and I originally considered just using Jekyll, or even hand-coding a single HTML page, but I eventually settled on adapting my existing blog engine to support multiple sites using a YAML configuration file. A lot of the site-wide variables were just hard-coded at the top of one of the Python files, so moving them to a YAML config was easy. After a few other fixes were in place, everything just sort of came together. I had two sites working on one blog engine.

I love seeing how code evolves over time, and how old code changes us in turn. After nearly 7 years, I'm still using the same, old blogging engine writing posts on this site. I try not to embark on refactors very often, mostly because I don't think they're valuable most of the time. But that means that, aside from a few modernizations and improvements, the work I did in 2014 is still paying off.


[1]: https://goingindie.tech
[2]: /archive/the-new-new-cms/
