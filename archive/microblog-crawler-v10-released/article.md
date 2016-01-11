slug: microblog-crawler-v10-released
published: Sat, 29 Nov 2014 at 08:35 PM
updated: Mon, 11 Jan 2016 at 11:10 AM
title: Microblog Crawler v1.0 Released
author: Brian Schrader
tags: python, microblogcrawler
status: publish

Today, I'm proud to announce that version 1.0 of my Microblog/RSS feed crawler is released. It's [up on GitHub][1] for all to see and installation is as easy as:

`pip install microblogcrawler`

[1]: https://github.com/Sonictherocketman/microblog_crawler

From the README:

> [The MicroblogCrawler is a] basic feed crawler/parser for traversing microblog and RSS feeds.

Some quick notes about the project:

- It's written in Python.
- It's my first project to be officially released on PyPi
- This crawler is actually an offshoot project from my [Microblogger][2] project. 
- The crawler's API is modeled after the [Tweepy][3] StreamListener API.
- The crawler is 241 lines long, and a significant portion of those line are documentation (~35%).

[2]: https://github.com/Sonictherocketman/Microblogger
[3]: https://github.com/tweepy/tweepy

If this project interests you, please check it out. I'd love feedback on the design and ideas for improvements!

[MicroblogCrawler: GitHub &#8594;](https://github.com/Sonictherocketman/microblog_crawler)