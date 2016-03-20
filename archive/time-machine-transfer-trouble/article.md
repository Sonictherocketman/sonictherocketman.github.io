slug: time-machine-transfer-trouble
published: Wed, 31 Dec 2014 at 03:36 AM
updated: Sat, 19 Mar 2016 at 08:41 PM
title: Time Machine Transfer Trouble
author: Brian Schrader
tags: time machine, backups
status: publish

A week ago, I purchased a new 3TB drive and a USB 3.0 enclosure with the intent to transfer my Time Machine backup off of the 1.5TB drive it currently inhabits. 

After almost a week and about 6 different approaches, I still haven't been able to copy the entire set of backups. According to Apple, dragging the folder over to the new drive in the Finder should work, but about 100GB into the transfer it throws up an error, "Presentation could not be opened," and quits. After some investigation, I discovered that "Presentation" is the name of an old Keynote file I have backed up. I have no idea why the Finder needs to open that presentation, but apparently it does.

Last night I tried sudoing a cp. About 20 mins in, cp got stuck and even after letting it go all night, it never got unstuck. Tonight I'm trying again, this time with rsync, after a suggestion from Stack Overflow. If this doesn't work, I don't know what else to try.