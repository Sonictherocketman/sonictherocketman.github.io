slug: mygenerank-behind-the-scenes-of-the-newest-researchkit-app
published: Wed, 25 Oct 2017 at 10:11 AM
updated: Fri, 06 Feb 2026 00:10:33 
title: MyGeneRank: Behind the Scenes of the Newest ResearchKit App
author: Brian Schrader
tags: django, software, technical overview, review, researchkit
status: publish


I'm super excited to announce that [MyGeneRank][mgr], an app that I've been working on at my jobby-job at the [Scripps Translational Science Institute][stsi] for a year and a half, is now available on the [App Store][itunes], and the source code is [available on GitHub][api]!

I've wanted to talk about this project for a while, I've written many unpublished posts about how it works, and now the time is finally right. If you're looking for the scientific or research parts, I'm going to leave that to [the paper we published][paper]. I want to talk more about my experiences and what I've learned in building the system.

As a quick overview: MyGeneRank is a ResearchKit based research study app aimed at providing users with their Genetic Risk for diseases, and measuring their reactions to this information. The first disease being Coronary Artery Disease. I'm definitely not a doctor, statistician, or biologist, and everyone else on the team handled all of the scientific work, but I am a Software Developer and I worked on the vast majority of the [API][api], Computation Engine, [Website][mgr], and [iOS App][itunes] development, DevOps, and System Administration as the sole developer. I learned a hell of a lot during the last year and a half and looking back, I'm not sure how I even got this far. Since the source code is available, at least for the API, (iOS source is coming) so now you too can see my mistakes and pass judgement! 🎉


## From a Technical Perspective

Vaguely, MyGeneRank's backend has three main parts: a database ([Postgres][pgt]), a Django REST API (which is open source), and what we've called a Computation Engine. All of it runs in-house, maintained by yours truly. The API and database are pretty self-explanatory, and the "engine" is really a Celery cluster and Redis queue which runs, among other things, a series of Python wrapped command-line tools and custom R scripts to calculate a person's genetic risk given their [23andMe][23andMe] [genotype data][23andMe-api]. While the computation stuff is a sort of special case (what with the CLI tools and R scripts), the API's design goal was to be as industry-standard practice as possible. It's 90% covered with tests, leverages Travis-CI, uses [DRF][drf] and [Celery][cel] for the vast majority of its work, and everything runs in Docker containers on CentOS.

If this stack sounds familiar to readers of this site, then you're catching on. In my post about [Adventurer's Codex's stack][ac] I spelled out basically the same setup. In truth the stack for AC was heavily influenced by MyGeneRank. I took everything I learned building MyGeneRank and ported it to Adventurer's Codex a year later. That's how developers work, we do things once, then copy-pasta it everywhere.


## Scientific Computing at Scale: Performance and Throughput

MyGeneRank has very demanding computational needs. Currently, we have **178 cores and almost a terabyte of RAM** powering the app and its backend. Turns out, calculating a person's genetic risk, even using genotyping data and not [NGS][ngs], requires a lot of computational power. Scaling this kind of intense scientific computation for public use was one of the most challenging (and enjoyable) parts of the project. But even now I don't really have many concrete answers to the problem other than the twin suggestions: add more cores and make your work as functional and therefore parallel as possible.


#### Into the Weeds for a Bit

The calculations needed to return a given user's genetic risk score can be broken into roughly 110 individual tasks and is mostly trivial to parallelize. What takes ~110 minutes of CPU time per user can be done in 3.5-4 minutes of wall time on our current system, but as any web developer knows, even that kind of processing time is hard to scale. The first couple tasks are run in series and then two chunks of tasks are run in parallel. The first chunk contains a single task which calculates the user's genetic ancestry, and the other chunk has 52 two-part tasks. This means that at any one time, 53 tasks per user are running during the bulk of the computation. These first 52 tasks take ~1.5-1.8 minutes each depending on which chromosome they're processing ([some are bigger than others][smiths]) and then the second batch takes about the same amount of time per chunk. The genetic ancestry takes ~3.2 minutes. Once all of these tasks are complete there's a final step that calculates the actual risk score, which is fairly instantaneous. What this means is that the time from start to finish for a given user's score is parallelize-able up to ~54 cores, then it's core speed that matters, which is harder to improve. The extra cores we have allows us to calculate more scores at once, but **even with our huge core count, we can only calculate ~3-4 users' scores at a time**. The good news is that all of the steps are really good at keeping memory use low; CPUs are the bottleneck here.

