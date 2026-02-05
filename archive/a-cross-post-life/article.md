slug: a-cross-post-life
published: Fri, 10 Mar 2023 at 03:47 AM
updated: Thu, 05 Feb 2026 23:53:19 
title: A Cross Post Life
author: Brian Schrader
tags:software,programming
status: publish

I use [Pine.blog][2] for microblogging, and following the Post Once Sindicate Elsewhere strategy, I like to have those updates automatically cross-posted to other platforms like [Micro.Blog][3] and [Twitter][4] so that they gain a larger audience, and so that anyone who wants to can follow me no matter which platform or software they prefer.

Obviously I'm not manually posting to five different sites&mdash;that's what computers are for&mdash;and so I need some way to automate that work. Micro.blog makes most of that very easy since it can automatically ingest content from an RSS feed and not only add it to my microblog there, but also cross-post it to Twitter. That only leaves Mastodon out in the cold.

In recent months there's been a lot of [new activity][6] on Mastodon and I've really enjoyed seeing a larger segment of people discover such a great open-web focused tool. It was well past time that I add Mastodon to my cross-posting workflow, but there was a problem: Mastodon's posts are text only (with links at the bottom&mdash;like Twitter), but Pine.blog outputs HTML (or Markdown). I tried several tools, but each one would mangle my posts or just include the raw HTML as the text, neither of which was an acceptable solution. I needed something custom.

So I [wrote a script][1]! It runs every few minutes on the Raspberry Pi under my desk checking for new posts from Pine.blog and posting them to Mastodon. It starts with the raw Markdown, parses the HTML, strips and appends links, and even keeps track of what has and hasn't been posted before. It's a pretty handy script and I encourage you to check it out if you need something like it. I even made use of one of Mastodon's very handy features: `Idepotency-Key` which helps prevent duplicate entries from being posted in a short period of time.

As of today my posts are now [Live On Mastodon][3], so you can rest assured that if you follow me there you aren't missing a beat. You'll get all... **five posts** I've made this year!

[1]: https://gist.github.com/Sonictherocketman/7951ec710b7be1f675e2e95cbcc5220e
[2]: https://pine.blog/
[3]: https://micro.blog/sonicrocketman
[4]: http://twitter.com/sonicrocketman
[5]: http://mastodon.social/@sonicrocketman
[6]: /archive/on-the-web-the-best-outcome-is-email/
