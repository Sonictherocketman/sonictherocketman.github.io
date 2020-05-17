slug: swift-dynamism
published: Mon, 30 May 2016 at 08:53 PM
updated: Sun, 17 May 2020 at 06:41 AM
title: Swift Dynamism
author: Brian Schrader
tags: swift, programming
status: publish

There's been a lot of talk lately about Swift's relationship with dynamic runtime features. Since I've been developing in Swift for almost two months, I'm perfectly qualified to comment on it in depth, and that's what I'm now going to do (sorry).

First off, I like Swift's syntax a lot. Trailing closures are a thing
I didn't know I needed, and while I have a few nitpicks about the language,
overall I'm really enjoying using it.<sup>1</sup> That said, I've found myself
adopting a few strange habits when writing Swift that I'm not sure are good best
practices, but they do seem to be the way that Apple wants Swift to be written. The biggest offender, and my least favorite feature: `switch-case` statements.


[Brent Simmons:][1]
> [In the old days] There were lots of switch statements. To add, for instance, a copy (or
> whatever) implementation to a particular view, you’d have to edit your event
> dispatcher to know about that particular view and its copy function. Making
> changes required making changes in various places. 

> \- Oldie Complains About the Old Old Ways
[1]: http://inessential.com/2016/05/25/oldie_complains_about_the_old_old_ways

Swift's `enums` are very powerful, but Apple's sample code uses them for so many things.<sup>2</sup> I've found myself `switch-case`-ing through `enums` in most of my ViewControllers. It not only looks ugly, but just feels wrong. 

[Gary Bernhardt:][2]
> Some apologists... [would say] that
> it's the programmer's fault for using it in this way... My own view is that 
> the behavior that you see a tool being used for is the behavior that that 
> tool encourages.

> \- The Birth and Death of Javascript (~3:30) 

[2]: https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript

Brent, and many others, seem concerned about Swift's current relationship with
dynamic features. While I don't dismiss the "old guy complaining about the
new ways" effect, I never like to discount the opinions of long-time, seasoned platform developers. They've seen these kinds of things play out before. I haven't run into most of the other issues and concerns that Brent has brought up, but I have had to write more than a few `switch-case` statements, which is more than a few too many. 


-------

<div class="footnote">
<sup>1</sup> When Swift came out, it was a hardcore <a href="http://www.oranlooney.com/lbyl-vs-eafp/">LBYL</a> language. Now that it has <code>try</code> statements, the language feels confused. I don't know which is more "Swifty".
<br />
<sup>2</sup> In Python, the community has strong opinions about what's "Pythonic". The way Apple recommends developers write Swift will have a huge influence on what becomes the "Swifty" style.
 
