slug: microblog-crawler-v13-released
published: Sun, 08 Mar 2015 at 12:00 AM
updated: Sat, 08 Aug 2015 at 04:31 PM
title: Microblog Crawler v1.3 Released

author: Brian Schrader

tags: microblogger

status: published


I'm pleased to announce that version 1.3 of the Microblog Crawler is now available on [GitHub](https://github.com/Sonictherocketman/microblog_crawler) and [PyPi](https://pypi.python.org/pypi/MicroblogCrawler)! 



To install use:



`pip install MicroblogCrawler`.



## Release Notes



The big news: Version 1.3 is now multiprocessed!



### Among other things, version 1.3 also includes a number of fixes and improvements.



- on_item callback now includes the feed information as the second parameter. This is a breaking change in the API.

- on_info callback now receives a dictionary response of all of the info fields in a given feed. Previous versions received a name, value tuple.

- Multiprocessing now allows the crawler to process 4 feeds (or more if you override the value) at once.

- Fixed a number of bugs that allowed duplicates.

- Fixed an issue where feed crawl times may be inaccurately reported.

- Fixed the timezone problem. Feeds without timezones are parsed according to their HTTP response timezone.



### Added a bunch of 'Good Citizen' features like:



- Added crawler user agent and proper subscriber count reporting to remote servers.

- Crawler is now HTTP status code aware and static files will not be parsed if they have not been modified (HTTP 304).

- Added automatic 301 redirection behavior and MAX_REDIRECTS

- Added support for returning specific error codes from other HTTP headers.

