slug: assumptions-and-variable-names
published: Thu, 01 Oct 2020 at 10:00 PM
updated: Thu, 05 Feb 2026 03:14:21 
title: Assumptions and Variable Names
author: Brian Schrader
tags: software development, knowing, philosophy, variable naming
status: publish

As developers, we make a lot of assumptions about the world. We have to. The world is messy, unorganized, unsorted, and chaotic, and so is the data that this world generates. It's nigh impossible to process data in an orderly fashion if you can't organize it and make meaningful distinctions between different categories. Consider how much more difficult it would be for a music service to recommend titles if we didn't group music into genres, or how utterly meaningless it would be to say that COVID case counts were rising or falling if you couldn't say where or when. Developers are one of many groups of people who's job is largely to categorize and process data. We employ different methods than other disciplines, but the principle is the same. The problem is that almost any attempt to categorize the real world is fraught with peril. The world doesn't fit nicely into groups. It feeds back into itself in knotted and tangled ways. Few natural categories exist, and this means that in order for us to categorize the world, we need to construct those categories ourselves. These categories are build on assumptions about the world, but they're only assumptions. They can and will be broken, and when our assumptions no longer hold, they cause bugs.


### What does this have to do with code?

A lot actually. When we write code we give names to various data points. We call one bit of memory a `username` and the other an `email_address`. Sometimes, like with more fundamental computer-science concepts, we can mathematically or physically guarantee that certain data is what it claims to be. Other times, we simply define a byte as 8-bits or a given variable as an `int` and not a `string`. Importantly, these definitions are assumptions. They assume that the hardware the code runs on works a certain way or that the system can be expected to do what the OS claims it will do, but that's a topic for another time.

Many bugs are the cause of failed assumptions. Some languages try to reduce the number of assumptions that a developer needs to make by guaranteeing that variables defined as a certain type will always hold data that is that type, but fundamentally, there are much bigger problems plaguing software than type checking. For example, type checking can guarantee that a given variable called `html_string` contains a string value and that it always will, but it can't guarantee that the string is actually HTML. It could be an email address or it could just be invalid HTML. Both are strings, sure, but that's not the whole story.

We often make the mistake of asserting more certainty in our code than is rightfully there. When we accept data from a user, we can't guarantee what the data is until we've validated it. When parsing batch data or data gathered from the Web, the situation is the same. Pine.blog encounters this a lot. As a feed reader, Pine.blog must parse feeds from the Web at large, but RSS and Atom feeds in the wild are notorious for being malformed and invalid (and sometimes just plain wrong). I've even come across a site that returned a PDF when requesting its RSS feed. Until the data is validated, you can only assume what the data contains. Years ago, I started coming up with ways to help me identify when I'm making assumptions in my code in an effort to reduce bugs, improve clarity, and minimize assumptions.

In the Pine.blog source code, there are quite a few examples of this explicit assumption-making process, especially in my variable names. When Pine.blog first receives data from a request, it needs to try to parse that data, but it can't do that until I know what kind of feed it is. To do this I have a series of functions that use a bunch of heuristics to check the data and determine what it contains.


    def is_probably_an_rss_feed(tree):
        pass

    def is_probably_an_atom_feed(tree):
        pass

    def is_probably_a_json_feed(tree):
        pass

The important thing here is the word `probably`. These functions don't attempt to actually parse the data, so they don't know for sure. By explicitly qualifying what these functions do I, as the programmer, understand the assumptions I'm making when I act on that information.

I do this a lot actually. It's common for my variables to contain the words `probably` or `approximate` if I'm not 100% sure that the data is valid or correct. Variables that contain these words immediately cause concern and force me to think about the potential failure modes whenever I attempt to manipulate them. If something says that it is an `html_string` than you don't usually think to second-guess that fact, but until you know that for sure, you may want to name your variable `probably_an_html_string` to better reflect your knowledge at the given point in your process.

<img
    src="/images/blog/approximate-update-frequency.png"
    class="image-right hide-on-mobile"
    alt="Pine.blog Approximate Update Frequency"
/>


### Handling Approximations

As a guide to users, Pine.blog tries to determine the frequency that a given feed contains new items. Twitter users may be familiar with [Unladen Follow][1] which does the same thing for Twitter accounts, or how the podcast app [Overcast][2] does the same thing. This feature lets potential followers know how often a given feed will have new posts. This value is generally pretty simple to calculate, but because it's something determined by Pine.blog and not set by the site owner, this value is descriptive not prescriptive. It describes what is likely the update frequency based on past publishing habits. This measure cannot completely predict a site's future behavior, it's just a guess. To reflect that, my code calls this variable `approximate_update_frequency`, because it's just that `approximate`. Some would probably prefer the word `estimated`, which is certainly clearer, but the point is the same. The variable name conveys just as much confidence as possible without giving other developers (including future me) the false impression that the data is any more certain or guaranteed than it actually is.

Developers like guarantees. We like to know that data won't change on us without warning and that things are what they claim to be. This is why so many developers care deeply about variable naming. No one likes variables that are outright incorrect. If you saw a variable in a codebase called `bank_account_number`, but upon inspection, you saw that it contained a user's first and last name, you would be understandably confused and irritated. The original developer of that code either didn't account for a certain case, incorrectly assigned that data to the wrong variable, or they simply lied to you. The same is true when we name a given variable `html_string`, but it turns out to contain invalid data. The variable name lied to us. By naming variables you're making assumptions and you're making promises to yourself and to later developers about what the variable contains. If you're not sure about what the data is, or can't guarantee that fact, then you should probably say so.

[1]: https://allenpike.com/2009/announcing-unladen-follow
[2]: https://overcast.fm
