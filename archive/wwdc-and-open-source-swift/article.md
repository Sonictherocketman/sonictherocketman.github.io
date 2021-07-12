slug: wwdc-and-open-source-swift
published: Tue, 09 Jun 2015 at 02:56 PM
updated: Mon, 12 Jul 2021 at 04:38 AM
title: WWDC and Open Source Swift
author: Brian Schrader
tags: apple, wwdc
status: publish

I'm pretty happy with yesterday's announcement (excluding the "One more thing..." part). OS X got a very understated release, but that's because, I suspect, that it seems to be mostly bug fixes, and that's great news. I'm mostly excited about the bug fixes and performance enhancements, but there were some solid updates to Safari, and Maps as well (transit isn't available for San Diego yet, but hopefully it will be soon).

On the iOS front, the iPad got all the love, and that's long overdue. The "new" (Surface Pro style) multitasking is nice, and the popovers look cool (Netflix *and* Twitter at the **same time**!). I'm also a fan of the new battery improvements and the Spotlight search API (Finally). 

To me though, the biggest news of the whole conference was the announcement that Swift will be Open Source[<sup>1</sup>](#1). For Apple, this means that Swift will be placed alongside [Go][g] and [Rust][r] in the new, hot systems programming language category. Chris Latner expressed his desire for Swift to be open source last year at WWDC, and I'm glad he was able to convince the higher ups. Making Swift open source allows it to be a real alternative (and competitor) to Rust and Go, and I can't wait to see what people do with it. Swift interoperability with Python is also something I look forward to hearing about since Python already [interfaces with Rust quite nicely][pr] ([examples][ex]). Using Swift, Rust, or Go as your low level language instead of C has a lot of advantages, and its great to see Apple keep pace with the outside world. More competition and choice in the systems programming language world is always good, and there will shortly be 3 great options to choose from.

[g]: http://golang.org
[r]: http://www.rust-lang.org	
[pr]: https://siciarz.net/24-days-of-rust-calling-rust-from-other-languages/
[ex]: https://github.com/alexcrichton/rust-ffi-examples/tree/master/python-to-rust/src

<div id='1' style='font-size:small;'>1. Yes I'm aware that Apple said, "later this year." Yes, I am also aware that FaceTime was supposed to be an Open Standard. I contrast with this: ResearchKit is on GitHub; this is a new Apple.</div>