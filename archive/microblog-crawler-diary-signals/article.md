slug: microblog-crawler-diary-signals
published: Tue, 24 Feb 2015 at 03:07 AM
updated: Thu, 05 Feb 2026 03:14:21 
title: Microblog Crawler Diary: Signals
author: Brian Schrader
tags: microblog crawler diary, signals
status: publish

I've been turning this issue over in my head all day, and I think I've got a workable solution. Here's the problem: Since the web-app and the crawler are two separate processes (completely unrelated since the crawler is a cron job and the web-app is running under mod_wsgi) they don't have any way to communicate. Normally this isn't a problem since they don't really need to communicate. The crawler does its thing, and inserts records into a cache, and the web-app reads from the cache. Simple. However, my goal now is to support server notifications for new posts. That is, when a user posts a message, any service that has registered for notifications will be pinged to let them know that a new post is available. That way the server doesn't have to poll URLs constantly to receive to-the-minute updates.

Sending these messages is simple. Receiving them is hard. Upon receiving a message, the app server needs to notify the crawler that it should go and fetch a given URL (and possibly even a given item). Interrupting a process that is completely unrelated and that could be right in the middle of something else, is not an easy problem to solve. Here's my solution though. Currently, when the crawler starts up it checks to see if there is a `pid` file in the system's temp directory. If there is, then it quits, if not it creates one and sets about its business. The pid file tells the crawler that an instance of itself is already running. The web-app will read the pid from that file, write the link it's supposed to crawl to another file, and send a signal to the crawler process with that pid. 

The crawler will have a handler for that signal that will then pause the crawling, (if it is being done) read in the link that is supposed to be crawled, and do so. Once it is done crawling, it records the link, and inserts the new post into the cache. The crawler then resumes its job of crawling the list of links, and if that link is the same as the link recorded in the signal handler, then it moves on without processing it (since it has already done so). 

It does seem a bit primitive, but it should be straight forward to implement. With this implemented, the crawler can increase its default crawling interval and fall back to just being notified if anything new comes along.

-------------

**Side note:** I will have to be careful what signals are allowed to pass to the crawler. If unchecked, spammers could easily stop the crawler dead in its tracks (since I would be essentially sending OS interrupts for every message received). To mitigate this, the web-app will keep a whitelist of servers it has requested updates from and only accept messages from those servers. 