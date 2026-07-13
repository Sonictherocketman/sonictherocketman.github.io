slug: the-true-expense-of-nature
published: Mon, 01 Jun 2026 at 04:36 PM
updated: Fri, 03 Jul 2026 08:56:43 
title: The True Expense of Nature
status: publish
author: Brian Schrader
hero: /images/blog/the-mirror-of-the-whole-of-nature.jpg
tags: physics, essay, history
thread: math-and-physics
summary: An exploration of Nature's endeavor (and yours) to expend as little effort as possible.
showfootercallout: true

<style>code { font-size: 10pt; background: #ddd; border-radius: 3px; padding: 4px; }</style>

It's Saturday morning, and you have no plans. Perhaps your schedule happened to line up that way, perhaps the kids are gone, or maybe it's just luck. Regardless, it's glorious. You bask in the glow of a lazy morning while you decide just how you're going to spend today. In your mind you go over different ideas, considering each and its consequences.

You could go to the beach! No, too much effort. You could stay in and read a book, but it's a nice day. You could read outside. Perhaps though it's better to go for a long walk first, grab a coffee maybe? You need to grab some things at the store, and that's on the way. Eventually you arrive at a plan: walk to get coffee, read for a while at the café, then stop by the store on the way home! An excellent plan&mdash;efficient and relaxing!

What have you just done? How did you arrive at this decision? There were so many variables, a nearly infinite possibility space, yet you managed to make do. Perhaps Nature itself is not so dissimilar.

## Making Decisions

When you make a decision like in the example above, you consider and explore the options you have. Implicitly you ignore certain possibilities&mdash;even with a totally free day, few people decide to spend it by committing a whimsical burglary. Instead you narrow down the options by what fits your typical habits and recent situations, and then you imagine how those possibilities might play out, weighing the consequences.

<div id="potential-well-container" class="image-right" style="width: 330px;">
  <canvas id="potential-well-canvas" style="border-radius: 5px;"></canvas>
</div>
<script>window.WELL_CONFIG = {
    width:  330,
    height: 220,
    x0: 0.7,
    friction: 0.8,
    ballRadius: 10,
    wellDepth: 0.75,
    yLabel: 'Sum of all Costs',
    minValueLabel: 'Ideal Solution',
};</script>
<script src="/other-projects/potential-well/potential-well.js"></script>

Hopefully you don't get stuck in analysis paralysis, and so, when you finally come to a decision, it's fairly optimal: taking into account your responsibilities, preferences, financial capacity, and mood.

This is a kind of optimization problem, a kind of problem that humans solve, repeatedly, every single day and similar to the kinds that are the subject of Classical Physics. In effect, you're trying to find a path through the world which minimizes the financial, personal, and societal cost. Preferred solutions are not the choices with *no* cost, as those are very rare, instead they're the solutions with the *least* cost.

In any given situation, the least costly solution should be the one that's preferred, assuming you've accounted for and weighed every type of cost.<sup>1</sup> If we wanted to calculate the optimal solution, perhaps using some calculus, we'd need a single notion, a unit of measure, that could represent any kind of cost and then we'd need a description for how much each decision, each path you might take, might cost. But once we had that, in principle anyway, we could calculate the best option every time.

Let's call this generalized, hypothetical cost Action.

{% include 'newsletter-callout.html' %}

## The Principle of Least Action

The so called *Principle of Least Action* is a real thing and it's [perhaps the most foundational concept][action] in Physics. It's honestly a shame that it's not taught to most people who take physics in college because, while it does require some advanced mathematical techniques to actually use, the Principle of Least Action underlies all of modern Physics. It's not strictly a theory, it's an assumption: the assumption that **nature always does the most optimal thing**.

The French physicist, Pierre Louis Maupertuis, was the first to propose action as the currency of nature in the eighteenth century.

<div id="plotting-canvas-container" class="image-right" style="width: 300px; padding: 0;">
  <canvas id="plotting-canvas" style="border-radius: 5px;"></canvas>
  <center><small>The trajectory of a ball being thrown.</small></center>
</div>
<script src="/other-projects/plotFns.js"></script>
<script>plotFns(
    { W:  300, H: 280, xMin: 0, xMax: 0.7, yMin: 0, yMax: 1.5, showPlayButton: false, xFilter: 'positive' },
    'plotting-canvas',
    (x, t) => (5 * x - 5 * x*x),
);
</script>

In the time since we've seen action be used to describe every level of physical theory from Einstein's Theory of General Relativity to the Standard Model of Particle Physics. Action is truly fundamental in ways Maupertuis could never have imagined.

In truth, when considering optimal paths, action is not always minimized, but instead made <q>stationary</q>. Usually it is indeed a minimum, but sometimes it's more of a stable point, like the seat of a saddle or a pass between two mountains. More precisely, nature prefers paths on which the action doesn't change much in the vicinity.

## Nature's Choice

In the 17th and 18th centuries nature was occasionally referred to as a proper noun. Nature was referred to, not as a phenomenon, but as a person or a god. In alchemical circles, and throughout medieval literature, Nature was sometimes depicted and referred to as a being who directly controlled the function of the natural world. In this depiction, rocks fell and water ran, not because of God's direct intervention in earthly affairs, but because he'd created Nature to do that work instead. Nature was subservient to the rules made by God, but ultimately she (and it was almost always a *she*) did what she could within the rules she was given.

<div class="image-right" style="width: 300px;">
  <img src="/images/blog/the-mirror-of-the-whole-of-nature.jpg" alt="The Mirror of the Whole of Nature and the Image of Art" style="max-width: 100%; border-radius: 5px; padding: 0; margin-bottom: 6px;">
  <center><small style="line-height: 1.3; display: block;">The Mirror of the Whole of Nature <br> and the Image of Art, Robert Fludd</small></center>
</div>

In modern science, it's considered uncouth to refer to Nature in this way, to personify her, as we once did. But there is a loveliness to that way of writing, and a grandeur of the tone that we've lost and one that I find quite beautiful. So I'll be resurrecting this tradition for a time.

In this mode, you could say that Nature is being lazy by relying so heavily on the Principle of Least Action. After all, given the expense of moving around all particles on the board of the universe, nature always chooses the least costly path. Maupertuis called this economical, another word could be thrifty. You could say that Nature chooses the best path, or perhaps that she makes the best use of the effort that she spends.

To us, in our macroscopic world, Nature always does the best possible thing. Yet Quantum Mechanics gives us a different view, and one that perhaps shows us a little more of Nature's problem solving than she wanted us to know.


## Exploring What's Possible

To understand a whole, you must understand it's parts. This is the Principle of Reductionism which underlies modern science. And so, in order to fully understand how a ball travels from point A to point B, we must understand the motion of its atoms. The trouble is that here in the quantum realm, the land of fundamental particles, the familiar laws of nature that we know from human experience break down entirely.

However in [his doctoral thesis][thesis], Richard Feynman discovered that Nature may in fact only accomplish her goal of minimizing action in the aggregate. At the most fundamental layer, as Feynman showed, particles can be thought of as taking [every possible path][paths]. In this interpretation, Nature only appears to do what's best once she manages to cobble together an assemblage of particles moving in unison.

Quantum Mechanics has a reputation for being difficult to interpret and understand, but Feynman's interpretation may not be so difficult to understand if we, again eschewing modern sensibilities, consider a more human-like example.

<div class="image-right" style="width: 310px;">
  <img src="/images/blog/action/all-paths.jpg" alt="Every possible path" style="max-width: 100%; border-radius: 5px; padding: 0; margin-bottom: 6px;">
  <center><small style="line-height: 1.3; display: block;">Image Credit: Veritasium</small></center>
</div>

Consider again how you made your decision to read at the café. You mentally explored the possible paths you might take, weighing their consequences and cost, then acted on the one which made the most sense. Nature herself, seems not to have this separation between thought and action, and instead must perform both with the same pieces. At the most foundational levels, we can see then Nature imagining&mdash;in a way&mdash;each path, feeling out the possibilities, and arriving at an aggregate course of action. It's obvious that she wished to hide this procedure of hers well, or else it would be more easily visible to us, but by peering into the quantum nature of the world, we can see just how she arrives at her answers.

Nature is not human, and so the discussion above is simply framing, but I think it's interesting how nature tends to reuse similar phenomena across scales and levels of complexity. Metaphor can be dangerous, as it often gives false impressions, but it can also be useful, helping to bridge the knowledge gap that lies before true understanding.

However, this unorthodox discussion of the Principle of Least Action begs an interesting question: why should Nature be so thrifty with action? After all, it's not like we're running out of the stuff. Right?

## Nature's Treasury

Leaving behind the anthropomorphized version of Nature for a moment, it's interesting to consider the idea that action is minimized in order to extend, for the longest period of time, the lifetime of the universe. Action is not Entropy, the more commonly discussed currency of chaos that will eventually cause the Heat Death of the Universe, but let's explore this idea anyway, in case there is something interesting hidden deep inside it.

<div class="image-right" style="width: 310px;">
  <img src="/images/blog/gracchus-treasury.jpg" alt="TIBERIUS GRACCHUS closes the Temple of Saturn - the Roman Treasury Date: 133 BC" style="max-width: 100%; border-radius: 5px; padding: 0; margin-bottom: 6px;">
  <center><small style="line-height: 1.3; display: block;">Nature may be like Tiberius Gracchus here, guarding the treasury.</small></center>
</div>

Maupertuis called Action the <q>true expense</q> of nature, and minimizing expenses is something to do when there is a finite budget you wish to use effectively. That's not to say that minimizing action locally along a path actually requires a finite supply, however it can be an interesting, intuitive frame. If the universe were indeed attempting to maximize its useful life, excusing the personification again, it makes sense to minimize the expense of each interaction, each motion, that gets taken.

But is there a finite amount of action?

Well, if there is a finite amount of energy in the universe, and a finite amount of time over which that energy could be spent, then indeed the action of the universe is finite. We don't know this, of course, but [it has been discussed](https://www.nature.com/articles/331031a0) by serious physicists. If such a theory were true, then it might illuminate some answers as to why nature prefers the action of particles and objects to be optimized this way.

As I said, it's wondrous that nature can so often be described by similar methods across a wide variety of scales. Balls roll down a hill by the same principle as do planets around a star and particles amidst the most fundamental quantum fields. In all these phenomena, action is the thing, the currency that is being optimized. It's also wondrous how such a thing as optimization problems can be so central to both the physical description of the natural world and to our human thought processes.

Maupertuis, in his earliest writings on the subject said this about action, and  still today we wonder at the reasons why:

> It is this quantity of action which is here the true expense (dépense) of nature, and which she economizes as much as possible...<br/>
> - Pierre Louis Maupertuis (via [Philip Edward Bertrand Jourdain](https://books.google.com/books?id=y3UVAQAAIAAJ))

It may be that Nature doles out action from a finite treasury, where in she jealously hoards the coin which makes all things act&mdash;including spacetime itself. Perhaps Nature is lazy, or she's on a budget. Regardless, for whatever reason, she does what she can to get the biggest bang for her buck.

[paths]: https://www.youtube.com/watch?v=Q10_srZ-pbs
[action]: https://www.youtube.com/watch?v=qJZ1Ez28C-A
[thesis]: https://faculty.washington.edu/seattle/physics541/2012-path-integrals/feynman-thesis.pdf

<div class="footnote">
<sup>1</sup> This is often the real hard part.<br/>
</div>
