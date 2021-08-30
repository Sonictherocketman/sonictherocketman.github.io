slug: building-a-personalized-newsletter-with-bash-and-a-raspberry-pi
published: Sat, 03 Apr 2021 at 09:02 PM
updated: Mon, 30 Aug 2021 at 01:09 AM
title: Building a Personalized Newsletter with Bash and a Raspberry Pi
author: Brian Schrader
tags: programming, fun
status: publish

I use [Pinboard][pin] to save articles I've read and, increasingly, to save articles I *want* to read. That said I rarely go back and actually read things once they disappear into the Pinboard void. This isn't an uncommon problem, I know, but I think I've devised a simple solution.

I recently set up a Raspberry Pi and mounted it under my desk. I've been playing with RPis for years, but I'd never found a recurring need for them, they've always been toys with fleeting amusement value. But this time around, I've configured it as both a local web server and Samba file share. This allows me to quickly and easily share files with the RPi and, since I configured it to send emails through my Fastmail account, it can now alert me whenever I want.

## My Pinboard Weekly Newsletter

Now that everything on the RPi is set up and easily accessable, I wrote up a simple [bash script][gist] to pull my most recent bookmarks from Pinboard, filter out the stuff I've already read, and draft an email with everything from the past week that I still haven't gotten to.

I've posted a simplified version [on Github][gist], but my real script isn't much more complex&mdash;all told it comes out to 55 lines of code&mdash;and it's run with a simple, weekly cron job.

![Pinboard Weekly](/images/blog/pinboard-weekly.png)
<center><small><i>Here's a sample of the newsletter email&mdash;and yes, my RPi's name is Demin.</i></small></center>

Hopefully this weekly newsletter reminds me to actually go back and read the interesting news and articles I've collected during the week (or it will help remind me just how unimportant certain things really are when you've had a week to let them sit).

If you use Pinboard, and you constantly find yourself saving articles and never reading them, give my script a try. If you do, let me know what you think!

[gist]: https://gist.github.com/Sonictherocketman/8504244c5c916f41dc7815e28f297b86
[pin]: https://pinboard.in/
