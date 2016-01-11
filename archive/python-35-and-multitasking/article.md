slug: python-35-and-multitasking
published: Fri, 18 Sep 2015 at 08:19 AM
updated: Mon, 11 Jan 2016 at 11:10 AM
title: Python 3.5 and multitasking
author: Brian Schrader
tags: python, gcd, multitasking
status: publish 

Python has a long and complicated history with multitasking. Strictly speaking
the [GIL][1] prevents a lot of classical attempts at multithreading for
arguably simpler application implementation. Therefore true multitasking in Python 
is available with multiprocessing, but the community tends to avoid it like the 
plague (for not undeserved reasons). With the release of Python 3.5, the community 
has very firmly cemented it's stance that multitasking should be done cooperatively 
using coroutines and generators, but as of yet the actual process of writing
multitasking code is still very complicated and I don't really understand why.

[1]: http://www.dabeaz.com/GIL/

Back when I was doing iOS development, I got quite familiar with
Apple's [Grand Central Dispatch][2] API and I guess it spoiled me. The syntax
for kicking off calculations to separate threads, or returning to the main
thread for come quick UI updates is so simple. By comparison, Python's approach
seems overly complex. Granted, the two languages/environments are used
for different things. 

[2]: https://en.wikipedia.org/wiki/Grand_Central_Dispatch

Regardless, the newest version of Python (v3.5) adds support for a new
asynchronous function syntax. In short, this means that the old Python 
generator-based coroutines have been codified into a full on language feature. 
If you're like me, then you probably aren't to familiar with generator-based
coroutines, so this new syntax brings with it a host of new concepts to grok.

<code class='python'><pre>
    async def some_function():
        pass
</pre></code>

With the new release, I thought I'd do some testing to see, not only how the
new syntax works, but how well these new coroutines perform various tasks. At
work I need to manipulate fairly large files (~2-5GB of text) and I thought 
that I might be able to get some performance improvements by switching to using 
coroutines in Python 3.5. Currently, most of my code is plain-old sequential,
but I do have some auxiliary files that I generate during my analysis, and I'd 
like to be able to write out without stopping the main set of calculations to
wait for a slow-ass disk. At my first glance, coroutines seemed perfect.

Time to test the new thing
--------------------------

Right off the bat, the new syntax threw me into a torrent of confusion. I won't
get into my issues here, but suffice to say that having a coroutine
await some other coroutine which awaits some other coroutine is likely a way to 
get yourself confused fairly quickly.

One thing I wanted was to be able to use the new `async/await` syntax without
using `asyncio`. In my mind I shouldn't have to use a library to make the basic
syntax work, but that doesn't seem to be the case, and in the end I ended up having 
to use the event loop functions to get my code working. Once I discovered the 
secret of coroutines hidden in the documentation (and hidden quite well I'd say), 
I had some code that could finally be run asynchronously. 

My goal was to have a few long-running tasks that would normally block, and
kick them off into a coroutine that would spin away while I did other things.
This is not how Python's coroutines work, and that becomes clear right away.

In short: Everything is asynchronous, or nothing is.

This mantra makes it really difficult to make Python code simple and serial and
still kick side work off to the coroutines. I understand that Python can only
do one thing at once, but the design of the `async/await` system seems really
punishing for little gain. 

Results
-------

Once I finally got the whole thing working, I devised some performance tests.
My 3 sets of test covered CPU bound, I/O bound, and a mix of CPU and I/O bound
computations, and each test would attempt all 5 of the usual Python
multitasking techniques: 

- Serial execution (as a control)
- Classical multithreading (which Python's GIL basically kills)
- Classical multiprocessing
- Python 3.5 Coroutines (with a threading pool, the default)
- Python 3.5 Coroutines (with a process pool)

I've published the test suite I used over [on GitHub][4] if you want to check
it out for yourself. Overall, the results were really surprising.

[4]: https://github.com/Sonictherocketman/python3.5_coro_testing

<center>
    <style type="text/css" scoped>td,th {text-align: center;}</style>
    <table cellspacing='12'>
        <tr>
            <th></th>
            <th>CPU bound</th>
            <th>I/O bound</th>
            <th>Both CPU/IO bound</th>
        </tr>
        <tr>
            <th>Test</th>
            <th>Time</th>
            <th>Time</th>
            <th>Time</th>
        </tr>
        <tr>
            <td>Serial</td>
            <td>7.804</td>
            <td>1.924s</td>
            <td>4.789s</td>
        </tr>
        <tr>
            <td>Coro Multi</td>
            <td>4.739s</td>
            <td>0.951s</td>
            <td>13.574s</td>
        </tr>
            <td>Coro Thread</td>
            <td>8.221s</td>
            <td>1.97s</td>
            <td>7.724s</td>
        </tr>
        <tr>
            <td>Multiprocess</td>
            <td>4.488s</td>
            <td>1.320s</td>
            <td>4.513s</td>
        </tr>
        <tr>
            <td>Threading</td>
            <td>8.251s</td>
            <td>1.807s</td>
            <td>4.976s</td>
        </tr>
    </table>
</center>

While for I/O bound computations the coroutines improved performance quite
nicely with a multiprocessing pool behind it (even over conventional
multiprocessing), the moment you introduce CPU bound operations into the mix
everything goes to hell. In the case of using threading (which because of the
GIL was doomed before it began) it made the test ~9% slower. While the pure CPU
bound case did actually get somewhat faster (~40%) this is an unrealistic
benchmark since eventually you'd need to write something to disk. Once CPU 
and I/O operations get mixed together, for some reason, the execution time went 
*up* ~300%. This is certainly not the kind of behavior that I was expecting and 
it made me rethink my tests. On a second look everything seemed to be in order, 
but if you see something glaring out, please let me know.

One of the flaws that I see with my tests is that they don't use [`asyncio`][3]'s
native IO lib to write to the files, instead they wrap the synchronous `open`
and `write` calls from the standard library. I did this for two reasons, the
first being that I cannot, for the life of me, figure out how to use `asyncio`
to do local file IO and not a network request, but maybe [I'm just an idiot][5]. 
The second reason was because that's not how I'd imagine that I'd have to write
my code if I wanted to use this new functionality. I wrote this code how I
would expect that I would have to in Python. To me, this is an important reason
why I use Python. It's simple and expressive. I'd argue that, while `asyncio`
is amazingly powerful, simple and expressive it isn't. 

[5]: https://twitter.com/sonicrocketman/status/471673517465800704

[`asyncio`][3] and the new syntax in Python 3.5 have all of the pieces needed for 
very simple multitasking, but they both stop short of making them easy to use for 
newcomers and typical users. Actually, thinking about it, they both feel a lot 
like  `urllib`: extremely powerful, but fairly complex for most use cases. Maybe, 
with  Python 3.5, it'll finally be time for [`Async for humans`.][6] 

[3]: https://docs.python.org/3.5/library/asyncio.html
[6]: http://docs.python-requests.org/en/latest/

<script src="http://brianschrader.com/bin/highlight.min.js"></script>
<link rel="stylesheet" href="http://brianschrader.com/bin/highlight.default.min.css">
<script>hljs.initHighlightingOnLoad();</script>

[Checkout my tests for yourself
&#8594;](https://github.com/Sonictherocketman/python3.5_coro_testing)


