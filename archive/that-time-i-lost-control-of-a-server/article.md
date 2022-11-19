slug: that-time-i-lost-control-of-a-server
published: Tue, 19 Apr 2022 at 12:10 AM
updated: Sat, 19 Nov 2022 07:49:35 
title: That Time I Lost Control of a Server
author: Brian Schrader
tags: software development
status: publish

Good security hygiene is essential for software developers. The thing is: we tell ourselves that, but rarely ever do we actually experience the effects of bad security hygiene. While deterrence is the point of good hygiene, it's helpful to walk through the real world consequences of bad hygiene and not just talk about the theoretical side of things.

So let's talk about the time one of my servers was hijacked.

<details open><summary>Disclaimer</summary>
<hr />
Right off the bat I need to note that the server in this story was not connected to any product or service that my company, <a href="https://skyrocket.software" title="SkyRocket Software">SkyRocket Software</a>, runs. This was a personal toy server that had no connection with anything I make or sell.
</details>

### The Story

I've run servers for lots of projects over the years. I manage servers for [Pine.blog][3], [Nine9.cloud][2], [d20.photos][4], and [Adventurer's Codex][5]. I also run several servers for client projects, this blog, and for toy projects. One of those toy projects is a server for an annual holiday Minecraft extravaganza with some friends of mine.

Once long ago, I was going through the process of setting up a new Minecraft server (this was before Linode provided easy-to-deploy Minecraft servers). I wanted to set up the server before going out that evening, and so I was in a bit of a rush. Being in a rush, I didn't bother to set up the server according to Linode's excellent guide on [Securing Your Server][6]. Instead, I just set a <del>short</del> trivially guessable root password, logged in as root, and got to installing Minecraft.

About halfway through the process I needed to leave, so I disconnected from the server and went to dinner.

When I returned home that night, I found an email in my inbox from Linode telling me that my server had been forcibly shut down because they'd determined that it was being used to send spam emails and help DDOS another site.

I had been gone only about three hours, but it had taken **less than one hour** from when my server had been instantiated to when it was compromised. It had happened shortly after I'd logged out.

Immediately I felt terrible for falling victim to such a simple, brute-force attack, and the experience has been one of those that makes me appreciate the often painful security hoops we sometimes need to jump through as developers.

### Lessons Learned

Having fallen prey to what was likely a simple brute-force attack on my root account, I promised myself that I would never again fall prey to such an attack. Now, whenever I set up a server I always set aside plenty of time to do so, use long and complex passwords, disable root logins over SSH, and follow [that Linode guide][6] I mentioned earlier. Other experiences, like those with spambots, have made me more cautious and careful about the functionality my sites expose and how they expose it (Pine.blog doesn't offer free blogging & image uploads for a reason).

<img src="/images/blog/keychain-access.png" alt="Keychain can generate long passwords easily" style="padding:0;margin:auto;" />
<caption><center><small>Keychain can generate long passwords easily, though I wish it could make even longer ones.</small></center></caption>

All in all, I count myself unlucky that I had to learn my lesson this way, but I count myself very lucky that I learned it by losing control of an unimportant and trivially replaceable server.

The internet is a very hostile place to those who aren't prepared for it. This is true on a societal level, and on a technical one. If you ever need a reminder of just how dangerous it is, try having [Fail2Ban][7] email you whenever it blocks a hostile IP address or watch your access logs for bots trying to break into your site (usually using maliciously crafted Wordpress/Drupal URLS). Things like that happen all day, every day; we just don't usually see them.

Anyway, that's the story. Hopefully everyone reading this takes it to heart so that this story remains but a cautionary tale and nothing more.

[1]: https://www.linode.com/docs/guides/set-up-and-secure/
[2]: https://nine9s.cloud
[3]: https://pine.blog
[4]: https://d20.photos
[5]: https://adventurerscodex.com
[6]: https://www.linode.com/docs/guides/set-up-and-secure/
[7]: https://www.linode.com/docs/guides/using-fail2ban-to-secure-your-server-a-tutorial/
