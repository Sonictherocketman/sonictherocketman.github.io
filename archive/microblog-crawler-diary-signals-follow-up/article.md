slug: microblog-crawler-diary-signals-follow-up
published: Tue, 31 Mar 2015 at 10:09 PM
updated: Thu, 23 Sep 2021 at 11:17 PM
title: Microblog Crawler Diary: Signals Follow Up
author: Brian Schrader
tags: microblog crawler
status: publish

Well, saner heads have prevailed. Microblogger will not rely on sending OS signals to alert the crawler of new messages (it was a terrible idea anyway). Instead, the crawler will ping the web server on a private URL periodically to get new messages. The implementation details have not been solidified, but I do like this solution a lot more than the terrible option of sending signals. Plus, this method is scalable to additional servers. 

Thanks to [Micha][1] for the suggestion.

[1]: https://twitter.com/macromicah