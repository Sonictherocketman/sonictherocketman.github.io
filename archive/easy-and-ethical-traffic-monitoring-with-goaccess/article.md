slug: easy-and-ethical-traffic-monitoring-with-goaccess
published: Mon, 03 May 2021 at 06:08 PM
updated: Thu, 19 Dec 2024 20:03:55 
title: Easy and Ethical Traffic Monitoring with GoAccess
author: Brian Schrader
tags: software development, blogging
status: publish


Traffic monitoring is a staple for web businesses, but for some reason, we've outsourced a pretty simple problem to mischievous third-parties. While there are well-behaved traffic monitoring platforms, I've developed a few homegrown solutions that have worked really well for me and my business. If you're looking for an easy traffic monitoring solution, and you're conscious of your user's/visitor's privacy, you should try one of these solutions. I promise, they're pretty simple.


## Option 1: Just Don't

You always have the option to just not do traffic monitoring. Often times we can convince ourselves that data we collect is precious or useful when it fulfills no real business or personal need.

If you're a blogger, then traffic might matter to you, but [it probably shouldn't][7]. Back when [I used to use Google Analytics][1] I also had very few visitors to this site. Was it useful to know that 13 people had seen my article? Not really, but it felt useful. In the end it was just another stat for me to endlessly refresh. Progress bars are fun to watch, but you'd probably be better off writing another post, or just going for a walk.

If you own a business that sells a product, then remember this: it's not actually relevant how many hits your website gets. It's important how many products you sell. At one point, [Going Indie][2] was featured on Product Hunt, which was awesome, but that featuring resulted in very few actual sales. Was it worth my time to endlessly refresh the PH dashboard? No, and I kinda wish I didn't have the option.

Real-time dashboards are addictive dopamine factories. Sometimes it's better to just avoid them.


## Option 2: Use GoAccess

If you need to have some sort of traffic monitoring, then give [GoAccess][3] a try. GoAccess aggregates webserver access logs and provides reports either live in the shell, or as really elegant and self-contained HTML files.

I've used GoAccess for years, and it's become my default solution for traffic monitoring. I've automated my reporting using my [new helper RPi][4]. Every week, the RPi generates and aggregates the reports for my various websites and emails them to me.

[![Sample GoAccess Report](/images/blog/goaccess.png)](https://rt.goaccess.io/?20210429113731&ref=hpimg)
<center><small><caption>A sample GoAccess HTML report</small></center></caption>

There are downsides to GoAccess though. Since it's using access logs, the numbers are inflated by bots and browser prefetching. GoAccess has ways to filter out some of those things, but in most cases, I've just gotten used to the numbers being bigger than they really should be.

One upside to using server-side traffic monitoring is that your stats are unaffected by people who are using ad-blockers or who refuse to enable JavaScript (are there still people doing that?)


## Option 3: Roll Your Own

For some projects, I've needed more reliable and accurate traffic stats. To do that, I decided it would be best to roll my own. As I said earlier, traffic monitoring is a pretty simple problem-domain&mdash;as long as you're willing to live with some margins of error. My [California policy blog][6] uses a homegrown traffic monitoring solution that is so maddeningly simple, I will include it below in its entirety&mdash;formatted for readability.

    (function() {
        if (window.fetch) setTimeout(function() {
            fetch('/pageview?u=' + window.location.pathname)
        }, 2000)
    })()

This snippet sets a timer for two seconds and then fires a request off to `/pageview` which simply returns a 200 response. The site is statically generated&mdash;just like this one&mdash;so it can't do any processing or custom request handling, and there's an empty file called pageview in the webroot directory. I join all of my access logs together, remove anything that doesn't contain a request to `/pageview` and voila!

    zcat /var/log/nginx/access*gz | grep pageview > $STATSFILE;
    cat /var/log/nginx/access.log | grep pageview >> $STATSFILE;

    /usr/local/bin/goaccess \
        -f $STATSFILE \
        --ignore-crawlers \
        -p /etc/goaccess.conf \
        > $REPORTFILE;

These reports won't include any requests made by searchbots, any request that didn't execute the JavaScript, or any request made by a user that didn't keep the page open for at least two seconds. This solution gives me simple and effective traffic stats that leverage the data my servers were already collecting, with no additional or accidental data collection required!


## What Really Matters

Traffic monitoring is a useful, but addictive tool, and it's easy to get caught up in the data they collect and convince yourself that it's more useful than it really is. At the end of the day, I just need to know, roughly, how many people read one of my articles or how many visited the homepage of a service I run. I don't need to know who they were or anything else about them, and I don't want more data than I need.

Due to the limitations of server-side monitoring&mdash;even with my JS snippet&mdash;GoAccess can't provide you with exact traffic numbers; nothing can. But like I said, you probably don't need exact numbers. You probably only really need the order of magnitude, which server-side monitoring can easily provide.


[1]: /archive/removing-google-analytics/
[2]: https://goingindie.tech
[3]: https://goaccess.io
[4]: /archive/building-a-personalized-newsletter-with-bash-and-a-raspberry-pi/
[5]: https://pine.blog/
[6]: http://democracyandprogress.com
[7]: https://inessential.com/2016/01/20/nick_on_twitter
