slug: more-scripting-nonsense-rocket-edition
published: Fri, 17 Mar 2023 at 11:15 PM
updated: Thu, 24 Jul 2025 22:06:45 
title: More Scripting Nonsense: Rocket Edition
author: Brian Schrader
tags: programming,fun
status: publish

I was browsing [my Github Gists][1] the other day, as you do, and I came across my first one published back in 2015: [Rocket.py][2]. This script was one part of a rocket trajectory simulator I built for a class in college. Now I don't remember much about that project, but I do remember that the simulation never actually worked&mdash;or rather that it never worked *properly*.

<img alt="A screenshot of the trajectory over time" class="image-right hide-on-mobile" src="/images/blog/rocket-trajectory.png" />

So since I had some idle time on my hands, I decided to spend an evening and take another stab at the project. These days I'm a far better programmer but I remember next to nothing about rocketry, and so I added a bit of a challenge for myself: try to look up as little as possible.

About two hours later [I had this][3], a new rocket simulation that seems to produce accurate values (if you neglect drag&mdash;more on that later). Now my first simulation only output a set of numerical values for each second of flight, and while those numbers were useful for the class, they're not very interesting to look at so I added a little visualization (drawn with Python's turtle graphics).

Each phase of the flight is color-coded: green for powered flight, blue for cruising, and red for descent, and the flight statistics seem accurate enough to me when I plug in the numbers for the [first stage of SpaceX's Falcon 9][4], so that bodes well. And at the end of each flight you get a summary readout in the terminal.

The code is pretty full-featured, and since it uses turtle graphics (and my other [drawing project][5]) it can even save the trajectories as EPS files for easy printing &amp; saving. You can customize the launch angle, the burn time, specific impulse, fuel and payload weights and even the screen refresh rate using the many CLI flags. The script requires nothing but Python3.10 or later (with the tkinter module included of course), and so it's easy to play with if you're interested.

All in all it was a fun evening project, and I was especially surprised to find that I remembered a lot more of the intricacies than I expected. I still had to look up the equations for specific impulse, but that was it really. The kinematics stuff was beaten into my head in school so I doubt I'll ever forget that. Really the only thing that gave me any trouble was the drag&mdash;which I decided to omit anyway.

<img alt="A screenshot of the stats of the flight in the Terminal" src="/images/blog/rocket-stats.png" />

I had initially wanted to add the drag based on the mach number, but my memory failed me on how to do that and late-night searching only threw me down a rabbit hole of further questions. Past me knew a lot more about this stuff than current me does. In the end the drag was a nice-to-have feature anyway and by the time I got to that point it was nearly one in the morning, so I just declared victory and went to bed.

I have no real point to this post other than to show how much (and how little) I remember about rocket mechanics after all these years and to show off a cool bit of scripting. It's toy projects like this that got me interested in programming and they can be a really fun way to spend an idle evening.

---

Disclaimer: I *think* the values in the simulation make sense, but I didn't spend too much time validating them. If there's any real rocket people out there who find issues with my results, then I'm sorry; now you know one of the reasons I didn't go into aerospace.

[1]: https://gist.github.com/Sonictherocketman
[2]: https://gist.github.com/Sonictherocketman/11339552
[3]: https://gist.github.com/Sonictherocketman/2b3836cb2bc2ca7fdb5283deb67d20c6
[4]: https://en.wikipedia.org/wiki/Falcon_9
[5]: /archive/generating-deterministic-procedural-artwork-with-pdraw/
