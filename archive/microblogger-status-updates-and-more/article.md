slug: microblogger-status-updates-and-more
published: Sat, 13 Dec 2014 at 07:16 AM
updated: Tue, 08 Oct 2019 at 01:37 AM
title: Microblogger status updates and more
author: Brian Schrader
status: publish

Over the last few weeks I've been working on the first implementation of Microblogger (new name desired): a self hosted microblog implementing the [Open Microblog standard][1]. Work has been slower than I'd like, but steady nonetheless. The [microblogcrawler][2] I announced a couple weeks back, was just one of many pieces of the project, and one that could easily be spin off into its own little sub-project.

[1]: http://openmicroblog.com
[2]: http://github.com/Sonictherocketman/microblog_crawler

Yessir, all was going well: basic crawling is almost in place, and almost everything regarding the user's data and profile is good to go. I was working on adding another crawler to the mix (for on demand requests) and flushing out the caching engine last time I touched the project, trouble is that was over a week ago. Since then all progress has stopped. 

Due to a colony of microbes wreaking havoc on my immune system, I've been out of commission all week. With a busy weekend ahead of me, I'm holding out hope that I'll be able to get something done, but it probably won't be much. Either way, next week, I'm diving back in. 

I won't promise anything, but my tentative release date is the end of the month. That said, there's still a lot to do. As of now my remaining tasks for version 1.0 are:

- Fix bugs in the posting system.
- Create another (more dynamic) crawler that can be spun up on demand to fulfill user requests.
- Make the website actually good.
- Implement messaging (public only for version 1.0)
- Complete and test the caching engine.
- Finish making tests for everything.

These come in no particular order, and as you can see, some of them are pretty big. I've also documented most of these items in the [Issues section][is] of the project's [GitHub page][gh] for further reference.

[gh]: https://github.com/Sonictherocketman/Microblogger
[is]: https://github.com/Sonictherocketman/Microblogger/issues

All this being said, I'm looking for great people to help keep the project on schedule and later improve the design. In particular, I'm looking for someone interested in building the front-end. If that sounds interesting to you, [let me know][4]! I'm open to using whatever technology you'd like (Angular/Ember, Bootstrap, etc). 

[3]: http://brianschrader.com/about/
[4]: http://brianschrader.com/about/

Have a good weekend everyone! I'll be back to work on the project ASAP. See you then!