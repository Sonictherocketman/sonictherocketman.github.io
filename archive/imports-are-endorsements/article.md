slug: imports-are-endorsements
published: Thu, 20 May 2021 at 06:00 PM
updated: Thu, 05 Feb 2026 23:15:21 
title: Imports are Endorsements
author: Brian Schrader
tags: software development, programing
status: publish

When you import someone's code, are you endorsing them?

At first glance, the answer might seem simple: of course not! And while it's pretty obvious that imports are not universal endorsements of the code's author, they aren't entirely void of meaning either. Endorsements aren't an indivisible quanta&mdash;some fundamental particle that cannot be divided&mdash;they exist on a spectrum.


## Supply chains are tricky things

Importing code written by someone else is always a risky endeavor. Most often external dependencies work and work well, but they also expose your software to additional risk. The fact that you are willing to depend on someone else's code implies some kind of inherent bond of trust. It implies a relationship between the developer (or organization) and the code author. Importantly, it also implies that the developer finds the author's code valuable in some way.

Dependencies are part of a software's digital supply chain&mdash;along with any other provider we use to power our software. And in today's world, where alternative dependencies abound, many people understand that the various links in the supply chain aren't simply bound together out of mutual necessity. They choose to depend on each other, and so there are shared values and responsibilities that are common to all in the chain.

Using an example out of the news, Apple doesn't manufacture many of the components in its devices, yet when it's partner Foxconn is found to be abusing workers, we place some of that blame on Apple for choosing to work with Foxconn given their past behavior. Similarly, Google and Microsoft do not generate their own power, yet they've made efforts to rid their supply chains of fossil fuels, and the public has&mdash;rightly&mdash;heaped praise on them for these actions. From fashion to technology we understand that companies are somewhat responsible for choosing ethical and responsible supply chain partners. Why should developers be any different?


## Our decisions matter

I think most people would agree with the decision not to use software written by an outspoken white-supremacist, but even that extreme example implies that there is some threshold where the author's views would impact the technical decision to use a given toolset. The literature, music, and film worlds are well-accustomed to this debate. Authors leave a mark on their work. How big that mark is remains a subject of debate, but there's no debate that the author has at least some impact.

Obviously big tech companies and organizations don't suffer because one company decides not to use their stuff&mdash;ideas require collective, industry-wide action to produce results.

The point is that our decisions to use Facebook's frameworks, Google's toolsets, Apple's platforms, or Amazon's services must be informed by their creators' behaviors and policies. Sometimes these decisions will be good for business, and sometimes not. Other times they might be incredibly beneficial or utterly unremarkable. Regardless of their effects, these decisions matter.

Some readers might bemoan this idea, claiming that I'm making software political, but everything is political in some form. Software doesn't exist in a vacuum and there are real consequences to our choices that echo beyond the apps and websites we build.

Whether we like it or not, the role of engineers is to manipulate the real world to achieve some end, and how we do that work has just as much import as what end we achieve.

I, for one, am driven to do what I can to mitigate the effects of Climate Change, so I host all of my new services [in data centers powered by renewable energy][1] and I'm working on migrating my existing services there as well. My hosting platform is a part of my digital supply chain, and I bear some responsibility for the emissions my services produce. The downside is that those servers are in Europe now, so my ping times suffer a bit, but to me that tradeoff was worth making.

Destinations matter, but the road to the destination matters too. Developers achieve our ends through importing other people's code, and those imports matter. Choose yours well.


[1]: https://nine9s.cloud/kb/infrastructure
