slug: fun-with-math-calculating-multiplicative-persistence
published: Sun, 28 Aug 2022 at 11:27 PM
updated: Thu, 05 Feb 2026 23:38:51 
title: Fun with Math: Calculating Multiplicative Persistence
author: Brian Schrader
tags: programming, tools, python, software
status: publish

I mentioned recently that one of my Raspberry Pis is mounted under my desk [and tracking the weather][1], and I've written other times about the [other tasks][4] this helpful little assistant handles for me. Today I'd like to discuss yet *another* thing that little RPi does all day &mdash; something I've been pretty excited about for some time.

But first we need to talk about a thing called Multiplicative Persistence.

### What is that?

Put very simply, Multiplicative Persistence is a little number trick you can play with integers. Here's how it works:

1. Take any number
2. Multiple the digits of the number together
3. If this number is greater than 9, do it again. Counting the number of times you do the process.

        467 -> 4 x 6 x 7 = 168 (1)
        168 -> 1 x 6 x 8 = 48  (2)
        48  -> 4 x 8     = 32  (3)
        32  -> 3 x 2     = 6   (4)

<b>Result:</b> 467 has a multiplicative persistence of 4

The goal is to find the smallest number with the greatest persistence value. The current largest persistence ever found is 11 and the smallest number is 277777788888899.

[![What's special about 277777788888899? - Numberphile][3]][2]
<center><small>You can learn more about Multiplicative Persistence by watching this great video from Numberphile.</small></center>


### What does this have to do with my Raspberry Pi?


I thought it would be fun to write a little script to calculate the known values with the smallest persistences. There are lots of little tricks you can do to speed up your script (so that you don't have to check every single value), and it was a fun little evening project. Then in June I swapped out the script for a new version that used more of the RPi's cores to speed things up a bit.

The script has been running (nearly) continuously **since February**, and by my estimates it will reach the current largest persistence value by the end of the year.

The script sends me a push notification (via [Pushover][5]) whenever it reaches a new persistence value &mdash; which is very exciting. I can't wait to get the next notification because that will mean the script has fulfilled its purpose: finding the largest known value.


### Next Steps

For no reason whatsoever, after the script reaches the current largest known value I'm going to turn it loose on some truly enormous numbers to see if it can find the next largest value.

Currently it is theorized that 11 is the largest persistence possible (among all base 10 integers), and according to Matt Parker (in the video) mathematicians have already checked every value with less than **233 digits**<sup>1</sup>, but still there are a lot more numbers to check.

Why? Because it's fun.<sup>2</sup>

[Check out the code here &#8594;](https://gist.github.com/Sonictherocketman/49361941c730b31fe5b822d8bbb1d945)

<div class="footnote" style="word-wrap: anywhere;">
<p><sup>1</sup> That's a number that looks like this: <br />
17,944,722,797,467,451,413,885,553,670,907,289,754,932,820,893,589,746,032,750,117,948,680,440,041,708,054,016,996,924,802,613,696,647,178,385,842,833,715,379,727,704,254,519,961,954,721,643,715,078,484,056,283,131,636,661,502,157,729,434,338,946,533,866,675,014,605,168,434,933,154,729,236,329,910,303,053,227</p>
<p><sup>2</sup> Because of some local changes to where San Diego's power comes from, all this computation is powered by 100% clean and renewable energy, so I don't feel bad wasting this (admittedly minute) power for nonsense like this.</p>
</div>

[1]: /archive/whether-to-monitor-the-weather-and-more/
[2]: https://www.youtube.com/watch?v=Wim9WJeDTHQ
[3]: /images/blog/222777-mp.jpg
[4]: /archive/building-a-personalized-newsletter-with-bash-and-a-raspberry-pi/
[5]: /archive/using-pushover-for-super-simple-sysadmin-alerts/
