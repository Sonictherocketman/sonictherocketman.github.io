slug: load-bearing-walls
published: Tue, 10 Mar 2026 at 01:40 PM
updated: Tue, 10 Mar 2026 13:40:22 
title: Load-Bearing Walls
status: publish
tags: essay, programming, politics, software, ai, cautionary-tale
author: Brian Schrader
hero: /images/blog/dnd-fight.jpeg

We like to believe that we can predict the future. We believe it because it's true, at least in part. Physical systems obey known physical laws and so even fairly complex systems can be understood and predicted with stunning accuracy. Every branch of science makes predictions. Planes fly, servers compute, and dams generate power all through the strength we have to predict the future, if only in the short term. In our human world, we see pollsters predict elections with better-than-random odds, doctors performing research and intervention at global scales, and even disease propagating at predictable rates.

It's stunning just how good we are at this in the modern world. We're *so good* at predicting the future that [much of the financial world][v-finance] relies on it as a hedge against the unforeseen. Short term catastrophe is easier to bear when you can predict that good times can and will return.

Yet there is, of course, much we cannot predict and two main reasons why.

## The Chaos Limit

<script>
window.CONFIG = {
  width: 260,
  height: 340,
  bobRadius: 4,
  g: 9.81 / 2,
  l1: 3,    // arm 1 length  (sim units)
  l2: 2.0,    // arm 2 length  (sim units)
  theta1: Math.PI * 0.2,   // initial angle of arm 1 (radians from vertical)
  theta2: -Math.PI * 0.1,   // initial angle of arm 2
}
</script>
<div
  id="double-pendulum-container"
  style="text-align:center; width: 260px;"
  class="image-right"
>
  <canvas id="double-pendulum-canvas"></canvas>
  <noscript>
    <img src="/images/blog/double-pendulum.jpg">
  </noscript>
</div>

Even the simplest systems can become unpredictable with time because, while the past may indeed predict the future, the *approximate* past does not. This is chaos. Measurements with real instruments in the real world are always imprecise and so lead to unremovable error. These errors stack up over time and eventually reduce the usefulness of our models.

Famously, the [double pendulum][v-chaos] illustrates this phenomenon well. A simple pendulum is completely understood, yet a double pendulum is a chaotic system where even with knowledge of its starting position to *ten decimal places*, the best models will fail in the end.

Still, while chaos may ultimately limit our ability to predict the future in the long term, it leaves quite a lot of wiggle room.<sup>1</sup> No, there's another, much deeper, issue we need to understand.

{% include 'newsletter-callout.html' %}

## A Connected World

Consider a mass on a spring.<sup>2</sup> There are known equations for predicting the behavior of a mass (like a smooth block) sliding on a table. Such systems are well studied and the resulting equations of motion depend on only a few variables: the slope of the table, its roughness, the spring constant, etc..

<div class="image-right" style="width: 300px;">
  <img src="/images/blog/Horizontal-mass-on-spring.svg">
</div>

However, this mathematical model cannot tell us what will *actually* happen to a mass on a spring like this because it has no way to account for what happens when the grad student knocks it over!<sup>3</sup> Such a variable isn't "in the model" as a Physicist might say.

Of course, one can rightfully scoff at this example, but if, when we say we want to predict the future, we mean *fully* predict it, then our models leave a lot to be desired. Indeed, while chaos does limit our ability to model dynamical systems perfectly, systems often degrade due to external factors long before chaos sets in. Something outside the model fails first.

## Bearing the Load of Life

A load-bearing wall is one that, if removed, will result in structural damage. Some walls are decorative and can be knocked down at will. Others cannot be easily removed because, aside from being a wall, they are helping to hold the roof up.

It's important, when you're doing construction, to know which walls are load-bearing so that you don't accidentally knock your house down while trying to remodel a bathroom.

There are lots of structures in the human world, some are decorative and others are structural. The color you paint your fence is unlikely to matter beyond aesthetics, but your family income is quite a powerful force in your life and your ability to get a new car is highly dependent on keeping a stable, well-paying job.

