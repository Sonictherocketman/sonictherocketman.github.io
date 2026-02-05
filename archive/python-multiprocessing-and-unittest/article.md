slug: python-multiprocessing-and-unittest
published: Tue, 28 Apr 2015 at 01:39 AM
updated: Thu, 05 Feb 2026 21:57:41 
title: Python multiprocessing and unittest
author: Brian Schrader
tags: python, bugs
status: publish

I've been having an issue with unit testing Microblogger when my tests need to use Python's multiprocessing module. I've been looking at this code for days now and I can't seem to find the bug. I'm hoping that by writing down my thoughts here, I can think through the problem. 

Basically, the test is trying to verify that a User object can be created with information from a remote XML feed. The [test][test] gives the `User` module a URL and tells it to fetch all information at that resource.

[test]: https://github.com/Sonictherocketman/Microblogger/blob/master/test/user_test.py#L41

<code class="python"><pre>    def test_cache_user(self):
        user = User(remote_url='http://microblog.brianschrader.com/feed')
        user.cache_user()
        self.assertEqual(user._status, dl.CACHED)
        self.assertEqual(user.username, 'sonicrocketman')
 </pre></code>

The [`cache_user`][cu] method starts up a crawler to go out and parse the contents of the URL provided.

[cu]: https://github.com/Sonictherocketman/Microblogger/blob/master/feed/user.py#L84

<code class="python"><pre>    def cache_users(users):
        ...
        from crawler.crawler import OnDemandCrawler
        remote_links = [user._feed_url for user in users]
        user_dicts = OnDemandCrawler().get_user_info(remote_links)
        ...
</pre></code>

Everything is ok still. Inside that `OnDemandCrawler().get_user_info()` method, the OnDemandCrawler crawls the URL given and then calls [`self.on_finish()`][of]. This is when things get funky.

[of]: https://github.com/Sonictherocketman/Microblogger/blob/master/crawler/crawler.py#L71

<code class="python"><pre>    def on_finish(self):
        self.stop(now=True)
</pre></code>

The stop command tells the crawler to shut down, the `now` keyword just tells it to force stop the crawling process and don't wait to cleanly exit.

If we look at the source to the [microblogcrawler (v1.4.1)][1.4.1] we see that [`stop`][stop] does the following:

[stop]: https://github.com/Sonictherocketman/microblog_crawler/blob/master/microblogcrawler/crawler.py#L116

<code class="python"><pre>    def stop(self, now=False):
        ...
        if now:
            # Try to close the crawler and if it fails,
            # then ignore the error. This is a known issue
            # with Python multiprocessing.
            try:
                self._stop_crawling = True
                self._pool.close()
                self._pool.join()
            except:
                pass
        ...
</pre></code>

[1.4.1]: https://pypi.python.org/pypi/MicroblogCrawler/1.4.1

The curious part is that `self._stop_crawling = True` part. In the [tests for the microblogcrawler][mctests] both forcing the crawler to stop *and* normally stopping it work fine. The issue arises when trying to stop them in a unit test. For some reason the crawler doesn't stop. 

[mctests]: https://github.com/Sonictherocketman/microblog_crawler/tree/master/test

Here's a sample crawler and the output it produces when run as a unit test:

<code class="python"><pre>    class SomeCrawler(FeedCrawler):
        def on_start(self):
            print 'Starting up...' + str(self._stop_crawling)
        def on_finish(self):
            print 'Finishing up...' + str(self._stop_crawling)
            self.stop()
            print 'Should be done now...' + str(self._stop_crawling)
</pre></code>

<code class="python"><pre>\>\>\> python -m crawler_test
\>\>\> Starting up...False        # Correct
\>\>\> Finishing up...False       # Correct
\>\>\> Should be done now...True  # Correct
\>\>\> Starting up...False        # lolwut?
</pre></code>

For some reason the crawler isn't receiving the signal to stop. Looking at it from my Activity Monitor it appears to stop (the 4 worker threads are closed), but then the crawler creates 4 new worker threads and does it all over again. 

The last step of this process is inside the crawler itself. The [crawling process][cp] is controlled by the `self._stop_crawling` attribute:

[cp]: https://github.com/Sonictherocketman/microblog_crawler/blob/master/microblogcrawler/crawler.py#L184

<code class="python"><pre>    def _do_crawl(self):
        ...
        # Start crawling.
        while not self._stop_crawling:
            # Do work...
            ...
            self.on_finish()
</pre></code>

From this code, if the `_stop_crawling` attribute is set to `True`, then the crawler should finish the round it's on and close down, but the value of the attribute doesn't seem to be sticking when it's assigned in the `stop` method above.

If anyone has any ideas as to what the issue could be, I'd love to hear them. I'm pretty much out of ideas now. As I said before, the tests in the microblog crawler (which are not unit tests) work fine. The issue only comes up when running a test suite through `unittest` itself.

<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
