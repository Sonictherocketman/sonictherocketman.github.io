slug: mvvm-is-not-very-good
published: Sun, 20 Dec 2015 at 01:45 PM
updated: Thu, 03 Dec 2020 at 04:21 AM
title: MVVM is not very good
author: Brian Schrader
tags: development
status: publish

[Soroush Khanlou:][1] *(emphasis mine)*

> The lack of concrete naming makes this class's responsiblities grow endlessly. What functions should go in a view model? Nobody knows! Just do whatever.

> The most charitable thing that I can say about this pattern is that **it changes your kitchen sink from a view controller**, which is not an object that you own (because it's a subclass of an Apple class), to a view model, an object that you do own. The view controller is now free to focus on view-lifecycle events, and is simpler for it. **Still, though, we have a kitchen sink. It's just been moved**.

[1]: http://khanlou.com/2015/12/mvvm-is-not-very-good/

One of my current projects is a Knockout MVVM project and I agree with everything Soroush is saying. We've pretty much decided that we are just going to use good-old MVC for our project instead of MVVM because of it's needless complexity. I'm reminded of a Gary Berndhart talk, [*Boundaries*][2] in which he talks about the Ruby community's struggle with where to put their [big balls of mud][3].

[2]: https://www.youtube.com/watch?v=yTkzNHF6rMs
[3]: https://en.wikipedia.org/wiki/Big_ball_of_mud
