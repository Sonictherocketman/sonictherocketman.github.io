slug: trapped-in-the-infinite-honey-pot
published: Mon, 01 Sep 2025 at 10:23 PM
updated: Thu, 05 Feb 2026 21:57:41 
title: Trapped in the Infinite Honey Pot
author: Brian Schrader
tags:funny,programming,ai
status: publish
hero: /images/blog/honeypot.png

I think I've accidentally created a honey pot for badly behaved AI bots. Let me explain:

A while back I created a joke website called the HyperWebster after the theoretical, infinite dictionary containing all possible thoughts expressible in the english language. I got the idea from [this old Vsauce video][vs]. I put it together in an afternoon, posted it on HackerNews, it went no where, then I forgot about it. Nothing eventful there. Anyway, the site is still up [if you want to try loading it][rand], but you might have a problem.

See, for the past month it's been getting slammed by bots from all over the internet trying to read or clone the entirety of human thought. (You can't say they're not ambitious little bots!)

<div class="image-center">
<img alt="A screenshot of the website in case it's down" src="/images/blog/hyperwebster.png" style="max-width: 100%;" />
<center><small>Here's a screenshot of the site in case it's not up when you read this.</small></center>
</div>

At first I suspected a poorly coded botnet was to blame for this rush of traffic and a quick check of the logs confirmed that, indeed, hundreds of different IP addresses were hitting the site all at once browsing similar pages. Since this site is isolated to its own server and not hosting anything important, I figured I'd let the bots eat their fill of my infinite dictionary and ignore the problem. After all, I'd only noticed the issue because my [uptime monitoring system][9] alerted me that the site was a little slower than normal. The traffic spiked at a few hundred requests per second, but eventually it did indeed die down and things returned to normal.

However, that's where the funny part begins.

<div class="image-center">
<img alt="An Infinite HoneyPot" src="/images/blog/honeypot.png" style="max-width: 100%;" />
<center><small>An Infinite HoneyPot</small></center>
</div>

If you check out these logs you'll notice that the User-Agent string might sound familiar. Indeed, Claude isn't alone either! Amazon, Claude, and several other big boy bots are currently consuming the HyperWebster in the vain hope of understandin all possible written thoughts! I guess I expected more from the  tech giants than to fall prey to a simple procedurally generated website, but alas this is apparently too much to ask.

I do not have a takeaway from all this, at time of writing the requests are still pouring in (at a few dozen per second). However, it is *very* funny.

Good luck, Claude. We're all counting on you.


[vs]: https://www.youtube.com/watch?v=s86-Z-CbaHA
[rand]: https://random.skyrocket.software/hyperwebster/
[9]: https://nine9s.cloud
