slug: the-hidden-cost-of-cheap-hardware
published: Wed, 23 Jan 2019 at 06:08 PM
updated: Thu, 24 Jul 2025 22:06:43 
title: The Hidden Cost of Cheap Hardware
author: Brian Schrader
tags: software development, programming, complexity, engineering
status: publish

Most times, when developers debate code-level optimizations, someone will eventually bring up the classic platitude:

> Developer-time is more expensive than Compute-time.

And it's true: paying a developer to optimize code is generally more expensive than adding additional hardware to run the existing, slow code faster. Servers and storage are so cheap these days that most developers don't need to know or care about the actual hardware that runs the code they write. Hardware is fast, cheap, and available in huge surplus, but this overabundance of cheap computing power has caused this throw-more-hardware-at-it mindset to proliferate into other aspects of development, namely how systems are designed.


## Let's face it, modern web stacks are complex

A typical web stack contains a lot of co-dependent software, and Developers, Admins, and DevOps will each have their own tools to improve, manage, and add some semblance of comprehensibility to a running system. But, each additional proxy, app instance, and physical or virtual server adds multiple possible points of failure to your production system and lots of additional complexity to development.

Over time, developers add more and more layers of software and tooling to their project until the hardware can't handle it anymore, and then instead of reevaluating their tools, they make the fateful decision to break the system out into smaller, isolated pieces, turning their simple website into a complex distributed system, because after all, adding hardware is cheaper, right?

> "Complexity is a bug-lamp for smart people. We're just drawn to it."

> Maciej Cegłowski, [The Website Obesity Crisis (2015)][woc]

The hardware is cheap, yes, but the developer-time needed to design a system who's pieces communicate over dozens of network connections and physical or virtual machines often far, far exceeds the costs of keeping things simpler from the get-go. Most small and medium systems can exist on very little hardware, and that, in turn, keeps the project design much simpler than spreading less efficient work over dozens of machines.

None of this is to say that an unoptimized codebase is the same as a large or possibly over-engineered system, but there are parallels between them. Both are made possible because of the fact that we have cheap and abundant access to powerful hardware that can run inefficient code and all of the layers of abstraction that slow down and sometimes overcomplicate modern software. It might be then that developers working in these large systems, as with some developers working on inefficient code, might not realize just how powerful their hardware really is.


## Empathy for the machine

Today's hardware is fast, really fast, and we can use that power to our advantage, but only if we, as developers, have an intuitive sense of just how fast it is.

In a totally related, I promise, anecdote: An old coworker of mine was complaining one day that a Perl script he'd written took too long to run, and he didn't know why. I asked him how long it took, and he said, "About 2 seconds, but it should be instant." At first I thought it was silly that he was spending so much time optimizing for 2 seconds, but what I didn't know was that this script was only processing a few hundred kilobytes of testing data. Eventually, it would need to process a few hundred gigabytes. We had a High Performance Computing Cluster he could run his analysis on, but he didn't want to use it because, as he put it, "This analysis isn't complicated, it should be able to run on my machine". He didn't want to move his work to the cluster because he'd have to add a lot of code to ensure it would run correctly in a distributed environment that was harder to debug. After he fixed the issue, processing the test data took an imperceptible amount of time, and he was able to run the entire analysis on his 6-core workstation in a little under an hour.

Without that kind of intuitive understanding of how much time a task "should take" it's extremely difficult to know when, or if, something is wrong. You might just assume that your analysis really does take 2 seconds, or that your webapp really does take 3 seconds to send a simple response, and that you need to use more powerful hardware to get it done. What's worse is that developing that intuition is harder and harder the further you are from the actual hardware. With layers of virtualization and tooling between developers and their hardware, it's difficult to perform controlled experiments, or do any sort of real comparisons between revisions. Your gut instinct is your only gauge.


## We need some sort of an anchor

<div class="image-container">
    <img
        class="image-right"
        src="/images/blog/some-sort-of-a-rock.jpg"
        style="width:300px;"
    /><br />
    <caption><center><small>
    Defining Deviancy Down
    </small></center></caption>
</div>

Armed with cheap hardware and the conventional wisdom that adding more servers is cheaper and easier than optimizing what we already have, we've arguably made our systems slower, more complicated, and over-engineered for the problems they claim to solve. It's time we all take a look at the systems we build, and ask ourselves if they need to be as complex as we're making them. We, as a community tend to want to copy what the big companies do, but those enormous companies have different needs than the rest of us. Facebook, Netflix, and Google have different problems than the vast majority of sites. We don't need to use their tooling, apply their designs, or live with their compromises, but we often do exactly that.

What we need is some sort of test, one we can apply to our systems to anchor our thinking about what hardware our systems need day-to-day. I've half-joked several times that any website that has less than a hundred concurrent users should be able to run on my spare Raspberry Pi on my apartment's internet. If you're building a small-business site or internal tool, that same half-joke applies to your site too.<sup>1</sup> Such a  small, cheap system-on-a-chip is way too fragile for any real, production use, but it's more than powerful enough to be a good testing rig. Get one, deploy your production system on it, and see if you can serve a hundred users quickly and efficiently. Older systems have done more with a lot less.

We're not building a space ship here, just a website.<sup>2</sup>


<div class="footnote">
    <sup>1</sup> My Raspberry Pi B+ (Quad-Core 800MHz CPU & 1 GB of RAM) is hooked up to a 150x15 Mbps connection, and runs a standard build of Debian Linux. If you can't host your website on that, then you're either building a fairly complex site with lots of computing demands, or have some pretty inefficient code.<br />
    <sup>2</sup> Disregard this message if you actually are building space ships or otherwise very complex software that for obvious reasons cannot be run on a $35 SOC meant for teaching children. Web Devs building CRUD apps: you're not excluded.
</div>


[woc]: https://idlewords.com/talks/website_obesity.htm#top
