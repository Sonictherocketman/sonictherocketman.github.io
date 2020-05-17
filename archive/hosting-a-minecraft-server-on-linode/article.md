slug: hosting-a-minecraft-server-on-linode
published: Tue, 01 Mar 2016 at 10:11 AM
updated: Sun, 17 May 2020 at 06:41 AM
title: Hosting a Minecraft Server on Linode
author: Brian Schrader
tags: minecraft, linode
status: publish

The planets have aligned again, and I've returned to Minecraft. Every once and a while I get the urge to call up some friends, spin up a server, and spend a few hours a week building crazy things and fighting for survival in a blocky world. Usually, I host the server on my laptop, but this time I wanted to try something different (read: more complicated). I'm a developer, and I have the power of the cloud at my fingertips, so why not spin up a Linode instance and host the server there?

<img alt="A tower on the hill" class="image-right" style="padding-left:5px;"
    src="http://brianschrader.com/images/blog/mc-tower.jpg">

The first night, I made the terrible mistake of trying to use my existing Linode instance to host the server. A paltry 1 core, 1GB memory machine can run a nice static website, but it's terrible at running a gaming server. If you want the server to constantly crash, and run out of memory, then that's the method you should try

If you actually want to play the game, I recommend using Linode's 4 core, 4GB memory instances. Unless you plan on having tens of people on the server at once, its going to be more that enough. The best part is that those instances are $0.06/hr. Last night I played with a friend for 4 hours, and it cost me a whole 24¢.

I've written a little [shell script][sh] to do the installation automatically, and even sign the EULA. So now, whenever I want to play with some friends, I can click a whole three buttons in Linode's admin panel, SSH into the server, run my script and start playing. Then when we're done I can copy the world onto my Mac via FTP, and shut down the instance. Super simple, cheap, and fast.

The cloud is pretty awesome sometimes.

[sh]: https://gist.github.com/Sonictherocketman/221c6fad8ea76657d2b2
