slug: code-lasts-whether-you-know-it-or-not
published: Sun, 04 Nov 2018 at 06:52 PM
updated: Thu, 05 Feb 2026 23:15:21 
title: Code Lasts Whether You Know it or Not
author: Brian Schrader
tags: software, blogging, code
status: publish

When I [first wrote the code][first] to generate this site, and the 4 [other][second] times I've [rewritten it][third] before settling on the current implementation, I don't know if I thought I'd still be blogging, let alone still relying on that code over six years later. To its credit, the code still works well, the last time I touched it was to upgrade to Python 3 in 2016 to get full unicode support 🎉, and back in July to fix a bug with JSONFeed dates, but in 2018 it's definitely showing its age.

A pile of mostly undocumented bash and Python scripts and **a bunch** of fragile Python path hacks have allowed me to write these words and so many more over the past 6 years. To this day the site doesn't have a real archive page where posts are collected by year or month, it's just a giant, single page list of articles. Back when I wrote it, I didn't think I'd have enough posts to ever need that, or that if I did, I'd cross that bridge then. I didn't. I've swept it under the rug as a nice-to-have feature for years, and honestly if it became an issue, I'd probably just move to a real system like Jekyll or Wordpress; it'd be so much easier.

I'm reminded of something I saw on Twitter the other day:

<img
    alt="An example of some old code that lives on"
    src="/images/blog/an-old-bug.jpg"
    style="max-width:80%;"
/>

The code we write exists for as long as [it's being used][tw].


[first]: /archive/the-new-new-cms/
[second]: /archive/thinking-about-redoing-my-blog-engine/
[third]: /archive/rewritten/
[tw]: https://twitter.com/Foone/status/1058676834940776450
