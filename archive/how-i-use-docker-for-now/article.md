slug: how-i-use-docker-for-now
published: Fri, 30 Apr 2021 at 01:05 AM
updated: Thu, 23 Sep 2021 at 11:17 PM
title: How I Use Docker (for Now)
author: Brian Schrader
tags: software development
status: publish

In a recent episode of [Indie Dev Life][1] I went into some detail about how I use [Docker][0] to host my software. I discussed my experiences with and guidelines for using Docker in production. This post is a continuation of that discussion.

I've been using Docker to run my software in production ever since the launch of [Adventurer's Codex][3], and [MyGeneRank][2] back in 2017. In my technical discussion [blog post][4] for [both projects][5], I talked a little bit about Docker and its place in the stack. I also discuss Docker and its role as a deployment tool briefly in [Going Indie][6].

> Over the years I’ve managed to tune my services to be incredibly easy to upgrade. For example, since Nine9s is written in Python and uses Docker, a deploy is simply a `git pull` and `docker-compose up`. Nowadays, even those steps are automated by a bash script. Having such a simple process means that I can deploy quickly, and it lessens the cognitive burden associated with upgrading a service, even when that service has gone without changes for months.

Over time, Docker's role in my software has morphed and evolved. During the initial launch of Adventurer's Codex, I depended heavily on community-built Docker files for large portions of the architecture. But over time Docker has actually shrunk to fill a much more limited role.


## The Problem Docker Solves (for Me)

<details>
  <summary>Context</summary>
  <p>I use <a href="http://linode.com" title="Linode">Linode</a> for my server hosting, so I'm already operating within a VM, and depending on the software, I might have multiple virtual servers powering a given service. Docker simply provides isolation for processes on the same VM. I do not use Docker Swarm, and I've always just used the community edition of Docker.</p>
</details>

To me, Docker has become a tool that makes it easy to upgrade and manage my own code and other supporting services. All of my code runs in a Docker container, but so do other systems that my code depends on. For example, Pine.blog and Nine9s both use memcache for [template caching][8] since support for it is built into Django&mdash;my preferred web framework. Each web server runs Nginx on the host which reverse-proxies to Docker containers running my Django apps.

Both services also perform asynchronous processing via worker nodes. These workers are running inside of Docker. Pine.blog's workers are spread across various machines and pass requests through their own [custom forward caching proxy][9] containers backed by a shared Redis instance also in Docker.

This setup ensures that I can easily upgrade my own code, and it ensures that exploitable services like memcache aren't exposed to the outside world.

In short, I've found that Docker works great for parts of the stack that are either upgraded frequently or for parts of the stack that are largely extraneous and that only need to communicate with other parts on the same machine.

I've largely stopped using Docker in cases where there are external tools that rely on things being installed on the host machine, or where the software requires more nuanced control. Nginx is a great example. All of my new projects have Nginx installed on the host, not in Docker. This is because so many tools from log monitoring to certbot are designed to run on a version of Nginx installed globally. I use Nginx as both a webserver for static content and a reverse-proxy to my Django apps. If you want to use Nginx in Docker, I'd suggest only using it for the former case. The latter is better installed on the host.

I'm still torn about running my databases and task brokers in Docker. Docker (without Swarm) really annoys me when I'm configuring services that need to be accessed by outside actors. Docker punches through CentOS firewalls which renders most of my typical tactics for securing things moot. I've also started to question the usefulness of Docker when I'm configuring a machine that serves only one purpose. Docker is great at isolating multiple pieces of a stack from each other, but on a single-purpose VM it seems like it's just another useless layer that's only there for consistency.

Docker on CentOS is particularly irritating as the `devicemapper` doesn't seem to release disk space that it no longer needs. This means that your server is slowly loosing useful disk space every time you update and rebuild your containers. After about 3 years of upgrades, Pine.blog's main server has lost about 20GB of storage to this bug. Needless to say, I'm investigating a move to Ubuntu in the near future.


## What about Docker in Development?

As with Docker in production, I have mixed feelings about the role Docker plays in my development. I dev on a Macbook Pro, and my Django apps run in a plain-old virtual environment. No Docker there. That said, I do use Docker to run extraneous services&mdash;like Redis, memcache, or that forward caching proxy.

I stopped running my Django apps in Docker a while back for much the same reason that I no longer run Nginx in Docker. Even with Docker's recommended fixes, Django's management CLI is frustrating to use through Docker and I've had more than one issue with Docker's buffering of log output during development.


## Docker: Four Years In

Overall, I really like Docker. It makes deployments super simple: just `git pull` and `docker-compose up` (or use my fancy shell script that does zero-downtime deploys). That said, I'm certainly not a Docker purist. I use Docker in a way that reduces the friction of my deploys, and I'm starting to use it less and less when it's just another layer that serves little purpose.

Like every tool, Docker has it's role to play, but in my experience it's not the silver bullet that many people think. I haven't used Docker on AWS via ECS, so I can't comment on that. Perhaps that's where Docker really shines. I still prefer a more traditional hosting strategy. Either way, Docker will remain an important tool in my toolbelt for the foreseeable future.

[0]: https://www.docker.com
[1]: https://indiedevlife.fm/archive/13-im-starting-to-regret-promising-things/
[2]: https://mygenerank.scripps.edu
[3]: https://adventurerscodex.com
[4]: /archive/adventurers-codex-the-stack/
[5]: /archive/mygenerank-behind-the-scenes-of-the-newest-researchkit-app/
[6]: https://goingindie.tech
[7]: http://linode.com
[8]: https://docs.djangoproject.com/en/3.2/topics/cache/
[9]: https://github.com/Sonictherocketman/johnny-cache
