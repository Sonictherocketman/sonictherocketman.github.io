slug: todolist-update
published: Tue, 10 Oct 2017 at 03:35 PM
updated: Thu, 05 Feb 2026 21:57:40 
title: todolist update
author: Brian Schrader
tags: development, bash
status: publish

Over the last week, I've made some changes to [my todolist script][todolist]: I've cleaned up the printing a bit and removed the temp file.

![todolist terminal output](/images/blog/todolist-update.png)

I had to remove the temp file because it was actually causing performance problems with BBEdit. Since the temp file came into and out of existence every few seconds, BBEdit's project view would dutifully redraw the project file list twice in quick succession, wasting quite a bit of CPU power<sup>1</sup>, and sometimes causing my MacBook's fan to spin up. Now that the temp file is gone, that problem is too.


<div class="footnote">
<sup>1. </sup>I'm not sure why BBEdit needs so much power to redraw the project list and I've reached out to their support. Hopefully they can resolve the issue. At the very least my script is a little more well behaved so it's no longer an issue.
</div>

[todolist &#8594;][todolist]


[todolist]: //gist.github.com/Sonictherocketman/77dd6cd8fd907dbbc00031acb08f3ba0
