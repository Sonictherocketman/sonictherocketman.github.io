slug: lanterns-in-the-void-science-and-discovery
published: Mon, 12 Oct 2026 at 04:57 PM
updated: Mon, 12 Oct 2026 16:57:34 
title: Lanterns in the Void: Science and Discovery
author: Brian Schrader
tags: essay, science, ai
thread: ai-philosophy
status: publish
hero: /images/blog/tunnel.600.jpg
summary: Knowledge is a lantern in the void if ignorance. Let's take that analogy a little too seriously.

<script src="/other-projects/curve-fill/curve-fill.js"></script>

One of the fascinating things about new technologies or scientific discoveries is how they expose the cracks in our understanding of the world. New distinctions present themselves as evidence emerges to challenge the categories we previously constructed.

There are tons of examples of this, but one that I particularly like is a historical example. Aristotle devised a method of categorizing living creatures and after his death until the fifteenth-century, that system worked pretty well for European and Middle-Eastern scholars. Animals and plants fit into neat and tidy categories and their commonalities were explained by the relations of those categories. It wasn't until the return of settlers from the New World, who brought back new kinds of animals, did this paradigm shift.

If your system decrees that birds and mammals are different because one lays eggs and has a beak, then your system works mostly fine right up until the discovery of the platypus. Previously a distinction that seemed so complete, so useful, is gone and you're forced to redefine what you mean by <q>mammal</q>.

<div class="image-right" style="width:310px;">
  <img src="/images/blog/tunnel.600.jpg" alt="" style="max-width: 100%;">
  <small><center><a href="https://commons.wikimedia.org/wiki/File:Lost_Tunnel_-_In_Darkness_(15745509560).jpg">Kecko from Northeast corner of, Switzerland</a> <a href="https://creativecommons.org/licenses/by/2.0"><br>CC BY 2.0</a>, via Wikimedia Commons</center></small>
</div>

