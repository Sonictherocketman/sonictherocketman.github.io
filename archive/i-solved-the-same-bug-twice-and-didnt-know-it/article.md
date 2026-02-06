slug: i-solved-the-same-bug-twice-and-didnt-know-it
published: Tue, 01 Feb 2022 at 11:44 PM
updated: Fri, 06 Feb 2026 00:29:28 
title: I Solved The Same Bug Twice And Didn't Know It
author: Brian Schrader
tags: software development, programming
status: publish

Human memory is incredibly lossy; the brain an imperfect storage medium.

I've [written before][1] about how I include links in my code comments to resources that helped me find unintuitive or convoluted solutions. These links are essentially the footnotes of my systems; both documentation and a debugging paper-trail for poor, future souls to follow.

However, I am an imperfect soul, and so not all of my hackish solutions are cited. This fact bit me the other day when I discovered a strange bug with a new feature in [Adventurer's Codex][2].


### The Technical Details

The actual issue was fairly nuanced and understanding it depends heavily on the details of our infrastructure, but the simple version goes like this:

We have two endpoints, one that returns a resource and one that returns the schema for our entire API. For whatever reason, in this particular case, requesting the resource changed the output of the schema the first time the resource was requested. This is obviously unexpected. The structure of an API shouldn't change when you call it right? Well, that's the thing. Technically the API wasn't actually changing, but the schema was ever so slightly different: the format of the schema for that resource had changed.

<img
    alt="A funny joke"
    src="/images/blog/changed-outcome.jpg"
    class="image-right"
    style="max-width:320px;"
/>

The schema is a hierarchical description of all of our API endpoints, with paths to describe how each resource is related. In this case, the schema would output two different paths to the same resource, but the data at both paths were identical.

For technical reasons, these paths matter to us. **They must remain the same.**


### Following the Breadcrumb Trail

After some DuckDuckGo-fu failed to turn up any useful results, I turned to the rest of the codebase. The problematic endpoint was very simple. Surely we'd implemented other similar functionality which didn't cause this behavior. Sure enough I found two such cases. Both of which contained the same strange, seemingly useless line of code.

Once I had added that seemingly useless code, the schema no longer changed. I had fixed the bug! I had discovered *how* to fix the bug, but not *why*. I could have stopped there. Someone else might have, but I needed to go further. I needed to find out how this unrelated line solved my problem.

For now, I had found a clue.

Being the primary author of this particular codebase I knew that such a strange implementation would probably have at least a code comment or a comment in the implementing commit that explained the weirdness. There was no code comment unfortunately, and neither was there one in the commit. However, by diving through the history of that particular file I found that there had been a code comment, right where I would have expected it to be, when the code was written; but it had been removed in another commit a few months back&mdash;*by me*.

<img
    alt="The Fatefult Commit"
    src="/images/blog/ac-fateful-comment.png"
    class="image-center"
/>

Unfortunately, the comment didn't link to an answer on the internet and subsequent searches have turned up nothing of use.

For now, I had found another clue&mdash;and a big one at that. I had also discovered something scarier: I had already found, fought, and beaten this bug before, and it was I that deleted the vital clue.

I had discovered that I was not just the detective but the victim and the murderer, and that the case had been closed three years prior.


### Answers Lost to the Mists of Time

As strange as it may seem, I find that this kind of thing happens more often than we may like to admit. I am in a situation where I maintain most of the code I write, and so I get to live with my mistakes for years&mdash;going on a decade now. When I wrote the offending code and the comment that explained it, I was deep in the bowels of [DRF][5] building out the Adventurer's Codex backend from whole cloth. Since then I've moved on to building other things. That code has now sat for years untouched, working as designed; and [some things which should not have been forgotten were lost][6].

At time of writing this mystery is still unsolved; the clues leading to an end I cannot see. However I now know that at one point in the past I did know the cause of this issue and how to solve it. The solution lives on, but [the cause is lost][3]: a coder's [greek fire][4].

The answer may be lost to time, as even three years is enough time for some links to rot and trails to run cold. In what now feels like another lifetime, a past version of myself held the answers I now seek. Perhaps one day a Future Me will know what Past Me had found.

[1]: /archive/comments-with-cited-references/
[2]: https://adventurerscodex.com/
[3]: /archive/where-it-comes-from-nobody-knows/
[4]: https://en.wikipedia.org/wiki/Greek_fire
[5]: https://www.django-rest-framework.org
[6]: https://www.goodreads.com/quotes/376870-and-some-things-that-should-not-have-been-forgotten-were
