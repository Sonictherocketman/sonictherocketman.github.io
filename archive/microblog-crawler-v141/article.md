slug: microblog-crawler-v141
published: Sat, 25 Apr 2015 at 10:29 PM
updated: Thu, 23 Sep 2021 at 11:18 PM
title: Microblog Crawler v1.4(.1)
author: Brian Schrader
tags: microblogcrawler, github
status: publish

Version 1.4.1 of my MicroblogCrawler is out on [PyPi][pypi]! Technically v1.4 was out last week but it had a fairly large bug that needed fixing. 1.4.1 has patched it and it's ready for prime time.

[pypi]: https://pypi.python.org/pypi/MicroblogCrawler/1.4.1

v1.4.1 is full of enhancements, a few of which are listed here:

- Calling stop now actually stops the crawler. This bug was due to a nasty bug in Python's multiprocessing module (9400). The crawler now alerts you when such a problem arises by outputting it through the on_error callback.
- Fixed a bug that would cause feeds to throw errors if no `pubdate` element was found. Elements are not parsed but are discarded, and on_error is called.
- Fixed a major bug when attempting to stop the crawler immediately.

[The full version notes are available here.][vnotes]

The major enhancement in this version (besides the graceful exiting) was the addition of a workaround for a [bug in Python's multiprocessing module][bug]. The bug has to do with what happens to exceptions raised in child processes. When they are raised, they are pickled and sent back to the parent process. The problem arises when an exception is not pickleable. The child process hangs and never exits. The interesting thing is that the bug was first reported in 2010 and affects all versions of Python since 2010 (i.e. 2.7, 3.2, 3.3, 3.4). This bug has been baffling me since I started converting the crawler to be multiprocessed, and its nice to finally have a workaround. 

[bug]: http://bugs.python.org/issue9400
[vnotes]: https://github.com/Sonictherocketman/microblog_crawler

If anyone out there is using MicroblogCrawler, I'd love to hear from you, and pull requests are very welcome!