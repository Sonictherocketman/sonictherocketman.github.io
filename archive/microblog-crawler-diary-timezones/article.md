slug: microblog-crawler-diary-timezones
published: Sun, 22 Feb 2015 at 11:20 PM
updated: Thu, 25 Mar 2021 at 08:51 PM
title: Microblog Crawler Diary: Timezones
author: Brian Schrader
tags: microblog crawler diary
status: publish

Akin to [Brent Simmons' Vesper Sync Diary][1] I think I'm gonna start posting updates and concerns that I have as I continue to develop the various parts of Microblogger. 

[1]: http://inessential.com/vespersyncdiary

So far, my biggest issue, aside from learning [Flask][2], has been constructing the user's home timeline. For those who are unfamiliar with Microblogger, basically the home timeline looks just like Twitter's timeline. It consists of a reverse chronological list of posts by people that the user follows. Since Microblogger has to construct this timeline from disparate XML feeds, I have to account for future developers not including timezones in their `pubdate` strings. 

[2]: http://flask.pocoo.org

Here's the basic problem. Consider that I have a correctly formatted microblog post:

    <item>
    	<guid>{some guid}</guid>
    	<description>Hi!</description>
    	<pubdate>Wed, Feb 28 2014 08:00:00 EST</pubdate>
    </item>

Now consider that I have an incorrectly formatted one:

    <item>
    	<guid>{some guid}</guid>
    	<description>Hi!</description>
    	<pubdate>Wed, Feb 28 2014 05:01:00</pubdate>
    </item>

Which post comes first? Initially you would think the top one would come first since it was posted after the second. However if we know that the second was posted in Pacific Standard Time, then it should actually come first, and not 3 hours behind. Accounting for bad formatting is arguably something I should hold off on doing until I encounter it, and I've thought about that a lot. However, I think I've come up with a very simple way to work around this problem for a large percentage of cases where this happens.

My workaround is to use the timezone present in the HTTP response timestamp. 

    HTTP/1.1 GET
    Date: Wed, Feb 28 2014 08:31:00 EST

This will tell me the timezone that the server is in, and from there I can assume the most likely timezone for the `pubdate` is the same.

So that's how I'm proceeding: If there is no timezone present in the `pubdate`, then use the timezone from the HTTP response header. 