As another example: let's say your friends decide to start a monthly board game night. The exact game you choose to play probably doesn't matter for your long-term friendship, however *the fact that you're playing a game together regularly* certainly does. Consider that for some people the game night might be a much needed break from family trouble or the stresses of work.  What's more, friendships decay without active maintenance. For the group as a whole, it might be the only thread holding you all together.

In that way, **the game night is load-bearing** for the friendship.

Immediately, we can see the truth that the game night isn't *just* a game night. It's a social outlet, a stress valve, a tether to the present and the past and deciding to skip, postpone, or cancel it has outsized consequences: abandoning a common circle, being left out of in-jokes, drifting apart.

## The Hunt for Hidden Walls

It's not impossible to replace a load-bearing wall. It just takes effort. It takes *intent*. You have to brace the wall, cut out the old beam, and replace it with something just as strong.

Everything must end, including game nights, but it's important to recognize what things in life may be load-bearing and what the load is that they might bear. Knowing that, you can be proactive&mdash;set up new things, new rituals and traditions&mdash;to bear the load that still very much exists even after game night is long gone.<sup>4</sup>

The trouble is of course, that we often don't notice load-bearing walls until they've already collapsed. Years after game night ends, we look back on it with longing, from a distance finally seeing clearly what we really had.

What's more, unlike with house construction, a wall in life might have been built to be decorative and only become load-bearing over time. Perhaps you threw a party on a whim and then did so again the following year. Soon enough, it's a tradition. Friends look forward to it every year. You do too. However, as more and more people lean on that wall, it will either strengthen to bear the load or it will collapse. Eventually, our lives are constructed entirely of walls which were never built to carry the loads they have upon them, and it's when these walls collapse that their consequences reverberate farther than we might imagine.

## Isolation and Community

I've been playing D&amp;D for over a decade and largely with the same group of friends. We'd been playing weekly for years in a sort of 3-on-1-off schedule. But years back some of our players got into 3D printing and that unleashed a lot of cool new options for our games. 3D figures need to be painted, and so a few of us started using that week off to get together, chat, and paint figures for a few hours. On one such night, the conversation turned to current events and to the increased isolation many of us feel in this modern digital world. Eventually one of us made a keen observation:

> What we're doing right now, it's basically a weekly church group.

In that moment our shared and hidden load-bearing wall was clearly seen. This group wasn't for D&amp;D. Maybe it never really was.

<img class="image-center" src="/images/blog/dnd-fight.jpeg">
<center><small>Who could've suspected that <i>this</i> was load-bearing? Photo: mine</small></center>

What was clear was that D&amp;D was a place for us all to be, to relax, to maintain relationships. Even when we weren't even playing D&amp;D anymore, we were still getting together. It really never mattered why. A group of friends hanging out, spending time, and working toward a common goal were what *actually* mattered.

## Society's Load-Bearing Walls

Aside from the specific religious tenets, a church group is a type of social gathering. It's a form of community, a place where people meet regularly for a common purpose: to break bread, talk, and help each other through the morass of daily life.

Groups like our little D&amp;D group (or a real church group) take many forms: bowling leagues, swimming clubs, choirs, baseball teams. All of these are institutions built for a specific purpose but that are the backbone of collective civil society and it's these precise institutions that are, at a societal level in the modern world, going through a steep decline. It's not uncommon to see individuals today with few, if any, group ties beyond their own family and especially to a collective group effort.

> Something’s changed in the past few decades&hellip; In the 1990s, the sociologist Robert Putnam recognized that America’s social metabolism was slowing down. In the book Bowling Alone, he gathered reams of statistical evidence to prove that America’s penchant for starting and joining associations appeared to be in free fall. Book clubs and bowling leagues were going bust.<br />
> - Derek Thompson, *[Why Americans Suddenly Stopped Hanging Out][atl]*

