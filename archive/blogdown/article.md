slug: blogdown
published: Fri, 14 Aug 2015 at 09:09 PM
updated: Thu, 25 Mar 2021 at 08:51 PM
title: Blogdown
author: Brian Schrader
tags: blogging
status: publish

Everyone likes [Markdown][md], and everyone seems to have their [own
version][v] of markdown. Well, now so do I.

Blogdown is both an addition to markdown and a tool for generating html from
said markdown. As you can probably guess, blogdown is designed for blog posts.
"But wait!" I hear you scream. Isn't the original markdown for blogging? Yes.
Blogdown just adds some metadata to each blog post. Basically, it's a series of
tags that get added to the top of a markdown post.

    title: This is a title
    author: Brian
    tags: blogging, metablogging
    status: draft

    This is my blog post. I hope you like it.

There's a number of tags that are valid in "standard blogdown", they are: title, status, author, tags, published, updated, slug, and summary. Each of them add information about the post that can be used when generating the html for a given post.

This is by no means something new, but this is my version. [Lots][1] [of][2] other [people][3] do this.

[Blogdown &#8594;](https://github.com/Sonictherocketman/blogdown)

[md]: http://daringfireball.net/projects/markdown/ 
[v]: http://www.plaintextadventure.com/ref/KukkMarkdownRef.html#markdown-variants
[1]: http://www.caseyliss.com
[2]: http://www.marco.org
[3]: http://daringfireball.net
 
