slug: more-secure-pastures
published: Wed, 27 Jan 2016 at 09:13 PM
updated: Mon, 22 Feb 2016 at 05:26 PM
title: More Secure Pastures
author: Brian Schrader
tags: encryption, https
status: publish

Well, I finally did it; I finally upgraded this site to use https. I've wanted to do this for a while, and I know that I should have done it years ago, but the thought of having to upgrade Apache, even after all these years, still puts a chill down my spine. Regardless, this site is now certified by [Let's Encrypt][le], and my thanks to them for making free SSL certificates a possibility. 

I encountered a few troubles while upgrading, and I hope no one noticed, but for anyone looking to do the same thing, here's a few links that helped me through the process:


- [Configuring Let's Encrypt w/ Apache 2.4 on CentOS 6 &#8594;][httpd]
- [Redirecting HTTP to HTTPS &#8594;][redir]

[httpd]: https://community.letsencrypt.org/t/a-tutorial-to-start-with-centos-6-5/3755/7
[redir]: https://wiki.apache.org/httpd/RedirectSSL#Using_virtual_hosts_.28using_redirect.29
[le]: https://letsencrypt.org
