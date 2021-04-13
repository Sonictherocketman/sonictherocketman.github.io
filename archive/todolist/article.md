slug: todolist
published: Thu, 28 Sep 2017 at 02:28 PM
updated: Wed, 07 Apr 2021 at 06:00 AM
title: todolist
author: Brian Schrader
tags: code, bash, tools, programming
status: publish


I've [talked before][prev] about how I use `TODO` comments in my code to lay out what I want to do before actually doing it. To help me keep track of all of these TODOs in my code I wrote a [little script yesterday][gist] and I've put it on Github for anyone who's interested.

The script looks through all of the code (by default Python code) in a given destination directory, greps for the `TODO` comments, and prints them nicely in a constantly updated list in the terminal. The output looks like this:


![Todolist Terminal Window](/images/blog/todolist-terminal.png)

Writing this script I learned a couple of new things about terminal commands like how to clear the screen without deleting the scrollback or just printing newlines (i.e. what `clear` does). I've put the script in my `/usr/local/bin` and called it `todolist` so now I can invoke it from anywhere and get a nice little list of what I've put off working on.

[todolist on Github &#8594;][gist]

[prev]: /archive/todos-as-a-templating-system/
[gist]: https://gist.github.com/Sonictherocketman/77dd6cd8fd907dbbc00031acb08f3ba0
