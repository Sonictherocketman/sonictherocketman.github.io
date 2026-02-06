slug: backblaze-hard-drive-reliability-report
published: Thu, 02 Oct 2014 at 02:41 AM
updated: Fri, 06 Feb 2026 00:10:35 
title: Backblaze Hard Drive Reliability Report
author: Brian Schrader
tags: backblaze
status: publish

Every few months [Backblaze][bb] sends out a cool report that shows the stats of various parts of their data centers. This month's report had a few interesting bits. 

[bb]: https://www.backblaze.com/

> At Backblaze we now have 34,881 drives and store over 100 petabytes of data.

The most interesting part though was about the reliability of the hard drives they use. Notably, Backblaze uses consumer drives for their data centers instead of the more "business class" drives that exist for express use in data centers. This graph was very interesting, and honestly slightly alarming, at first.

<a href='https://www.backblaze.com/blog/hard-drive-reliability-update-september-2014'><img src='https://www.backblaze.com/blog/wp-content/uploads/2014/09/blog-fail-drives-manufactureX.jpg' alt='Hard Drive Failure Rates by Model' width='560' border='0' /></a>

Below it though, they go on to say:

> Should we switch to enterprise drives?
Assuming we continue to see a failure rate of 15% on these drives, would it make sense to switch to "enterprise" drives instead?

> There are two answers to this question:

> Today on Amazon, a Seagate 3 TB "enterprise" drive costs $235 versus a Seagate 3 TB "desktop" drive costs $102. Most of the drives we get have a 3-year warranty, making failures a non-issue from a cost perspective for that period. However, even if there were no warranty, a 15% annual failure rate on the consumer "desktop" drive and a 0% failure rate on the "enterprise" drive, the breakeven would be 10 years, which is longer than we expect to even run the drives for.
> The assumption that "enterprise" drives would work better than "consumer" drives has not been true in our tests. I analyzed both of these types of drives in our system and found that their failure rates in our environment were very similar - with the "consumer" drives actually being slightly more reliable.

These findings are very interesting indeed.

[Hard Drive Reliability Update - Sep 2014 &#8594;](https://www.backblaze.com/blog/hard-drive-reliability-update-september-2014/)