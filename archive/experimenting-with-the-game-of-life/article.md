slug: experimenting-with-the-game-of-life
published: Mon, 25 Sep 2023 at 04:18 AM
updated: Fri, 06 Feb 2026 00:10:33 
title: Experimenting with the Game of Life
author: Brian Schrader
tags:programming,fun
status: publish


As I am [want][mp] to do, I spent an evening a while back putting together a Python version of [John Conway's][jc] Game of Life: a &quot;zero-player game&quot; in which the board state progresses automatically according to a set of rules.

You can find the code for the [game here][code]. It requires just the Python standard library to run, so its easy to get started assuming you have Python >=3.10 installed. (It might run on lower than that but I didn't test it.)

![A screenshot of the Game of Life][life]
<center><small>A screenshot of my version of The Game of Life</small></center>

<details>
<summary>Gameplay Video</summary>
<div>

<video autoplay="false" preload="false" controls>
    <source src="/images/blog/Gol.mp4" type="video/mp4">
</video>
<center><small>Thrilling, right?</small></center>
</div>
</details>

The initial board state for the game is randomized so each run-through is unique. Some end immediately, so you may have to run the script several times to see something cool happen.

Because it's written in Python, the game is single threaded and quite lacking in raw performance, but because it's written in Python the game was also incredibly easy to put together&mdash;taking about three hours in total including debugging, though I did spend three more hours optimizing the render performance for no reason.

As with most of my recent script projects, I don't really have a point or reason for doing it other than to have some fun building toy projects. Like I've said before:

> Scripts are programming candy whereas app development is the real meat and potatoes. In a script you can take shortcuts, be a bit messy, and forgo worrying about the complexities of large software.<br />
> - [Take A Break, Script Something](/archive/take-a-break-script-something/)

In that same time I've also thrown together a few little scripts to [visualize the chaos of the Collatz Conjecture][collatz] and [simulate the dynamics of 2-D gas expansion][gas]. Are these important? Nope, not at all. Were they fun? Yes, yes they were.


[code]: https://gist.github.com/Sonictherocketman/4551dcf001932639a03e8849be92ff71
[life]: /images/blog/life.png
[mp]: /archive/fun-with-math-calculating-multiplicative-persistence/
[jc]: https://en.wikipedia.org/wiki/John_Horton_Conway
[gas]: https://gist.github.com/Sonictherocketman/be0a4aa1a43d3c74604ea9f3f5352e63
[collatz]: https://gist.github.com/Sonictherocketman/5d51d3c8e739624404f3f8535fb1f564
