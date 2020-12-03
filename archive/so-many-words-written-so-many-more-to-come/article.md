slug: so-many-words-written-so-many-more-to-come
published: Mon, 06 Feb 2017 at 07:58 PM
updated: Thu, 03 Dec 2020 at 04:21 AM
title: So Many Words Written, So Many More to Come
author: Brian Schrader
tags: blog, stats, metablogging
status: publish

Apparently I'm 236 words short of 50,000 total words written for my blog over 161 posts<sup>1</sup>. That's about 309 words per post on average. I was playing around with the site just now and just out of curiosity I ran this:

    $ find archive/ -name "*.md"|xargs -I {} cat {} | wc -w
       49764

Now curious, I did some more digging to see what I could learn; here's a few different statistics:

- Longest post:
    - [A Vision of the Open Web](/archive/a-vision-of-the-open-web/) - 1574 words
- Shortest post:
    - [BloodMoon Eclipse Photos](/archive/bloodmoon-eclipse/) - 6 words
- Most average length post:
    - [Can we save the open web?](/archive/can-we-save-the-open-web/) - 309 words
- If we count all the drafts I've never published (but still have) the grand total goes up to 64,088 words.
    - That's 14,324 words unpublished.
- 154 different tags used on posts
- Most used tags:
    - blog: 21 times
    - web: 14 times
    - space: 10 times
    - open web: 10 times
    - blogging: 10 times
    - python: 8 times
- Least used tags:
    - D&D, FCC, OS X, alternatives, angular... (and 105 more)

Just for the occasion, I made up a pretty graph.

![A graph of word count.](/images/blog/post-word-count-50k-words.png)

It's hard to believe that I've been blogging for almost 5 years on this site, and if you count my two blogs before this one, then it's been almost 6 years.

And in case you're wondering: yes, this post is just over 236 words. 🎉

<div class="footnote">
<sup>1</sup> Technically that 50,000 word count includes handcrafted HTML inside a post's markdown. It's not <i>that much</i> of a factor and I'm defending my claim because technically I wrote that HTML so there.
</div>
