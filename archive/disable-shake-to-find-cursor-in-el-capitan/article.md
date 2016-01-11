slug: disable-shake-to-find-cursor-in-el-capitan
published: Mon, 12 Oct 2015 at 11:35 AM
updated: Mon, 11 Jan 2016 at 11:10 AM
title: Disable "shake to find cursor" in El Capitan
author: Brian Schrader
tags: mac
status: publish

I've been using Mac OX 10.10 El Capitan for a few days now, and it's been
fairly solid for me. I've encountered some minor bugs, but overall it's a solid
point-oh release.

One new feature that I'm not too fond of, however, is the new "shake to find your
cursor" thing. I really don't know why it bugs me, but it does. So I went
looking for a way to disable it.

The solution is pretty simple. Run the following command in Terminal, and
reboot your machine. 

    defaults write ~/Library/Preferences/.GlobalPreferences CGDisableCursorLocationMagnification -bool YES

[Original Post &#8594;](http://forums.macrumors.com/threads/disabling-shake-to-find-cursor.1892341/)
