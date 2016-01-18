slug: a-full-size-mirror
published: Sun, 20 Sep 2015 at 05:28 PM
updated: Mon, 18 Jan 2016 at 12:55 PM
title: A full size mirror
author: Brian Schrader
tags: open web, mirror
status: publish 

Well [it is done][1]. A fully functioning [mirror][2] of this site is available
over at *mirror.brianschrader.com*, and it's hosted by GitHub Pages, so it's
really fast.

[1]: http://brianschrader.com/archive/a-mirror-for-posterity/
[2]: http://mirror.brianschrader.com

Getting the mirror going was simple, because as I mentioned I alredy use Git 
for managing this site. Simply adding a new destination to publish to:

    git add remote mirror <url>

and adding that destination to my deployment script was all I needed to do.
Yay Git! 

Thanks [Manton for the awesome suggestion][3]. It's important that we, as a
community, try to persist our work. The web right now is ephemeral, so
individuals need to take the steps make sure their work is preserved.

[3]: http://www.manton.org/2015/09/complete-mirror-of-this-blog.html
