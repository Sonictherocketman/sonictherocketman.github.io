slug: words-are-a-leaky-abstraction
published: Mon, 16 Feb 2026 at 10:15 PM
updated: Thu, 05 Mar 2026 20:10:06 
title: Words are a Leaky Abstraction
author: Brian Schrader
tags:philosophy,science,programming,essay
status: publish
hero: /images/blog/highcohesion.jpeg

<style>
code {
  font-size: 10pt;
}
</style>

Something about hearing the phrase ["Claude's Soul Document"][1] got me thinking again about a problem I've long pondered. Software folks, like myself, have a long and proud history of taking words that exist and coopting them, manipulating the meaning of those words into feeble shadows of their former selfs. Tech people and tech companies do this on accident and on purpose, both because it can be useful to reduce a human concept to something simpler to quantify *and* because its easier to market and sell. Machine Learning, an academic term, becomes Artificial Intelligence and the word "Intelligence" is defined down in order to be achievable.

But before we get too far down the Current Events rabbit hole, let's take a step back.

## What Trust Is

Personally, I love it when Computer Science research accidentally stumbles on human truths, like this gem from an [IEEE paper][2] in 1995:

> [Trust] depends on the actual experience of users. Trust is hard to create
but very easy to lose. Trust must be handled as a very precious good.

However, while the definition of Trust in Computer Science is metaphorically similar to that in human systems (and is indeed reliant on Human Trust) it isn't the same thing. Trust for a computer is a system which is verifiable with cryptography, it's a process by which one can be certain (or as certain as possible) that the server you're talking to is indeed who they say they are.

Consider a different example: When designing an application, it may be important to collect some information from a user (perhaps their name and email address). To do this, one might create a database table or a model class called `User` or `Person`. A `Person` may have a `firstName` and a `lastName` and an `emailAddress`, and that will be suitable for your purposes. But ask yourself: is that what a `Person` is? Is person-hood definable by its attributes like this?

In one particular example from my own project history, we needed to model how customers and their attorneys would interact with our system. For legacy reasons, the attorney data wasn't stored in the same structure or format as the customer data, and so when it came time to model the data, the team decided to create an abstract `Person` class, which was inherited by the `Customer`, but not by the `Attorney`. Hence, in that system (as we would often joke) Attorneys weren't People.<sup>1</sup>

Yet as software becomes more and more the infrastructure of our modern world, and the hard-coded policy by which we make decisions about other people's lives, this nuance is important. It's entirely possible to live a human life with the name Null, but it's very difficult to do so in a world built on computers. Personhood is not definable by the criteria of software, not only because software defines objects by their attributes, but because software is written in words and words are a leaky abstraction over the nuanced realm of thought.

## What Words Are

Words, at their core, are a communication protocol that allow two minds to exchange information. They're a particular form of communication, similar to body language or facial expressions, but with a complex and nuanced syntax that has to be learned by the communicating minds slowly over years and decades.

This makes words fundamentally distinct from a computerized communication protocol because while two computers might communicate by exchanging JSON messages, the knowledge of JSON *itself* was provided by the programmer and not learned by the computers doing the communicating.

Consider this common scenario:

You and your friend are discussing a contentious topic. For simplicity, let's say you're debating where to eat dinner. You suggest Indian Food, they dislike that option because it's too spicy and instead they suggest the Melt-Your-Face Wings place nearby. You're rightly confused because their stated reason for disliking your option seems to contradict their exact suggestion. Arguments erupt.

However, in this case, what has happened is that you both have discovered that you define the same words to mean different things. Spicy, to one of you, means capsaicin content, while to the other it means the intensity and complexity of the various spices in a dish. Same word, to different contextual meanings.

For a more impactful example of this debate in modern American culture, consider the meaning of the words Freedom, Liberty, or Equality.

<div style="display: flex; width: 100%; gap: 0.25rem; justify-content: space-between; flex-wrap: wrap;">
  <div style="width: 300px;">
   <img src="/images/blog/high-cohesion-ideas.gif" style="max-width: 100%;">
   <center><small>High-Cohesion Discourse</small></center>
  </div>
  <div style="width: 300px;">
   <img src="/images/blog/low-cohesion-ideas.gif" style="max-width: 100%;">
   <center><small>Low-Cohesion Discourse</small></center>
  </div>