You might ask: why is it that a baseball club matters for society? And in some respects you're right to question. A baseball club doesn't matter in the grand scheme, but the baseball wasn't the actual purpose of the club. That was its stated goal, its intended purpose, but that club, that wall, it was load-bearing.

Groups of families watched the games, intermingled with their neighbors, met new people, and organized events. Of course *something* could take its place (there's nothing special about baseball stands, after-mass doughnuts, or a D&amp;D group as forums for community cohesion) but without it, the whole system may begin to fall apart.

<script>
window.P_CONFIG = {
  W: 328,
  H: 260,
}
</script>
<div
  id="proj-canvas-container"
  style="text-align:center; width: 328px;"
  class="image-right"
>
  <canvas id="proj-canvas"></canvas>
  <center><small>There are so many dimensions to a problem that we try to ignore, but they're always there.</small><center>
</div>

So much of our society relies on assumptions we make about the world. These assumptions are what enable us to predict the future. We assume that, [given no change in extraneous events][pde], X cause will indeed lead to Y result, but this is never the case long-term.

Examples of this abound: laws written for one context are applied to others even if they're a bad fit, institutions which spring up and thrive in one era calcify and die in a later one, entire governments arise, prosper, and fall when the underlying technologies they depend on change or evolve. These are the hidden assumptions that power our world and they're the ones we ignore in order to build simple models of the future.

A mass on a spring slides back and forth on a smooth table according to our models because we exist in a world wherein it could be so. Tables have to be made by a company whose existence is protected by a stable government. They have to be smoothed, finished, and shipped to a lab wherein they can be connected to a well-manufactured, uniform spring and mass under the watchful eye of an educated scientist and their well-fed, attentive graduate student.

The simplest experiments have hundreds of hidden variables, none of which are in the eventual model&mdash;and for good reason&mdash;but our extraordinary ability to predict the behavior of the world depends on hidden, load-bearing walls and it's when those walls, those assumptions, begin to fail and break down that our models and [our societies go with them][rouseau].

## The Current Dilemma(s)

<img src="/images/blog/roman-pillar.svg" class="image-right" style="width: 150px;">

When systems degrade it's often not because of their easily quantifiable benefits, but because of the weakening of their underlying load-bearing walls.

> “The current nation-state could not possibly exist in a world without the printing press,” Ball told me. “It couldn’t exist without the current telecommunications infrastructure. The nation-state is built dependent upon the macro-inventions of the era in which it was assembled. A.I. changes all of this in ways that are hard to describe and kind of abstract.”<br >
> I suspect they won’t remain abstract for long.<br />
> - Ezra Klein, *[The Future We Feared Is Already Here][ez]*

The ongoing devolution and polarization of American Democracy has left our institutions fragile and crumbling, and the decline of American hegemony, upon which rests the foundation of the [post-war order][long-view], means that the rest of the world feels the strain along with us.<sup>5</sup> Americans, broadly speaking, are divided and bitter and so far nothing seems to be able to pull us back from the brink.

What's more the A.I. revolution is ongoing and it's upending our social fabric by further loosening the trust we have in the words and images we see online. As with any technological revolution, it has many upsides (otherwise we wouldn't be doing it) but it comes with downsides that are less easily quantifiable and certainly more foundational.

As Ball notes, the printing press arguably enabled democratic experimentation in the early-modern period. Linda Colley expands on this topic [in her book][gsp], *The Gun, the Ship, and the Pen* where she argues that writing and especially written constitutions (born in a new age of literacy and the Enlightenment) were critical technologies that allowed for the creation of modern [liberal democracy][ym].<sup>6</sup>

Writing, literacy, truth, and trust in a shared reality are the hidden, and very much load-bearing, walls of the western democratic world order, and without them those institutions will struggle to bear the weight of this century's challenges.

<img src="/images/blog/gsp.jpg" class="image-right" style="width: 200px;">

Though it's important to remember that not all load-bearing walls are good.

Historians debate whether the existence of a rivalry between the ancient Romans and the Carthaginians was in some way load-bearing for the stability of the former's republican system. The defeat of Carthage at the end of the Punic Wars left Rome without a clear enemy abroad and so they found one at home. Systemic oppression has also historically been load-bearing for many societies. This, of course, does not mean that these walls should not be broken down, but it does mean that we need to explicitly identify and replace the good parts while purging the bad.

What's more the feedback loops present in the real world sometimes mean that the roof collapses [years after the fact][cim]. By the time it does, the walls are long gone and it's too late to replace them. All we can do is live with the consequences while we work to dig ourselves out. Julius Caesar crossed the Rubicon in 49 B.C.E., nearly a century after the Punic Wars had ended.

We'd do well to identify and fix what we can *before* the roof falls in. But to do that we need to know which walls are load-bearing and understand the loads they bear.

## Remodeling is Hard

Anyone who's gone through an extensive remodel knows that the process, while it may be worth it in the end, is incredibly frustrating and *always* takes longer than you think. Replacing a load-bearing wall is an act that must be undertaken with intent.

There is much in the world, and in ourselves, that relies on the foundational bulwark of these load-bearing walls and so we should work to be aware when we are working to tear them down and we should put in the work to build sturdy replacements.

Personally, that might involve introspection about yourself, your motivations, and the foundational institutions we share as human beings in community with each other. As a society it might mean building up shared systems of trust and mutual accomplishment, systems where we can build toward something positive, together, and give us the opportunity to find a shared future in this world. It might also mean taking the time to appreciate a simple game night with friends for as long as it may last.

[v-chaos]: https://www.youtube.com/watch?v=fDek6cYijxI
[v-finance]: https://www.youtube.com/watch?v=A5w-dEgIU1M
[boyle]: https://archive.org/details/foundationsofnew0000dobb
[2nd-law]: https://en.wikipedia.org/wiki/Second_law_of_thermodynamics
[ez]: https://www.nytimes.com/2026/03/08/opinion/ai-anthropic-claude-pentagon-hegseth-amodei.html
[long-view]: /archive/the-long-view-of-history/
[ym]: https://www.hup.harvard.edu/books/9780674237681
[gsp]: https://history.princeton.edu/about/publications/gun-ship-and-pen-warfare-constitutions-and-making-modern-world
[atl]: https://www.theatlantic.com/ideas/archive/2024/02/america-decline-hanging-out/677451/
[pde]: /archive/empirical-partial-derivatives/
[rouseau]: https://www.gutenberg.org/files/46333/46333-h/46333-h.htm#:~:text=Along%20with%20these%20three%20kinds%20of%20law%20goes%20a%20fourth,form%20in%20the%20end%20its%20immovable%20keystone
[v-breakdown]: https://www.youtube.com/watch?v=ovJcsL7vyrk
[cim]: https://en.wikipedia.org/wiki/Comprehensive_Immigration_Reform_Act_of_2007

<div class="footnote">
<sup>1</sup> For certain definitions of "long term".<br/>
<sup>2</sup> As every physics professor ever has always suggested.<br />
<sup>3</sup> To see how this happened to Robert Boyle during a 20 year long experiment(!) see <a href="https://archive.org/details/foundationsofnew0000dobb">The Foundations of Newton's Alchemy</a> (p 86).<br />
<sup>4</sup> Traditions, no matter how silly, are usually load-bearing. Maybe those ways are trivial, but likely not.<br />
<sup>5</sup> For all its many failings, the Post-War Order™ has been remarkably good at its original goal of preventing Great Powers from engaging in nuclear war. I do not want to be around when this load-bearing wall finally gives way.<br />
<sup>6</sup> Liberal as in classical liberal (i.e. freedom, liberty). Not "left".
</div>

<script src="/other-projects/double-pendulum/pendulum.js"></script>
<script src="/other-projects/proj-canvas/proj-canvas.js"></script>
