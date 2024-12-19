slug: a-drawing-every-day
published: Sat, 19 Nov 2022 at 09:17 PM
updated: Thu, 19 Dec 2024 20:03:53 
title: A Drawing Every Day!
author: Brian Schrader
tags: fun,programming
status: publish

[<img
    alt="Today's Drawing of the Day. Yes it is live"
    src="https://home.brianschrader.com/drawing-of-the-day/latest.png"
    style="max-height: 300px; border-radius: 4px;"
    class="image-right"
/>][3]

I love to just mess around with computers. It's a fun way to spend an idle evening, and last night I set up a little script that could generate random line drawings using my little [pdraw][1] project from [a while back][2]. The script generates a new image every day and places it in a web-accessible place that I can then link to. This morning I finished up my little project by adding another script that can generate an RSS feed for the list of images and voila!

You can find [each day's Drawing of the Day here][3]. The page also has its own, dedicated [RSS Feed][4] so give that a follow if you're interested.

The script to generate all of this was a fun little experiment that involved `pdraw`, `imagemagick`, and `xvfb`. As with all bash projects it involves no shortage of little hacks (including but not limited to a manual, string-joining, feed-generator function). Overall its a great example of just how powerful simple tools can be.

As an aside, it was projects like this that were my original introduction to programming and to this day they continue to be one of the most fun parts of it for me. Don't get me wrong, I do enjoy building fully-fledged web apps, but throwing [little scripts together][5] is also a ton of fun. Hopefully you all enjoy these daily line drawings as much as I enjoyed making them available.

[1]: https://github.com/sonictherocketman/pdraw
[2]: https://brianschrader.com/archive/generating-deterministic-procedural-artwork-with-pdraw/
[3]: /archive/drawing-of-the-day
[4]: https://home.brianschrader.com/drawing-of-the-day/rss.xml
[5]: /archive/take-a-break-script-something/
