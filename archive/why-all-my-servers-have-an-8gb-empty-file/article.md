slug: why-all-my-servers-have-an-8gb-empty-file
published: Thu, 25 Mar 2021 at 06:39 PM
updated: Sun, 25 Feb 2024 22:33:19 
title: Why All My Servers Have an 8GB Empty File
author: Brian Schrader
tags: marco, software development, web dev
status: publish

Last night I was listening to the latest [Under the Radar][utr], where Marco Arment dove into nerdy detail about his recent [Overcast][fm] server issues. The discussion was great, and you should listen to it, but Marco's recent server troubles were pretty similar to my own [server issues][post] from last year, and so I figured I'd share my life-hack solution for anyone out there with the same problem.


## The what and where

Both hosts, Marco Arment and David Smith, run their own servers on Linode&mdash;as do I&mdash;and I found myself nodding along in solidarity with Marco as he discussed his toils during a painful database server migration. Here's the crux of what happened in [Marco's own words][disk]:

> The disk filled up, and that's one thing you don't want on a Linux server&mdash;or a Mac for that matter. When the disk is full nothing good happens.

One thing Marco said hit me particularly close to home:

> Server administration, when you're an indie, is very lonely.

During my major downtime problem last year, I felt incredibly isolated and frustrated. There was no one to help me and no time to spare. My site was down and it was down for a while. My problem was basically the same: my database server filled up (but for a different reason). And as Marco said, when the disk is full, nothing good happens.

In the days after I fixed my server issues, I wanted to ensure that even if things got filled up again, I would never have trouble fixing the problem.


## A cheap hack? Yes. Effective? Also Yes.

On Linux servers it can be incredibly difficult for any process to succeed if the disk is full. Copy commands and even deletions can fail or take forever as memory tries to swap to a full disk and there's very little you can do to free up large chunks of space. But what if there was a way to free up a large chunk of space on disk right when you need it most? Enter the `dd` command<sup>1</sup>.

As of last year, all of my servers have an 8GB empty `spacer.img` file that does absolutely nothing except take up space. That way in a moment of full-disk crisis I can simply delete it and buy myself some critical time to debug and fix the problem. 8GB is a significant amount of space, but storage is cheap enough these days that hoarding that much space is basically unnoticeable... until I really need it. Then it makes all the difference in the world.

That's it. That's why I keep a useless file on disk at all times: so I can one day delete it. This solution is super simple, trivial to implement, and easy to utilize. Obviously the real solution is to not fill up the database server, but as with Marco's migration woes, sometimes servers do fill up because of simple mistakes or design flaws. When that time comes, it's good to have a plan, because otherwise you're stuck with a full disk and a really bad day.


<div class="footnote">
<sup>1</sup> There are <a href="https://www.cyberciti.biz/faq/howto-create-lage-files-with-dd-command/"> lots of tools you can use to do</a> this besides dd. I just prefer it.
</div>


[fm]: https://overcast.fm
[utr]: https://www.relay.fm/radar/213
[post]: /archive/pineblog-downtime-post-mortem-a-story-of-finite-resources/
[disk]: https://overcast.fm/+FgnbaF18Q/14:09
