slug: re-the-ethics-of-modern-web-ad-blocking
published: Sun, 16 Aug 2015 at 11:39 AM
updated: Fri, 06 Feb 2026 00:29:27 
title: Re: The ethics of modern web ad-blocking
author: Brian Schrader
tags: web, blocking, traffic
status: publish

In the last week, there's been a lot of talk about Marco's article on the ethics of of web ad-blocking.

[Marco Arment:](http://www.marco.org/2015/08/11/ad-blocking-ethics)

> Because of how the web and web browsers work, the involuntary data collection starts if you simply follow a link. There’s no opportunity for disclosure, negotiation, or reconsideration. By following any link, you unwittingly opt into whatever the target site, and any number of embedded scripts from other sites and tracking networks, wants to collect, track, analyze, and sell about you...

> And it’s all getting so much worse, so quickly.

> I’ve never been tempted to run ad-blocking software before — I make most of my living from ads, as do many of my friends and colleagues, and I’ve always wanted to support the free media I consume. But in the last few years, possibly due to the dominance of low-quality ad networks and the increased share of mobile browsing (which is far less lucrative for ads, and more sensitive to ad intrusiveness, than PC browsing), web ad quality and tolerability have plummeted, and annoyance, abuse, misdirection, and tracking have skyrocketed…

> Modern web ads and trackers are far over the line for many people today, and they’ve finally crossed the line for me, too. Just as when pop-ups crossed the line fifteen years ago, technical countermeasures are warranted.

> Web publishers and advertisers cannot be trusted with the amount of access that today’s browsers give them by default, and people are not obligated to permit their web browsers to load all resources or execute all code that they’re given.



I used to run ad blockers, but in the last few years I'd stopped using them for all but the most egregious offenders. This week though, I started using [Ghostery][g], and the amount of trackers and beacons it blocks by default is amazing. Ghostery's most interesting feature is the little number badge it puts at the top of each page that tells you how many 3rd party trackers, beacons, and ads are running on each page, and it's pretty scary sometimes. Some pages average 10-12 trackers! That's a lot of javascript, and a lot of behind-the-scenes tracking. [The Verge][v], for example, has 15… 15!

[v]: http://www.theverge.com

![The badge](http://brianschrader.com/images/blog/the-badges-ghostery.png)

So far I'm not blocking ads per say, just a lot of trackers. I've left Google Analytics unblocked along with many traffic monitoring services because if I'm going to run analytics on my site, then it'd be hypocritical of me to block them. 

[g]: https://www.ghostery.com/en/

The guys on [ATP][atp], this week, talked a bit about their differing opinions on web ad-blocking. As always, John Siracusa had a really interesting take on the whole thing (audio below).

[atp]: http://atp.fm/episodes/130

[John Siracusa](http://atp.fm/episodes/130):

> On this battle between users, and websites, and browser vendors and whatever, I try to, in my actions with the stuff that I install, I try to... [put] the sites that I care about on like a whitelist. The sites that I care about that have just become too obnoxious, I feel like I have to send them a signal, "I like your site, I like these things, but autoplay video is just not happening. I'm going to install things that are going to stop that." 

> If the only way that you can exist is with autoplaying video then I'm sorry, I don't want you to exist...

> There's no obligation on either side. They put something listening on a port listening at an IP address, and they welcome the entire world to make requests to it to receive that information and we can do whatever the hell we want with that information. I can redirect it to a file, I can run it through Lynx, or I can show it in a web browser but just not request any of the flash, and not request any of the Javascript trackers... That's just the negotiation. There's nothing ethical about it; it's purely practical. 

<center>
    <audio controls>
        <source type="audio/mp3" src="http://brianschrader.com/audio/atp130_johns_take.mp3">
    </audio>
</center>

He makes a very good argument. I do feel some sort of obligation to website owners, but I also feel like I can go back on my side of the implied agreement if I feel like the website has crossed a line, which many do.

Though it was on a totally different topic (i.e. taxes and STOP signs), I think John Roderick made a very valid observation on this week's [Road Work][rw] (audio below).<sup>1</sup>

[rw]: http://5by5.tv/roadwork 

[John Roderick](http://5by5.tv/roadwork/1):

> [Laws are really] mutual agreements and mutual agreements that I am invested in, and not a slave to, not an unthinking pawn, but a conscious aware and engaged and involved person... part of it is you have to think of each law and think, "Why is this a law? Why do we have this law?" And that's fun... 

> If you think about why we tax, and what the purpose of taxing is, you realize that, oh yeah, of course that system is incomplete, and of course there are opportunities for people to abuse it, but more often the taxations system is so big and it has to fill so many obligations... but you think, yes I want the things that taxes buy... and I pay them. Does it hurt a little bit? Yes. Am I mad a little bit? Yes. But I understand and agree... The same is true all the way down to STOP signs in the middle of nowhere... 

<center>
    <audio controls>
        <source type="audio/mp3"
src="http://brianschrader.com/audio/roadwork-001_johns_take.mp3">
    </audio>
</center>

I feel like all three of them are saying roughly the same thing, albeit John Roderick's opinion was in regards to running stop signs in the middle of the night. I feel that there is some implied expectation that says, "The reason I can view your content for free is because I see your ads." I also feel that it is my job to be a diligent member of the community and make my own decisions when sites step over the line, but also to tolerate the base level of tracking and advertising since it's something most websites need to have in order to remain free.

These agreements we have, implied or not, imply that website owners agree not abuse us with the ads and the trackers they send, and they imply that we, the readers, understand why they send them and that we agree to participate in them. However, all of these agreements we have, or feel that we have, are mutual. If they've not held up their end of the bargain, then I am not obligated to hold up my end. 

Most sites have not only let their end fall, but are now telling us to carry both ends. Until this changes, the deal's off.

-------

<sup>1</sup> I know that John Roderick's argument was taken out of context, but I think it just fits so well. I hope I haven't construed it too much. I felt the idea was so relevant to this conversation, I just had to include it.   


