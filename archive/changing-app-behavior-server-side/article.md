title: Changing App Behavior Server-Side

author: Brian Schrader

tags: iOS development

status: published


We've all been there: you ship your app, it passes Apple's App Review, then it's in the Store... and *then* you find a bug. A small bug, but one you should fix ASAP. Whether it's some issue with download behavior, the color of some box, the font somewhere is too small, or your French localization of some text is overflowing some button (like what [Daniel Jalkut][jalkut] talked about on [Core Intuition][coreint] this week), either way, it's a pain. You fix the problem locally, and submit a new build, but Apple still takes a week to review it. Meanwhile your users are having to deal with a bug that you've already solved. It's a common, frustrating and often a sales affecting problem.



[jalkut]: http://www.red-sweater.com

[coreint]: http://www.coreint.org



On a [recent episode of ATP][atp], [Marco][marco] mentioned that he could change quite a few features of the app from the server-side. Combine this with [Brent Simmons'][brett] way of building [Vesper][vesper] (i.e. using plists to configure colors, fonts, item sizes, etc) and it seems to me that it should be entirely possible to make iOS apps that are mostly configurable from the server-side. This got me thinking. Why not build the app to download it's configuration file (i.e. plist, or Localization.strings file) remotely? Sure it's not as convenient as Apple's built in frameworks sometimes, but it would allow developers to fix features, colors, themes, and localization issues all remotely, and instantly.



[atp]: http://atp.fm/episodes/74

[marco]: http://www.marco.org

[vesper]: http://vesperapp.co

[brett]: http://inessential.com



I haven't looked into the technical issues with this, and there is an argument to be made that not all iOS devs want to run a server just to host their .strings files, but if you're already running a server for some other functionality in your app, it's basically cost free and avoids quite a few small but irritating problems.



My motto: If it can be on the server, it should be on the server. The client doesn't need to worry about it, it just needs to display it.
