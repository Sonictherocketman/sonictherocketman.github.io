slug: accidental-devops
published: Tue, 26 Sep 2017 at 12:30 PM
updated: Thu, 25 Mar 2021 at 08:51 PM
title: Accidental DevOps
author: Brian Schrader
tags: devops, development
status: publish

Since I became a developer, I've always worked on small (3-5) or single-person teams. Even at my current job, I'm the the lead and only full-time developer. In more recent projects (including [Adventurer's Codex][ac]) this means that I'm the DevOps guy and System Admin as well. I'm by no means an expert in either, but I can do both.

I started learning how to manage and administer servers when I started this site back in 2012. Back then I never thought that all of those hours spent configuring Apache and PHP would lead to anything, but those countless hours of frustration taught me the basics. Fast-forward 5 years and I'm developing three major projects (two unannounced) and I'm DevOps and SysAdmin for all three. It's crazy to think about.

I'd highly recommend any new developers to follow the same general path I did: start a project or blog and learn to deploy it yourself. I started with a cheap old-style webhost and FTP, and slowly moved to managing the whole stack on Linode. I'm using Docker on new projects, and for now, I'm scripting my own deploys (though this could change soon if I migrate one project to Ansible).

As developers it's sometimes easy to forget that we write software that actually runs on some actual hardware in some actual datacenter somewhere. Knowing how to do many of the things that DevOps and SysAdmins do will not only make you a better developer, it gives you the ability to do more on your own. You often don't need tons of layers of software to deploy yours if you know how to do it from the ground up (especially if it's a smaller project). Those tools make it easier sure, but they're not required.

[ac]: https://adventurerscodex.com
