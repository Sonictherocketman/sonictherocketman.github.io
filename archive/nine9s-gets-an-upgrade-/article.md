slug: nine9s-gets-an-upgrade-
published: Mon, 06 Dec 2021 at 06:28 PM
updated: Tue, 09 Dec 2025 22:38:20 
title: Nine9s gets an upgrade ⬆️
author: Brian Schrader
tags: software development, apps
status: publish

I'm super excited to announce a new suite of features for [Nine9s: my uptime monitoring service][3]. Now, I don't want to exaggerate too much, but I honestly thing that as of today, Nine9s is one of the most powerful uptime monitoring services out there; if you haven't already, you should try it out.


## Monitor Anything

Uptime monitoring, in most cases is a pretty simple task: if you have a web service, then Nine9s makes a request to it, and verifies that it returns a successful HTTP status code. Most services stop there, or they expand on the idea and allow for checks to be more complex (e.g. verifying that elements exist on the page or that users can log in).

The problem with this approach is that lots of services exist on the web, but do things other than simply serve web content. You could have a service that sends emails or that runs batch jobs. These services can't be monitored using simple HTTP requests. Even still, sometimes you don't want your services to be publicly accessable, in which case uptime monitoring services can't reach out to them at all.

That's where Nine9s steps in to fill the gap! As of today, servers can now periodically ping Nine9s to report that they're still up and running. Nine9s will watch out for these reports and let the user know if the service doesn't report in within a given amount of time.

Better still, Nine9s can evaluate the data sent by the server and compare it against some criteria. Imagine you have your server report its current disk usage to Nine9s. If the disk ever fills up past say 95%, then Nine9s will alert you immediately.

![Example Criteria on Nine9s](/images/blog/nine9s-criteria.png)

When you set up a new Measure&mdash;which is what Nine9s calls these new features&mdash;Nine9s will generate a couple of sample cron jobs you can quickly add to your servers to get started! There's even a [quickstart guide][1] to writing additional jobs!

![Sample Cron Scripts](https://nine9s.cloud/static/kb/cron.png)

Once you understand the power of these new Measures, you'll be able to monitor nearly anything your servers are doing and make sure they're performing as expected.


## Nine9s is macOS Native!

This release also marks the launch of the [official Nine9s app for macOS!][2] It's my first ever public macOS app and I'm super excited to get it out there into the world. The app shares all of its code with the iOS and iPad versions  and is built on Catalyst, so it should feel *mostly* native.

The app has all of the features you'd imagine: the ability to monitor your Endpoints and Measures, support for push notifications, and more.

The app is also my first ever native app released outside of the App Store!

I've been working on this update for a few months now and I'm stoked to get it into the hands of all you out there! If you do end up downloading the app, let me know especially if you have feature recommendations! I'd also love to know how you all are using Measures in the wild.

[1]: https://nine9s.cloud/kb/measurement-snippets
[2]: https://nine9s.cloud/#app
[3]: https://nine9s.cloud/
