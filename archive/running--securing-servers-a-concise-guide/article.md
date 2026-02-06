slug: running--securing-servers-a-concise-guide
published: Mon, 21 Oct 2024 at 05:47 PM
updated: Fri, 06 Feb 2026 00:29:28 
title: Running & Securing Servers: A Concise Guide
author: Brian Schrader
tags: software, programming
status: publish

It might be pretty out-of-vogue to host your own servers in 2024, but I still do it and I quite like it. There's a lot of great benefits to building software on basic infrastructure and I always find myself appreciating the flexibility that simple VPS hosting brings. That said, you do need to be careful. Life as a developer on the Internet requires a pretty decent familiarity with security best-practices.

Being self-hosted, there's also a lot of simple design decisions that you need to make when running a system on simple VPSs, and there's really not a lot of good info out there to help with this.

So, here's a simple guide to some of the things I do when setting up my servers.

<span style="padding: 0.5rem; border: 1px solid gray; border-radius: 3px;" class="image-center ">
This post isn't sponsored by Linode. It's just what I know best.
</span>

**1. Follow [Linode/Akamai's Great Guide][1] for Securing Your Server.**

Always set up ssh key forwarding and use it. That said, I usually end up leaving Password Authentication Enabled, since I've had problems remoting in from a known machine (i.e. my laptop isn't available). In these cases I use a very strong password (Apple's Keychain app will make up to 31 character random passwords) and synced with iCloud so it's on my phone.

**2. Set Up a Cloud Firewall**

These days, I prefer using the cloud firewalls provided by the platform (here's a [guide for setting this up on Linode][6]). I still do set up simple on-device firewalls on the server itself, but I depend more on the cloud firewall since it's easier to configure.

**3. Configure Basic Maintenance Cronjobs**

These days, I usually set up a few basic cron jobs to monitor things and keep things running. Here's a list of my typical cron jobs. This list will vary a bit depending on what kind of server you're setting up.

- Postgres nightly/weekly vacuum.
- Disk Usage & Avg CPU Usage monitoring using [Nine9s Measures][4]
- Nightly DB Backup & Archive (if needed, see 4)
- Nightly [Log Trimming][2] (keep 30 days)
- Automatic Deploys (see 5)

As an aside here, I use [Pushover][7] in a lot of my shell scripts. I send a quick API call to the service which forwards Push Notifications to my phone. That way I get notified of things like build failures which normally fail silently.

**4. Set Up Automated Backups**

If your platform supports it, just use the automated backups for your servers. It's so easy and well worth a few extra bucks per month. If you're not in the position to use those (e.g. Linode when wont't back up encrypted partitions), then make sure you have a cron job that backs up your database. I use simple `pgdump | gzip` commands in those cases.

If you do the backups yourself, be sure to test *restoring from your backups as well!*

**5. Apps go in Containers**

I use Docker, but any container system works. I've been told this setup isn't "how Docker is intended to be used", but that's fine with me. It works. I deploy my apps to my servers using a build script that usually runs automatically. It uses the production git repo for my docker compose files and runs a simple `docker compose up` with the configuration for production. I even have it set up to boot a backup copy of the current app while it deploys the new one so I get zero-downtime deployments.

It's probably overkill to do this, but it works well and avoids the possibility of corrupting code files on the host machine. The automatic deploy (which I frequently do nightly) is awesome because it means I never have to think about which changes have made it to production. If it's in `main` it's in prod.

I also run my databases (which is almost always Postgres) in a container as well, only because it makes minor upgrades easier.

**6. Run Webservers on the Host**

Above, I told you that I use Docker. However these days I always run the webserver (nginx in my case, though Caddy is also very nice) directly on the host. Nginx then proxy-passes to my my containers using the [loopback address][8]. That way nothing is exposed (Docker likes to punch holes in firewalls). Running nginx on the host let's `certbot` work as expected.

**7. Set Up Break-Glass Measures**

The single most popular post on this blog is about my (in)famous [8GB Empty File][3] break-glass measure. I don't always do this anymore, but it has saved me a bunch of times. To me, SSH password auth is a kind of break-glass fallback too.

### What Else?

That's all I can think of at the moment. It's a lot, but it's also not too bad. You don't need to be scared of hosting things yourself, but you do need to be careful. It's a wild world out there on the internet.

As a final note, if you're looking to get a handle on web architecture stuff, I recommend this [blog post][9] for a quick rundown on that. Practical Web Architecture is difficult to learn in my experience, and it takes a lot of pondering, trial, and error to do it right. Most resources are intended for enterprise-scale deployments and not smaller projects. In general, don't over-complicate things if you don't need to. One of the best parts about hosting your own apps this way is that you have the flexibility to change things around as you grow (at the cost of some work and likely some downtime).

I've been doing this for a while now, but I'm sure there's something I've missed. This guide is certainly not extensive, but it should at least help you avoid some major headaches. I can say that from experience.


[1]: https://techdocs.akamai.com/cloud-computing/docs/set-up-and-secure-a-compute-instance
[2]: https://unix.stackexchange.com/questions/139513/how-to-clear-journalctl#194058
[3]: https://brianschrader.com/archive/why-all-my-servers-have-an-8gb-empty-file/
[4]: https://nine9s.cloud/kb/measure-quickstart
[5]: https://www.linode.com
[6]: https://techdocs.akamai.com/cloud-computing/docs/getting-started-with-cloud-firewalls
[7]: https://pushover.net
[8]: https://stackoverflow.com/a/20778887
[9]: https://marco.org/2014/03/27/web-hosting-for-app-developers
