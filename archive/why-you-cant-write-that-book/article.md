slug: why-you-cant-write-that-book
published: Mon, 27 Apr 2026 at 04:37 PM
updated: Mon, 27 Apr 2026 16:37:10 
title: Why You Can't Write That Book
author: Brian Schrader
tags: essay
status: publish
hero: /images/blog/doctors.png
tags: essay

> I could do that, I just need more time.

In life we are constantly wishing we had more of something: time, money, friends, energy, etc., and we develop plans to try and meet these goals. We alter our diets, our schedules, we start exercising or reading more. Often times these changes result in significant improvements to our lives. Yet, we never have the energy, the time, or the money that we want. Even when we do succeed in making changes, something else comes up and blocks further progress.

<div class="image-right" style="width: 300px;">
  <img src="/images/blog/book-blink.gif" style="max-width: 100%;">
  <center><small>The eternal curse.</small></center>
</div>

Let's say you want to write a book. You change your schedule to allow for dedicated writing time. However during that time, you're unmotivated. You diet and exercise and read interesting books, trying to kindle the enthusiasm you know you have, but now you have no energy left to write. You have the time, but only to spend staring at a blank page.

Life is a constant balance of particular factors and it takes considerable skill to strike any balance at all for any length of time.

Permit me, if you will, to remind you of your high-school Chemistry class. You probably learned about the concept of a limiting reagent.

> The limiting reagent (or limiting reactant or limiting agent) in a chemical reaction is a reactant that is totally consumed when the chemical reaction is completed.<br >
> - [Wikipedia](https://en.wikipedia.org/wiki/Limiting_reagent)

Let's say you have a reaction between two compounds (for simplicity let's call them A and B). It takes 2 units of A + 3 units of B to make 1 unit of C.

<center>2A + 3B = 1C</center>

Now let's say you have 10lbs. of A and 12lbs. of B. How much C can you make and what ingredient will you run out of first? That ingredient is your limiting reagent (answer: it's B).

However, this formulation assumes that the amounts of A and B are constant over time. For example, let's say that we know that we need more of B and want to increase the amount of it we have. We go to the store and get 20lbs. of it! However we now find that, flush with one ingredient, we quickly run out of another. We get less of C than we planned.

Perhaps a cooking example would have been better here (cups of flour vs number of eggs), but I digress.

{% include 'newsletter-callout.html' %}

## Limits Abound

We see examples of this phenomenon everywhere in our society and lives. For a completely different example, consider the current phenomenon of AI coding agents on the productivity of software companies. Writing code used to be slow, now it is significantly faster. However, humans still need to understand, design, and approve that code. A 10x speed-up in the writing of code has not translated to a 10x speed-up in productivity overall because something else in the pipeline is too slow to keep up with this new glut of AI-generated code. We've found a limiting reagent: system design and code approval.

The Economist [John Maynard-Keynes once said][keynes], "We can afford whatever we can do." By this he meant that if we want to fund the building of more schools we can, assuming we have enough construction workers, lumber, etc. I've often heard of this quote being used to critique plans for single-payer healthcare in America. We can certainly afford to offer healthcare to all Americans. Most American's have health insurance already, just through a private carrier. However, there is considerable pressure on people not to use their healthcare because it's expensive.

<script src="/other-projects/plotFns.js"></script>
<div class="image-right" style="width: 300px;">
  <canvas id="plots"></canvas>
  <center><small>A marked phase-change, where the limiting reagent changes.</small></center>
</div>
<script>
  plotFns({ showIntersections: true , labels: ['Insured Patients', 'Doctors Available'], xMin: 0, xMax: 5, yMin: 0, yMax: 5, H: 300, W: 300, plotLabels: false, showPlayButton: false}, 'plots', (x, t) => 2*x-2, (x, t) => 0.25*x+2);
</script>


If we make it cheaper (by subsidizing care) then we will run into another problem. We physically don't have enough doctors to see all those people. We cannot simply pay doctors more because, no matter how many times you double a person's salary, they cannot double their patient count. We've found another limiting reagent.

[keynes]: https://en.wikiquote.org/wiki/John_Maynard_Keynes#:~:text=Anything%20we%20can%20actually%20do%20we%20can%20afford.

The lesson in all this is that no matter how much you push on one factor, work to increase its capacity, there are hidden walls, hidden assumptions, that will become relevant only once the limit in your current focus is removed. This is  the curse of supposed panacea. A thing which looks to solve a problem "for good" does indeed remove one particular problem, only to reveal that it was concealing other problems in its shadow. I've heard people use the refrain that "success hides problems", but problems also hide problems.

We can make progress, of course, and we often do. But the universe has a cruel sense of humor. Sometimes our solutions can summon problems of their own. Geopolitics is full of such scenarios. Countries look to electrify, to move away from the dangerous and fragile world of fossil fuels, only to become reliant on a *cartel nuovo* of battery manufacturers.

As humans, we struggle to see beyond the first derivative. We can predict the response to our actions, but not the response to that response. As such, there will always be limiting reagents, always another reason why you're too tired to write that novel of yours.
