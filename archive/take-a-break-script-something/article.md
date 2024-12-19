slug: take-a-break-script-something
published: Mon, 03 Jan 2022 at 04:58 AM
updated: Thu, 19 Dec 2024 20:03:55 
title: Take a Break, Script Something
author: Brian Schrader
tags: software development, programming
status: publish

Lately I've been putting in a fair amount of work improving Adventurer's Codex, and we have some very exciting updates coming soon (no spoilers 🤫). A lot of the changes required modifying our existing single-page app or API backend, but one involved the creation of a totally new repository and a new set of public-facing pages. It's those pages that I want to talk about.

The problem was fairly simple: given a set of data that changes very infrequently, create a set of web pages that display the details of each record in the dataset. Simple right?

Now, there's two ways I could have built out this functionality:

1. Dynamic pages that serve the content using templates served by Django
2. Static pages built once and served by Nginx

<details>
  <summary>Additional Context</summary>
  <p>I wanted this functionality to be separate from our main project, so the first solution would involve setting up a new Django app and database as well as building a system to import the data from JSON files.</p>
</details>

I elected to do the second solution because of it's simplicity and because the data changes so rarely. When all was said and done, I had three scripts &mdash; two bash scripts, and one Python script &mdash; and a set of [Jinja templates][1]. Running the main build script would download the dataset if it didn't already exist, parse the data, and build the pages. The whole process takes about 10 seconds to download and generate over 1200 pages. After it was done, I even set up a Docker container to build and serve the pages with Nginx. In total the project is 295 lines of code (1k if you include the HTML templates), and basically never needs to be updated again; if the data does ever change, we could simply re-run the script or rebuild the contaner.


## Scripting is a Much-Needed Break

This is one thing I love about scripting as opposed to application development. In app development, you construct a codebase and then you need to live with it long term, adding new functionality and deprecating old functionality. Scripts, on the other hand, are low risk, high reward: you write them once to solve a specific problem and then rarely touch them again. I use a lot of simple scripts on a daily basis, some of which I wrote nearly a decade ago and haven't touched since.

Scripts are programming candy whereas app development is the real meat and potatoes. In a script you can take shortcuts, be a bit messy, and forgo worrying about the complexities of large software. Once the script works, there's not much else to do: just ship it.

Whenever I get the chance to take a break from developing large apps and just do some quick scripting, I leap at the opportunity.


[1]: https://jinja.palletsprojects.com/en/3.0.x/
