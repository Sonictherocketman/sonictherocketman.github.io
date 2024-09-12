slug: hacks-can-be-good-code-too
published: Mon, 21 Mar 2022 at 09:45 PM
updated: Thu, 12 Sep 2024 00:35:12 
title: Hacks can be Good Code Too
author: Brian Schrader
tags: programming, software development
status: publish

<style>
table {
    width: 100%;
}
table td {
    padding: 2px;
    padding-right: 1.5rem;
}
table tr td:last-child {
    padding: 0;
}
</style>

Writing code is, like everything in life, all about making tradeoffs. Code can be quick to write, but at the same time unreadable; it can be fast, but hard to maintain; and it can be flexible, but overly complex. Each of these factors are worth considering when writing Good Code. Complicating this is the fact that: what constitutes Good Code in one situation may not be ideal in another.

Good Code is not universally so.

It is incredibly difficult to explain why one set of tradeoffs are worth pursuing in one case but not in another, and often times reasonable people will disagree on the value of certain tradeoffs over others. Perhaps a snippet of hacky string parsing is good in one place, but not in another. Often times, the most significant cost of solving a problem "The Right Way" is time.

When deciding whether to do something The Right Way or to cheat and simply hack something together, I often try to consider the exposure the given code will have. Consider these questions:

- Do other systems touch this code?
- How many developers will need to interact with it over time?
- How much work would be involved in building out the correct approach?
- How much work would be involved in building out the bad approach?
- How valuable is the intended feature?
- How much additional maintenance does the bad solution require?

Each of these answers helps me decide what kind of code I should write. These questions neglect multiple other factors (e.g. performance, readability), but they are a good starting point.

In a recent example I needed to modify the blog engine that powers this site as well as a few others. I wanted a simple feature that would count the number of articles on the side as well as the total number of words in every blog post, and display those values on the home page. [As I've said before][1] the blog engine for this site is very old, and has been [rewritten][2] [several][3] [times][4]. It's well beyond needing a massive rewrite, but that's not something I really want to do right now.

The blog engine is written in Python, provides a command-line interface, and uses Git Hooks both client and server-side to build and deploy itself.

I originally considered writing this feature in Python: counting the number of words in each article, adding a new context variable to the template rendering process, and then rendering the pages as normal. But that would require touching substantial pieces of the codebase (some of which [I no longer understand][5]). It would probably take me all evening to dive into the code, understand it, make the change, and test it. To be honest, this feature was not worth wasting an evening on. So I decided to just hack something.

As I said, I use Git to deploy the site. So I just added a new line to the HTML template:

<pre><code class="html">
&lt;p&gt;
    This site contains <code>{+ARTICLE_COUNT+}</code>
    different writings and <code>{+WORD_COUNT+}</code>
    total words. That's about <code>{+PAGE_COUNT+}</code>
    pages!
&lt;/p&gt;
</code></pre>

And then I added a new step to the pre-commit hook that runs after the template rendering process, but before the changes are committed and the site is deployed.

<pre><code class="bash">
WPP=320
WORDS_N="$(find archive/ -name "*.md"|xargs -I {} cat {} | wc -w)"
WORDS=`printf "%'d" $WORDS_N`
ARTICLES=`printf "%'d" $(find archive/ -name "*.md" | wc -l)`
PAGES="$(( WORDS_N / WPP ))"

TMP_HOME=`mktemp`
cp ./index.html $TMP_HOME
cat $TMP_HOME |
    sed "s/{+ARTICLE_COUNT+}/$ARTICLES/" |
    sed "s/{+PAGE_COUNT+}/$PAGES/" |
    sed "s/{+WORD_COUNT+}/$WORDS/" > ./index.html
</code></pre>

Let's check in and see how this hack fit my criteria above:

<table border="1" frame="hsides" rules="rows" style="margin-right:auto;margin-left:auto;">
    <tr>
        <td>Do other systems touch this code?</td>
        <td>No</td>
    </tr>
    <tr>
        <td># of Developers?</td>
        <td>1</td>
    </tr>
    <tr>
        <td>Time for Correct Approach?</td>
        <td>2-3 hours</td>
    </tr>
    <tr>
        <td>Time for Bad Approach?</td>
        <td>10 minutes</td>
    </tr>
    <tr>
        <td>How Valuable is the Feature?</td>
        <td>Very</td>
    </tr>
    <tr>
        <td>Additional Maintenance Burden?</td>
        <td>Not much</td>
    </tr>
</table>

Is this elegant: absolutely not. Did it take basically zero time? Yes. Have I thought about it since? Not until writing this post. Would I have done this on a team project or a commercial product? Absolutely not. It's a feature for my personal blog engine and a feature that is specific to one particular low-value site that I run.

In this case, a hack is an example of Good Code. That's because Good Code is a relative construct.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

[1]: /archive/the-new-new-cms/
[2]: /archive/smaller/
[3]: /archive/rewritten/
[4]: /archive/thinking-about-redoing-my-blog-engine/
[5]: /archive/i-solved-the-same-bug-twice-and-didnt-know-it/
