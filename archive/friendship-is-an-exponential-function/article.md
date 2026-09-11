slug: friendship-is-an-exponential-function
published: Mon, 13 Jul 2026 at 04:02 PM
updated: Fri, 11 Sep 2026 22:30:27 
title: Friendship is an Exponential Function
status: publish
author: Brian Schrader
hero: /images/blog/shared-coffee.jpg
summary: The best friendships are the ones that happen, not because of scheduled time, but in spite of it.
showfootercallout: true
tags: essay, personal

<script src="/other-projects/plotFns.js"></script>

What allows you to make friends and to keep them? Being a social person helps with making friends, surely. As does putting in the effort to be a good friend. But I'm sure we've all had the experience of wanting to become friends with someone, but yet it never really happens. Maybe there's never the time. Maybe you're too far apart, and I mean that literally.

This is something I've observed over time, as friends move around and as people's lives grow, evolve, and change: the total friendship between two people evolves as a function of distance.

<div id="friend2-container" class="image-right" style="width: 300px;">
  <canvas id="friend2-canvas"></canvas>
  <small><center>
    I think this is how we <i>want</i> or expect friendship to behave.
  </center></small>
</div>
<script>plotFns({W: 300, H: 250, labels: ['Imagined'], xMin: 0, xMax: 2, yMin: 0, yMax: 1, showPlayButton: false}, 'friend2-canvas', (x, t) => 1-x/2);</script>

This means that two people, given the inclination to become friends, will see their friendship improve and decay based on their physical distance from each other&mdash;how far they live from each other. I think this makes intuitive sense. Two people who live together obviously see each other more than two people who live a continent apart. Yet what is surprising is that this function is not linear.

Friendships, in my experience, are strengthened not by planned time together, but by *accidental* happenstance and the unplanned ability to simply spend time in the same place. If you live next door to a friend, spending time together is easy. Outside of your home, that friend is your *easiest* option for social interaction. You can share meals, woes, gossip, and even just yell over the fence to each other. That closeness is not a function of your effort to connect, but precisely because of the lack of effort you both needed to expend!

Given suitable places to go, a coffee, dinner, or beer with friends nearby becomes a text message away.

> Beer at Ould Sod?

<div id="friend-container" class="image-right" style="width: 300px;">
  <canvas id="friend-canvas"></canvas>
  <small><center>
    Friendship falls off quickly with distance, then that descent slows down.
  </center></small>
</div>
<script>plotFns({W: 300, H: 250, labels: ['Friendship'], xMin: 0, xMax: 5, yMin: 0, yMax: 1, showPlayButton: false}, 'friend-canvas', (x, t) => Math.exp(-x));</script>

In business-speak: there is very little friction here. Again think of a friendship within a household. You don't schedule wine with dinner. You just see if your friend or partner wants some, then open the bottle. The need to schedule, especially with a calendar, is the sign of a friendship's formality. It's the sign that physical distance has intruded on your shared lives.

Yet, I assume none of this is surprising. The important thing I've discovered is that this function of distance is *not linear* as I said. We expect that moving a *little* further away would have a proportional effect on the friendship.
In practice though, it's exponential.

This means that friendship, given no additional effort, will decay much faster than you think. Moving a block away is worse than being next door by a surprising amount. Moving across town marks the end of an era. Sure, given time and deliberate effort (and lots of calendars) you can overcome the barrier of distance. The internet has helped here too, but scheduled time and video calls are no basis for the same friendships that occur naturally in backyards, on doorsteps, or at nearby restaurants, coffeeshops, and bar counters.

There's an [old meme](https://www.reddit.com/r/Urbanism/comments/mbl0es/half_the_reason_folks_romanticize_college_is/):

<div class="image-right" style="width: 240px;">
  <img src="/images/blog/shared-coffee.jpg" style="max-width: 100%;">
  <small><center>Photo: mine</center></small>
</div>

> Half the reason folks romanticize college is because it's the last time most folks lived in dense, walkable neighborhoods focused on providing community during plentiful off-hours.

I've been lucky enough to be able to live in a vibrant, walkable, and [third-place abundant](https://en.wikipedia.org/wiki/Third_place) neighborhood for over a decade. What's more I've been luckier still in that many of my friends live within walking distance. I grew up in a small neighborhood with several kids down the street to play with. In a way I still have that, for now.

What it means though is that to be nearby is to be part of a group of friends who are just simply closer than my other friends, even if we weren't all that close to begin with. It's just easier to hang out, easier to spend time, and friendship, if anything, is a function of time spent together. That time is a function of effort, of shared interest, and importantly the exponential of distance.