Scientific discovery and technological innovation, at their best, are like this. They seek out new forms of distinction between things and challenge our ideas about how the world works. [It's often said][azimov] that science is a lantern that illuminates a portion of the dark void of ignorance. The more lanterns we hang the more of the void we can traverse and understand.

[azimov]: https://www.goodreads.com/quotes/52212-all-knowledge-is-one-when-a-light-brightens-and-illuminates

In this analogy, the goal is implicitly to hang more and more lanterns, to explore more and more of the terrain. the void is not a hallway with rigid walls, it's a vast expanse of unknown hills and utter blackness. If we imagine that one such explorer hangs lights at regular intervals then, over the course of their work, they forge a trail through the void of ignorance that others can follow. Their work can be forgotten over time, the lanterns may dim with age, but so long as others follow along, the light of knowledge is maintained.

Again, the goal is to explore the terrain, to illuminate it fully. If we assume the boundaries are fixed, we can visualize this process. To maximise the number of lanterns, it then makes sense to maximize the number of explorers searching this wilderness.

<div
  id="single-explorer-container"
  class="image-right" style="text-align:center; width: 320px;"
>
  <canvas id="single-explorer-canvas"></canvas>
  <noscript>
    <img src="/images/blog/explorer.jpg">
  </noscript>
  <small>An explorer in the wilderness.</small>
</div>
<script>
    CurveFill('#single-explorer-canvas', {
        W: 300, H: 250,
        splitTimes: [],
        showPlots: false,
        showBreakout: false,
        explodeTime: Infinity,
    });
</script>

To do this you could train more and more explorers as a percentage of the population, or you could take for granted that [24% of (American) workers][1] do *something* vaguely scientific or technological, then simply increasing the overall population would, on net, result in more technological exploration and innovation. This has been a [political talking point for years][2].

[1]: https://ncses.nsf.gov/pubs/nsb20245/u-s-stem-workforce-size-growth-and-employment
[2]: https://www.penguinrandomhouse.com/books/636499/one-billion-americans-by-matthew-yglesias/

I do not wish to indulge in politics for the moment. It will suffice to say that the above are some of the common techniques proposed to increase the number of people searching the vast wilderness of potential knowledge.

It's important to pause here and to remind ourselves why it is we want to explore this terrain in the first place. Scientific discoveries and technological innovations come in all shapes and sizes, and with all manner of consequences. As much as we all wish that science could *just* make positive discoveries, not everything discovered will be the polio vaccine. Some things will be useless, others detrimental. Computers have given us the great and the terrible, Wikipedia and Instagram. Chemistry has given us Tylenol and mustard gas.

However today we're seeing a different kind of revolution, one that is far from beloved and far from understood. For millenia we've compiled knowledge, so much that it's impossible for anyone, or any thing to parse or understand. Yet over time we've developed techniques to better retain our past discoveries and to uncover connections hidden in what we already know. Web search is like this. Where before one had to search out books either by recommendation or the footnote trail, one can now trawl through an entire web of content made, updated, and shared by all of humanity. Human researchers then connect the dots and illuminate the gaps in what we know.

Things are possible today that would have been unthinkable before the invention of the Internet, not because the pieces of knowledge didn't exist but because the connections between each piece were too difficult to find.

Think of the squiggling line in the plot above, the trails in the void. Sometimes gaps emerge, even between trails very close together, but no one has ventured yet between them. The gaps are manageable, even reasonable, but no one has bothered with them yet. Progress in science is driven primarily by two factors:

- Is there money in it?
- Is some researcher interested in it?

Without at least one (and often both) of these two factors, the gaps in our knowledge will remain no matter how manageable they are to close. Even with a million mathematicians working 24/7, some problems will remain open simply because no one finds them engaging to work on.

<div
  id="many-explorer-container"
  class="image-center"
  style="text-align:center; width: 620px;"
>
  <canvas id="many-explorer-canvas"></canvas>
  <noscript>
    <img src="/images/blog/explosion.jpg">
  </noscript>
  <small>An explosion of explorers.</small>
</div>
<script>
    CurveFill('#many-explorer-canvas', {
        W: 600, H: 250,
        splitTimes: [2, 4, 6, 8, 10, 12],
        explodeTime: 12,
        maxRuntime: 16,
        showBreakout: false,
    });
</script>

That changes if you're able to, in part, divorce scientific exploration from being directly related to the number of human scientists there are. In this case, suddenly the kinds of problems tackled can be whatever's left unsolved. This kind of exploration still costs money to perform, but it's an amount perhaps more commensurate with the value of the problem. Cheap problems get cheap solutions.

New discoveries can be made precisely because there are simply more and faster wanderers in the void.

In part this is what I think we're seeing regarding the effects of Large Language Models in modern mathematics and, to some extent, in software. These fields are easily testable and verifiable and so their work is more easily confirmed by human scientists. The techniques for solving the given problem exist, the knowledge to find a solution or build a piece of software is out there. The missing piece was the effort by a willing human (or company) to solve or build it.

However, let's not despair for the death of modern science and technology. Machine learning techniques of all kinds have [a fundamental flaw][3]: they rely on human knowledge. Older forms of machine learning require expert algorithms or special tuning by humans. LLMs have general algorithms but rely on human works for their training data.

[3]:https://en.wikipedia.org/wiki/Bitter_lesson

These tools are therefore *inherently backward looking*. They see what has been made by humans in the past and are trained to imitate it. Doing so they can identify gaps in our understanding, even these days infer novel connections between pieces of data! Yet they cannot replace who we are, not yet anyway, because they can only look to the past, *our* past.

This [article in Nature][einstein-ai] the other day intrigued me. Could an LLM, trained on scientific literature published before 1915 come up with Einstein's theory of General Relativity? Putting aside the many technical issues with this kind of work, the answer was clear: no. Yet that isn't surprising, at least to me. There was lots to learn in the pre-Einsteinian literature. Radio and television, of which the latter was still decades away, were all baked in to the physics of Maxwell's Equations and materials science. Nothing about the solar system or much of cosmology, requires Einstein's Great Work to understand.

Yet the work these machines can't do is precisely the kind we value the most. It's the kind of knowledge that pushes us forward not in incremental steps but in foundational, paradigm-shifting ways. No amount of <q>filling in the gaps</q> will substitute for this work. Aristotle could have collected every leaf, bird, and squirrel in Europe and he still would never have predicted the platypus. Only [new evidence][chem], and new modes of thought can do that.

<div
  class="image-center"
  style="text-align:center; width: 600px;"
>
  <img src="/images/blog/breakout.jpg" style="max-width: 100%;">
  <small><center>We need to focus on breaking out of our boxes.</small></small>
</div>

When we defined the analogy above, we made an important assumption: that the space was finite. We did this because otherwise we can't plot the picture; you can't draw infinite space, but this assumption is false. In order to do science, we must draw boundaries, set limits on the acceptable forms and topics of discussion. This is akin to drawing the box in the visuals above. The void of our ignorance grows faster than the light of our knowledge and so there is always more to know, always further questions we can ask. This isn't constrained to science and technology either. These latest advancements are pushing us to further discern what [is it we do here](https://www.noemamag.com/a-new-kind-of-creative-poverty/). An algorithm trained on data established within a bounding box of constraints cannot venture beyond those constraints.

Perhaps with this latest intelligence explosion we can refocus ourselves, not on filling in the gaps, but on breaking out of the boxes we have constructed.

[einstein-ai]: https://www.nature.com/articles/d41586-026-02804-x
[chem]: /archive/chemical-telescopes-and-the-process-of-science/
