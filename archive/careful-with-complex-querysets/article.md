slug: careful-with-complex-querysets
published: Thu, 18 Jun 2020 at 06:57 PM
updated: Thu, 19 Dec 2024 20:03:51 
title: Careful with Complex Querysets
author: Brian Schrader
tags: django, databases, Querysets, cautionary-tale
status: publish

Today I learned something about filtering Django Querysets and fixed a long standing bug. But first some context.

As a feed reader, Pine.blog needs to parse feeds. To do this, every 5 minutes, Pine.blog checks to see which feeds it needs to parse. A feed can fall into one of three categories:

- **Constantly changing feeds with active subscribers**: Feeds that change regularly (i.e. microblogs, Reddit feeds, etc) and have recently active users subscribed to them.
- **Less frequently changing feeds with active subscribers**: Feeds that may update rarely, but still have recently active users subscribed to them.
- **Everything else**: Feeds with no one subscribed to them, but are still included in the Feed Directory, or feeds with subscribers who haven't logged in to Pine.blog recently.

To do all of this, Pine.blog keeps track of how often a feed is typically updated, but if it can't tell, it sets the `approximate_update_frequency` to `NULL`. Then each of the three categories are checked at different frequencies, ensuring that everything gets parsed at least once every 24 hours, but things that change more often, or with active users subscribed to them, are given priority and parsed more regularly: every 15 or every 30 minutes respectively.

It's the second category that's long been acting weird. And that's where my bug comes in.


### The Actual Code

The bug I discovered has to do with how I group the feeds into those categories. Specifically, I learned that this:

    Q(approximate_update_frequency__in=[
        None,
        UpdateFrequency.CONSTANTLY,
        UpdateFrequency.FEW_PER_DAY,
    ])

Is not the same as this:

    Q(approximate_update_frequency__in=[
        UpdateFrequency.CONSTANTLY,
        UpdateFrequency.FEW_PER_DAY,
    ]) | Q(approximate_update_frequency__isnull=True)

The critical change is the switch from including `None` in the list of allowed items to explicitly filtering by `isnull`. It seems minor, and it totally feels like you should be able to use None in an `IN` collection, but you can't.

Funnily enough, the query sort-of works with the `None` in there, it just ignores the `None` and uses the other two. The true issue arises when you try to inverse the condition using the `NOT` operator. This is exactly what Pine.blog's dispatch tasks were doing. It would first fetch the list of every feed matching that criteria, and then do a second fetch of everything that didn't match, and that second one is where results were getting lost.

All this means that some feeds in the second group were being lumped into the third group, delaying their posts from appearing for hours. I've known about this issue for a while, because the posts from this blog (which squarely fall into the second group) weren't showing up in Pine.blog until the following day.

Glad to finally squash that bug.

<div class="footnote">
* This update also migrates Pine.blog to Python 3.7. It's been on 3.6 for years, and I only upgraded it because homebrew screwed up my 3.6 install and it was easier to upgrade Pine.blog than downgrade my Mac's Python version. Fun times.
</div>
