slug: lots-of-little-things
published: Sat, 29 Jun 2019 at 04:02 AM
updated: Thu, 05 Feb 2026 23:53:22 
title: Lots of Little Things
author: Brian Schrader
tags: pine.blog, update
status: publish

Recently I've been focused on finishing the next set of major features for [Pine.blog][pb], but as happens from time-to-time I got a bit distracted and ended up knocking out a whole lot of little features that I've wanted to build for a long time. Today's update was entirely server-side, and I'll have a new update for the iOS app coming in a few days.

### Wordpress Enhancements

In addition to making a lot of things just plain faster, I've also added a new [feature for Wordpress users][wp] so that when users post on their blog, Wordpress will automatically let Pine.blog know and their posts show up much more quickly in their (and other user's) timelines.

For me, this feature involved yet another foray into undocumented XML-RPC APIs from over a decade ago. So much of the information just isn't easy to find anymore so building features that use them is more archeology than software development.

### API Keys and Webhooks

Users that want to write scripts using Pine.blog (or build custom applications) can now get an API key quickly and easily that lets you access the full range of Pine.blog APIs.

For those who want to dive even deeper into their data with Pine.blog, users can now add a Webhook URL if they'd like to receive updates from Pine.blog whenever a feed they're subscribed to changes.


### API Documentation Revamp

I've completely redone the Pine.blog API documentation. Hopefully this makes it much easier for developers to discover and use the Pine.blog/Feed Directory API. The new documentation includes much more detailed information about the throttling limits, what to expect from each endpoint, and much much more. If you're looking to use the Pine.blog/Feed Directory API in your app or service [you can find out more from the documentation here][docs].

A lot of these developer-focused features are test runs for much broader features that I have cooking in the background. Meanwhile I'm trying to keep the majority of what I do with Pine.blog a lot more user-focused.

[pb]: https://pine.blog/
[docs]: https://pine.blog/api/documentation
[wp]: https://pine.blog/kb/add_external_blog
