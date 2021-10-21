slug: making-rss-real-time
published: Sun, 19 Oct 2014 at 11:32 PM
updated: Thu, 21 Oct 2021 at 02:27 AM
title: Making RSS Real-Time
author: Brian Schrader
tags: manton, rss
status: publish

> One of the critiques of RSS feeds in a world dominated by Facebook and Twitter is that RSS just isn't fast enough. You can't hope to achieve what Twitter calls "in-the-moment updates" and "watch events unfold" if your client is polling each web site's RSS feed once an hour for new microblog posts.

> Luckily this was solved years ago. Many blogging apps (including WordPress) have a setting to "ping" another server when a post has been published. When it receives this notification, the other server can request the RSS feed and make note of the new post right away.

[Manon](http://www.manton.org) is right. This is actually a huge issue with the [Open Microblog spec][1] right now. I'm still trying to come up with a standard way of working around this issue (if you have suggestions, [contact me][2]).

[1]: https://github.com/Sonictherocketman/Open-Microblog
[2]: http://brianschrader.com/about/

[Making RSS real-time &#8594;](http://www.manton.org/2014/10/making-rss-real-time.html)