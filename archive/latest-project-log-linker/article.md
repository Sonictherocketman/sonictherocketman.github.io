slug: latest-project-log-linker
published: Thu, 14 Jul 2016 at 10:17 PM
updated: Thu, 23 Sep 2021 at 11:18 PM
title: Latest Project: Log Linker  
author: Brian Schrader
status: publish
tags: python, irc, rss

Earlier this week I wrote up a simple script to strip out links in log files 
and add them to an RSS feed. Up till now I've been having it monitor a few 
IRC channels and pull out the links in real-time, but I have an idea to use 
this script as a sort of "instant link blogging" tool which I'll hopefully 
get going really soon. 

The script can parse most generic log formats, but by default it only parses
[Textual's][tx] logs. Currently the script has to be rerun to check for
changes, but that's going to be fixed (hopefully right after this post goes
up). 

Check it out. It's [hosted, as usual, on GitHub &#8594;][gh] 

[tx]: https://textualapp.com
[gh]: https://github.com/Sonictherocketman/link-feed-generator
