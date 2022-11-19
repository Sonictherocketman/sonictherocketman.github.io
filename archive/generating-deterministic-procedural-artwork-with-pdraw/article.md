slug: generating-deterministic-procedural-artwork-with-pdraw
published: Fri, 18 Feb 2022 at 10:36 PM
updated: Sat, 19 Nov 2022 23:42:05 
title: Generating Deterministic, Procedural Artwork with pdraw
author: Brian Schrader
tags: programming, python, software, tools
status: publish

I've been messing with procedural artwork lately, and I've decided to discuss the fruits of my labor. Behold [pdraw][1]: a script that generates cool line art from arbitrary text!

[<img class="image-right" src="/images/blog/pdraw.gif" alt="Pdraw.py" style="max-width: 300px;" />][1]

About two weeks ago, [Numberphile][2] released a new video about visualizing the digits of Pi using procedural artwork. I was taken by the idea and decided that I would, for fun, simply replicate their technique in Python and use it to plot random sections of Pi. It was a sort of goof-off project to occupy an evening. At the end of that evening, I had finished my script (through several iterations) and plotted various sections of Pi. I could now plot any stream of numbers. Then it hit me: all digital data can be represented as a base 10 string of numbers. I could draw anything.

The next evening, I set about making it so that my script could accept various command-line configurations and convert any text into its base 10 equivalent (with a small tweak for artistic reasons). Once I had that, it was time to start plotting anything I could think of. I've tried drawing binaries, zip files, websites, and a lot more.

I've [open sourced][1] the code for pdraw &mdash; which uses no dependences because Python is cool like that &mdash; so you the technically inclined reader can draw your very own text streams and see if they produce anything interesting.

I've found that the cooler drawings tend to arise from text containing between 250-2000 characters, although larger files can be cool too. What's especially interesting is that you can almost see the structure of the data in the drawing as you watch it draw. For example, my blog archive page is basically a blob of header information, then a long and repetitive HTML table, and then another blob. This structure appears in the drawing when you plot the HTML of the page; the table rows appearing as little loops followed by lines in random directions.

```
$ curl https://brianschrader.com/archive/ | ./pdraw -e
```

Check it out, and let me know what you do with it. I'd love to know if anyone finds more cool things to do with pdraw, or if you generate some particularly cool drawings with it.


[1]: https://github.com/Sonictherocketman/pdraw
[2]: https://www.youtube.com/watch?v=tkC1HHuuk7c
