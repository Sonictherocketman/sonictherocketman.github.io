slug: at-vs-on-a-story-of-semantic-data-modeling
published: Mon, 21 Feb 2022 at 10:50 PM
updated: Sat, 19 Nov 2022 07:49:36 
title: At vs. On: a Story of Semantic Data Modeling
author: Brian Schrader
tags: programming, software development
status: publish

As most good software developers eventually learn: time is hard. Time-based bugs are incredibly common and are sometimes difficult to solve. There are a [ton of misconceptions about how time and dates work][1] in the real world and the simple solution is rarely correct for any significant length of time. Performing calculations based on times and dates can get messy, but so can simply storing them. There's a lot to be wary of when building out a data model with timestamps involved, and as always, a lack of consistent naming can cause a ton of problems.

Over the years I've come to use a specific terminology for dates and time in my data models. In general, I prefer not to use data types in variable names, and I prefer my code to read as passable English where possible. This means, I tend to avoid names like: `date_created` or `published_ts` which contain the data type in the name, and I avoid names like: `created` which give me absolutely no indication of the type or what it is used for.

Instead, I prefer to take cues from the English language. For timestamps or any data type that represents a precise moment in time, I use the suffix `at`. For dates or times that represent more abstract things like wall time or calendar dates, I use the suffix `on`.

As an example let's say I have the following data model:

    class BlogPost:

        # ... other fields ...

        created_at = TimestampField()
        updated_at = TimestampField()

        posted_on = DateField()

This convention tells me that I should expect the `posted_on` field to contain a date or time but not both, and that it represents an abstract notion of time, whereas both the `created_at` and `updated_at` fields represent a specific moment.

I arrived at this convention through asking myself questions about the data in plain English. Consider the following questions:

1. Q: When was this post published?<br />
A: It was published **on** the 25th of January.
2. Q: When was the post record created?<br />
A: It was created **at** 12:00 PM on January 24th.

<details><summary>Disclaimer</summary>
This convention doesn't always work because usually people would use <b>at</b> to describe any time (e.g. "I arrived <b>at</b> noon"). But once I settled on the convention, it wasn't confusing. It just doesn't always read nicely.
</details>

Knowing when to use a timestamp vs. a calendar date or wall-clock time is another issue (and a complicated one), but at least with this convention, I know which one I'm dealing with.

<div class="footnote">
Now that I think about it, it might make sense to name timestamps with an <b>aton</b> suffix since question #2 technically uses both <b>at</b> and <b>on</b>.
</div>

[1]: https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time
