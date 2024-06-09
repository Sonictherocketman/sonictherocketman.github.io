slug: the-cloudbleed-bug-an-overview
published: Fri, 24 Feb 2017 at 11:06 AM
updated: Sun, 09 Jun 2024 05:13:56 
title: The Cloudbleed Bug: An Overview
author: Brian Schrader
tags: security, ssl, encryption, heartbleed
status: publish

[Tavis Ormandy (Chromium Bug Tracker) &#8594;][taviso]

> It became clear after a while we were looking at chunks of uninitialized memory interspersed with valid data. The program that this uninitialized data was coming from just happened to have the data I wanted in memory at the time...

> A while later, we figured out how to reproduce the problem. It looked like that if an html page hosted behind cloudflare had a specific combination of unbalanced tags, the proxy would intersperse pages of uninitialized memory into the output...

> We fetched a few live samples, and we observed encryption keys, cookies, passwords, chunks of POST data and even HTTPS requests for other major cloudflare-hosted sites from other users. Once we understood what we were seeing and the implications, we immediately stopped and contacted cloudflare security.


![A tweet you never want to see.](/images/blog/the-tweet-to-end-it-all.png)

Never a tweet you want to see.

[tptacek (Hacker News) &#8594;][hn]

> The crazy thing here is that the Project Zero people were joking last night about a disclosure that was going to keep everyone at work late today. And, this morning, Google announced the SHA-1 collision, which everyone (including the insiders who leaked that the SHA-1 collision was coming) thought was the big announcement.
Nope. A SHA-1 collision, it turns out, is the minor security news of the day.

[Cloudflare Blog &#8594;][blog]

> The bug was serious because the leaked memory could contain private information and because it had been cached by search engines. We have also not discovered any evidence of malicious exploits of the bug or other reports of its existence...

> We are grateful that it was found by one of the world’s top security research teams and reported to us.

This broke late last night PST, and while Travis Ormandy and the hardworking team at Cloudflare have resolved the situation, the consequences of this bug are not small. Cloudflare is a very large CDN that sits in front of tens of thousands of sites and all of them are potentially affected.

![My report](/images/blog/ac-cloudbleed-report.png)


[List of sites affected by Cloudbleed &#8594;](https://github.com/pirate/sites-using-cloudflare/blob/master/README.md)


[taviso]: https://bugs.chromium.org/p/project-zero/issues/detail?id=1139
[hn]: https://news.ycombinator.com/item?id=13718810
[blog]: https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/
