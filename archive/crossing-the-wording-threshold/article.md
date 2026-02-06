slug: crossing-the-wording-threshold
published: Wed, 27 Apr 2022 at 03:07 AM
updated: Fri, 06 Feb 2026 00:29:27 
title: Crossing the Wording Threshold
author: Brian Schrader
tags: meta, blogging, stats
status: publish

A few years ago, I wrote [a post][1] about the number of words this blog contained. Well, that was then; this is now, and those counts have changed pretty drastically in the intervening time.

Using the same method as before, I can now report that this blog contains just over 100,000 words spread across 270 posts! A pretty significant achievement.

    $ find archive/ -name "*.md"|xargs -I {} cat {} | wc -w
      101042

I also remade the previous graph for comparison.

![A histogram of the binned words per post](/images/blog/words-per-post-2.png)

It seems like I've written more 300-400 word posts than before which explains the smoothing out in the middle section of the chart.

For those keeping score at home, the new longest post is [this one][2] from 2017.

### A Terrifying Realization

It occurred to me that my last post about this topic was back in 2017&mdash;5 years ago!&mdash;and that means I'm very quickly approaching my 10 year blogging anniversary.<sup>1</sup> It's hard to believe it's been so long, but I guess it has.

The first post on this site was back in December of 2012, which is just months away. I'll save the reminiscing for the retrospective post, but for now I'll just admit that it's a lovely coincidence that I reached 100,000 words on my 10 year anniversary.


<div class="footnote">
<sup>1</sup> If you count my first two blogs (which are now gone from the web) it has already been ten years, but let's not do that.
</div>


[1]: /archive/so-many-words-written-so-many-more-to-come/
[2]: /archive/mygenerank-behind-the-scenes-of-the-newest-researchkit-app/
