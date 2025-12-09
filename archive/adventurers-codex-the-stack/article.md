slug: adventurers-codex-the-stack
published: Thu, 06 Jul 2017 at 05:28 PM
updated: Tue, 09 Dec 2025 22:38:20 
title: Adventurer's Codex: The Stack
status: publish
author: Brian Schrader
tags: adventurerscodex, dnd, software

I figure that if I'm going to write a series of posts about how and why [Adventurer's Codex][ac] works the way it does, it might be good to first talk about what's actually powering it. It's time to talk about our "stack".

People like to think that a project's internal technologies are chosen by seasoned professionals who carefully weighed the differences between competing options over the course of months, but from what I've seen it's usually just whatever the first developers on the project liked or already knew how to use and [Adventurer's Codex][ac] is no different. Before we started we asked around for suggestions on frameworks to use, and when in doubt we used what we'd learned at work. We were not seasoned architects and we didn't spend months deciding, we were (are) anxious developers trying to bring our dream to life.


## The Stack

On the client-side, we went with [KnockoutJS][ko]<sup>1</sup> and a ton of additional libraries. The trouble with the front-end world is that you essentially have to build up your own OS in the browser. Need notifications, persistence, url parsing, OAuth compatibility, or master-detail view hierarchies? Either you find one, or you build one. In our case, we built a lot. Why we chose to build out so many of our own custom libraries is a story for another time, but we do try to use existing libraries, like [Signals.js][sig], [Strophe.js][stro], and more as often as we can. But when it came to a few crucial things like Persistence and MVC structure, we went our own way.

The server-side came a lot later in the timeline<sup>2</sup>, and collectively we have far more experience with the kinds of tech involved. We took the Marco Arment strategy: use the most boring, proven software you can find. We went with [Django REST][rest], [Gunicorn][gun], [Nginx][nginx], [Postgres][post], and [Ejabberd][ej], all  inside of [Docker][docker], on [CentOS][cen], on [Linode][linode]. Nothing exciting there (except arguably Django REST) which is good.

Of course, if I could go back in time, there's a [few things I'd change about our client-side tech stack][ko], but knowing what we did back then, I think we made decent choices.

[ac]: https://adventurerscodex.com
[ko]: http://knockoutjs.com
[stro]: http://strophe.im
[sig]: https://github.com/millermedeiros/js-signals
[post]: https://www.postgresql.org
[nginx]: https://github.com/jwilder/nginx-proxy
[docker]: https://www.docker.com
[cen]: https://www.centos.org
[gun]: http://gunicorn-docs.readthedocs.io/en/stable/
[linode]: https://www.linode.com
[rest]: http://www.django-rest-framework.org
[ej]: http://ejabberd.im

- [Part 1: Behind the Curtain &#8594;](/archive/adventurers-codex-behind-the-curtain/)

<div class="footnote">
<sup>1.</sup> Don't email me. I know "Knockout is Dead". <br />
<sup>2.</sup> Until version 1.4, we could get away with hosting on GitHub pages because we had no backend. The app, including it's datastorage, was (and is at time of writing) all done in-browser. More on that in another post.
</div>
