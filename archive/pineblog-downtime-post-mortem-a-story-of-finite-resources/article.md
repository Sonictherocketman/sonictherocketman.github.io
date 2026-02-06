slug: pineblog-downtime-post-mortem-a-story-of-finite-resources
published: Mon, 17 Feb 2020 at 04:57 AM
updated: Fri, 06 Feb 2026 00:29:27 
title: Pine.blog Downtime Post-Mortem: A Story of Finite Resources
author: Brian Schrader
tags: postmortem, pine.blog, what-happened
status: publish

Pine.blog was down for a while today (~6 hours). What follows is a bit about why and what I've learned from the experience. In the end, nothing was lost and the site is back up. My apologies to all of my users; thanks for your patience.

----

Today did not go as planned. As I do, this morning I opened Pine.blog to read the news and instead of seeing a newly updated timeline, the app had logged me out. Worse still, I couldn't log back in, and the website wasn't responding. Sigh.

Some quick investigation revealed that the disk had filled, which caused the creation of new sessions and access tokens to fail. Admittedly, I don't have any sort of disk usage monitoring on the database server, but because I'd just doubled the amount of storage on that server less than two months ago, I wasn't really thinking it would fill up anytime soon. Regardless, it had.


### The Causes

From what I can tell, a combination of external factors and my own design decisions led to the disk filling up much faster than I was expecting:

1. **Feeds are kinda huge (sometimes).** A few Pine.blog users have feeds that seem to contain hundreds of new items every hour, which Pine.blog will faithfully parse and store in their timelines. In some cases, this meant that such a feed could contain 200,000+ items in only a few weeks. What's worse is that because of a recent change to how timelines work, a timeline can't hold that many items anymore which means Pine.blog was storing a ton of data it would never actually use.

2. **Pine.blog stores a lot of data.** By design, Pine.blog doesn't really delete items that it has previously parsed and it stores multiple copies of certain data to make it easier to serve, but this drastically inflates storage requirements.

3. **I misunderstood my tools.** I'm not a database guy; I'm an app developer. To me Postgres has always been a bit magical, and today that bit me. About a month ago, I thought I'd read somewhere that the newest versions of Postgres didn't need to be routinely vacuumed, and that running a daily vacuum was an old, outdated practice, so I stopped doing it. *This was a bad idea*. Without that daily cleaning, the Pine.blog database couldn't reuse space that it no longer needed, and so it kept asking the OS for more disk space, right up until there wasn't any more.

In the end it was the mundane, but powerful combination of a few small things that caused the issues today: some overzealous design choices, a few misunderstandings, and a few overactive feeds.


### The Solutions

Right away, I should admit this whole thing could have been solved a lot sooner. I underestimated the issue at first and tried to keep the site up while I fixed the issue. In hindsight it would have been a lot faster and easier to resize the server to something that had more disk space, vacuum the database, resize the filesystem and scale back down. This whole thing could have been solved in 1-2 hours instead of 6-8.

That said, here's the two things that I'll be changing about how Pine.blog works in order to prevent this problem in the future:

1. The nightly vacuum is back. Removing it was a dumb idea.

2. **Pine.blog will no longer store the entire history of external feeds.** This one isn't fully in effect yet, but expect the change soon.

As of recently, each Pine.blog timeline has a maximum length of 3000 posts. Once a post falls off the end, you won't be able to find it by scrolling backward in your timeline anymore. This is exactly what Twitter does (although their limit is a modest 800 posts). Feeds will soon do something similar. Pine.blog will keep just the most recent posts in a feed (~3-5000 posts in total) and anything beyond that point will be removed from Pine.blog's database.<sup>1</sup>

I suspect that no one will actually notice these changes once they're rolled out, but to me they mark the end of the road for a naive dream I had back when I started Pine.blog.

<center>
**tl;dr** Turns out parsing and storing entire portions of the web is hard.
</center>

<div class="footnote">
<sup>1.</sup> Hosted blogs are uneffected. Pine.blog will store your entire blog . This change only effects feeds from outside of Pine.blog.
</div>