</div>
<center><small>Two people engaging in discourse narrow down the meanings of words from all possible meanings (blue circle) into their personal meaning (shaded blue and tan). Their shared understanding is then highlighted</small></center>

Thus there is some difference in the overlap of what a given word might mean at a given time. Two people may have a Highly-Cohesive definition of a word (that they share many of the same understandings) or a Low-Cohesive definition. This is because words ultimately are defined, not by a rigid protocol enforced from on-high, but by its users in real conversation and those definitions change over time.

## Words As Compression Algorithm

> [Old Entish] is a lovely language, but it takes a very long time to say anything in it, because we do not say anything in it, unless it is worth taking a long time to say, and to listen to.<br />
> &ndash; [Treebeard][3], *The Lord of the Rings, The Two Towers*

<img class="image-right" src="/images/blog/treebeard.jpg" style="width: 300px; margin: 0;">

Comedic aliens in sci-fi often communicate with stilted language or say things that sound just plain weird, yet rarely are the statements untrue. Instead they simply belie a lack of shared context. We don't specify everything with exactness in a conversation, instead we discuss only what is relevant and what has changed. No one greets a friend on the street by acknowledging that they still have their skin, because such a thing is required for the conversation to be occurring as it is. In this way, words are the result of a combined compression algorithm. You can't say everything that's on your mind (in my own experience, the brain moves much faster than words can manage), and so we have to strip away and compress our experience into a lossy format suitable for data exchange.

However, this means that language itself is lossy. It cannot communicate the full meaning of a thing. It's only suitable for communicating the difference in meanings between two human minds who have come to learn the same language in a similar time, place, and culture.


## What is Expressible in Words

Ultimately, what a Person is cannot be defined by a software system, and neither can Trust, Intelligence, or even Spice Content. And even if it could be, those definitions rely on shared context. Words are human concepts with fundamentally fluid meanings based on fundamentally fluid understandings. I would argue that we don't really even know what Intelligence is, and so attempting to define it is like painting a mural of a landscape you've only seen in the dark.

Yet in software we need words to describe our creations, and so we co-opt words from everyday use and thus we have a User table and a Person class. We build computer systems based on Trust, and we create Artificial Intelligence. However we assume that these ideas (personhood, trust, or intelligence) are ultimately definable in words and that words can capture the immense and often conflicting nature of these concepts.

At last, let's return to the idea of Claude's Soul.

## Souls Made of Words

I'll admit, the idea of a `Soul.md` is actually pretty funny to me, but it reveals a lack of understanding about the nature of how we can constrain our new and shiny AI agents as we give them more and more power over the world we've constructed.

A soul file presumes, by its very existence, that what makes a soul (or personality, worldview, whatever) is expressible in words because words are ultimately what gets written in text files. It's a fallacy to assume we understand even our own minds, let alone that we can construct language to communicate that lack of understanding to others. This is a fundamental flaw with using language to constrain behavior, and it's not really specific to AI. Like a lot of modern problems, they have ancient analogues. Consider the law.

Is it possible to construct laws which are impossible to adhere to in bad faith? It seems not. Laws are a behavioral code, written for humans by humans and laws are made of words. Ultra-literal readings of many laws yield horrible outcomes and so we often don't do that (until we suddenly do for political gain but that's a different issue)<sup>2</sup>. Yet computers read everything with a hyper-literal lens and do not take into account the larger context of a situation or the depth and complexity of real life.

One of the primal issues with Large Language Models is built right into the very foundation of the technology: it depends on and produces language and language, in all its forms, is a simulacrum of true understanding.

<div class="footnote">
<sup>1</sup> Yes, I know "People" isn't technically the plural of "Person" (it's Persons) but no one says that these days. According to Strunk &amp;White, People is a natural term, Person is a political term.<br />
<sup>2</sup> For a, hopefully, non-contentious example: the First Amendment to the US Constitution says "Congress shall make no law&mldr;abridging the freedom of speech&mldr;" yet legal scholars for two hundred years have agreed that "no law" does not mean "literally zero laws". It's more a stern guideline. It is against the law to credibly threaten to kill the president, even if that is a form of speech. See also: defamation and slander.
</div>


[1]: https://www.lesswrong.com/posts/vpNG99GhbBoLov9og/claude-4-5-opus-soul-document
[2]: https://ieeexplore.ieee.org/abstract/document/403454
[3]: https://tolkiengateway.net/wiki/Entish