Improving API and Website level performance is much more straightforward than doing the same for the backend. Like most sites, MyGeneRank sits behind an Nginx Reverse Proxy with some out of the box microcaching for popular pages.

At time of writing, I'm not sure what the load will be like when we finally announce the study publicly, but I've spent a lot of time worrying about and trying to ensure that the site can handle the loads we hope for. There's been a [lot][t-1] of [interesting][t-2] [news][t-4] and [blog posts][t-3] over the years about what kind of download numbers an app, and especially a research app can expect, and I wanted to build MyGeneRank with those kinds of numbers in mind. Once the project has hit its first month I'm going to do a retrospective on how it all went and we'll see if my performance enhancements were enough.


## Lessons Learned

There's a lot of little things that I've learned in building MyGeneRank (and later Adventurer's Codex). When we started, I'd worked on a few toy iOS apps and  a few corporate web projects, but MyGeneRank turned out to be of a completely different scale.

Before MyGeneRank, I'd never used Django, or Django REST. I'd heard of them, and had a friend who used them, but aside from a few [toy projects][coffee] in Flask, my web experience was in front-ends or Java/Spring (and I guess PHP). My work at that time was mostly in writing [analysis pipelines in Python][metapipe] and since it's my preferred language, I wanted to use it for MyGeneRank. To this day, the structure of the API project is a little wonky and apps aren't where they should be; both are cruft from those early days. I try not to worry about it too much since I was learning as I went, and this kind of legacy cruft is impossible to avoid unless you knew everything at the start, and we most assuredly didn't. I can say that Django/Django REST has shown me just how boring building websites really is because it does most of it for you automatically and supports anything you'd ever really need right out of the box; you should definitely use it.

The modern web is really complex and there's a reason that it takes so many skilled developers to build large systems. Server setup, administration, DevOps, reporting, and application development are all sub-disciplines unto themselves (which is why they're separate jobs at most places). And I've found that jumping in and out of these different worlds can result in a sort of Programmer's Jet Lag as your body adjusts to the new environment after spending days in a completely different one.

On the native side, Apple's frameworks can be fun to use, and their OS frameworks, documentation, and user guides are world-class, but their tooling can also be frustrating and slow at times. The iOS app is written entirely in Swift and that has had some major effects on the development. Swift's tooling is still very new and the language has changed drastically since it came out. Having worked in both, I can say that, while I do enjoy Swift, nothing has made me appreciate the maturity of Python more.

Overall, my advice for building these kinds of systems is the same as when I wrote a [similar post about Adventurer's Codex][ac-1]:

> ...ask people who've done it before... The internet is great, but it's actually pretty difficult to find out how to design modern web systems from scratch with just a vague notion and Google.

MyGeneRank, to me, represents my passing from a junior to a senior developer in a lot of ways. By no means have I learned all there is to know, but having now built two large web projects, and being the  sole developer for one of them, I feel like a different person from the one who started the project a year and a half ago. I'd love to know what you all think of the source, and if you find a bug, file an issue please.


[mgr]: https://mygenerank.scripps.edu
[api]: https://github.com/TorkamaniLab/mygenerank-api
[stsi]: https://www.stsiweb.org
[paper]: http://www.biorxiv.org/content/early/2017/01/19/101519
[pgt]: https://twitter.com/tonymillion/status/417213069572714496
[drf]: http://www.django-rest-framework.org
[ac]: /archive/adventurers-codex-the-stack/
[cel]: http://docs.celeryproject.org/en/latest/index.html
[ac-1]: /archive/adventurers-codex-behind-the-curtain/
[coffee]: https://github.com/HyperTextCoffeePot/HyperTextCoffeePot
[metapipe]: https://github.com/TorkamaniLab/metapipe#metapipe
[ngs]: https://www.illumina.com/science/technology/next-generation-sequencing.html
[t-1]: https://www.macworld.com/article/2895941/stanfords-researchkit-app-gained-more-users-in-24-hours-than-most-medical-studies-find-in-a-year.html
[t-2]: https://www.fastcompany.com/3058125/in-its-first-year-has-apples-researchkit-revolutionized-medical-research
[t-3]: https://stories.appbot.co/how-i-got-2-3m-app-downloads-without-spending-a-cent-on-marketing-f4823b6bc779
[t-4]: http://parkinsonsnewstoday.com/2016/03/28/parkinsons-mpower-app-celebrates-milestone-12000-registered-users-upgrade-apple-product-launch/
[smiths]: https://www.youtube.com/watch?v=C906lbkcYug
[23andMe]: https://www.23andme.com
[23andMe-api]: https://api.23andme.com/docs/reference/
[itunes]: TODO
