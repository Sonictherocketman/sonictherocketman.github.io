slug: software-correctness-and-software-engineering
published: Mon, 05 Oct 2015 at 04:50 PM
updated: Sun, 27 Nov 2022 04:42:17 
title: Software Correctness and Software Engineering 
author: Brian Schrader
tags: software development
status: publish

[David R. MacIver:][1]

> You have probably never written a significant piece of correct software.

> ...the chances of having written whole programs which are [bug free] are 
> tantamount to zero.

> It’s not because we don’t know how to write correct software. We’ve known how
> to write software that is more or less correct (or at least vastly closer to
> correct than the norm) for a while now. If you look at the NASA development
> process they’re pretty much doing it.

> The problem is not that we don’t know how to write correct software. The
> problem is that correct software is too expensive.

[1]: http://www.drmaciver.com/2015/10/the-economics-of-software-correctness/

David's post covers quite a few very important points, and while I've [covered 
this issue before][2], I think it bears diving back into. 

[2]: http://brianschrader.com/archive/software-engineering/

Software Engineering isn't like any other form of engineering. It has nowhere
near the maturity of the classical engineering fields, and it's poisoned by a
"shipping culture" wherein getting software into the user's hands is more
important than that software actually working properly. Now, this isn't to say
that product companies and start-ups are wrong, but this culture
has soured our mental model of how engineering works. Engineering is the
process of designing, developing, maintaining, and predicting the behavior of
some device or structure. According to the American Engineer's Council for
Professional Development, the [definition of engineering][3] is (emphasis mine): 

[3]: https://en.wikipedia.org/wiki/Engineering#Definition

> The creative application of scientific principles to design or develop
> structures, machines, apparatus, or manufacturing processes, or works
> utilizing them singly or in combination; or to construct or operate the same
> with full cognizance of their design; or **to forecast their behavior under
> specific operating conditions; all as respects an intended function,
> economics of operation or safety to life and property.**

That last part is important when it comes to Software Engineering. Forecasting
the behavior of a system and being able to say it respects the user's safety to 
life and property is something that most developers don't consider when
building their software. Why?

> The rest of us aren’t writing safety critical software, and as a result
> people aren’t willing to pay for that level of correctness.

This is in stark contrast to, for example, the way that NASA develops software.
At NASA, software is treated as just another branch of engineering/development.
It's design goes through the same rigorous review that their rocket engines,
and safety harnesses do. Why? Because a failure in software could cost
*billions* of dollars, and possibly kill people. These are stakes that software
like Twitter and iTunes will never have to face, thankfully (iTunes would kill
us all).

David links to an article, originally from the mid-90s, detailing NASA's
software development process. Their process is extremely boring, and has tons 
of overhead. The code is designed, **line by line** in pseudo-code before ever 
being typed into an editor. Engineers then just write the code exactly as it's 
outlined in 3,000+ line blueprints. 

[Charles Fishman:](http://www.fastcompany.com/28121/they-write-right-stuff)

> That's the culture: the on-board shuttle group produces grown-up software,
> and the way they do it is by being grown-ups. It may not be sexy, it may not
> be a coding ego-trip — but it is the future of software. When you're ready to
> take the next step — when you have to write perfect software instead of
> software that's just good enough — then it's time to grow up.

> It's the process that allows them to live normal lives, to set deadlines they
> actually meet, to stay on budget, to deliver software that does exactly what
> it promises. It's the process that defines what these coders in the flat
> plains of southeast suburban Houston know that everyone else in the software
> world is still groping for. It's the process that offers a template for any
> creative enterprise that's looking for a method to produce consistent - and
> consistently improving — quality.

This sounds, frankly, crazy, and no software focused company would want to adopt
a system like this, and I can't blame them. It does not sound like fun, but it 
does sound like the code will be correct and largely error free. Obviously this 
method doesn't work for a lot of use cases in the world of Software Development,
and that's ok. One of the bonuses of writing non-critical software is that it
doesn't have to be 100% correct, it can have bugs and fix them over time. I
think one of the best moments for a piece of software, though, is after it
becomes fairly successful, and it decided to grow-up and start focusing on
stability, consistency, and correctness. We see these waves of new features and
lulls of stability releases in a lot of consumer software these days; Mac OS X
is a notable example. 

In my mind though, developers should take a page out of NASA's book, and take
their products more seriously. Engineering software is a time consuming,
precise operation, and it should be given the respect and care it deserves.  

NASA is able to send a probe to Pluto, on a 15 year journey, collect the first 
ever pictures of the dwarf planet, and send them back to earth *automatically* 
with code written *2 decades ago* that hasn't needed to be updated since it 
launched. That's damn near perfect software; that's real Software Engineering.


[The economics of software correctness &#8594;](http://www.drmaciver.com/2015/10/the-economics-of-software-correctness/)

[They Write the Right Stuff
&#8594;](http://www.fastcompany.com/28121/they-write-right-stuff)
