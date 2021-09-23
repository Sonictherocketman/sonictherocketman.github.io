slug: mvc-n-and-services
published: Tue, 24 May 2016 at 10:40 AM
updated: Thu, 23 Sep 2021 at 11:18 PM
title: MVC-N and Services
author: Brian Schrader
status: publish
tags: mvc, programming, angular

In a recent talk, [Marcus Zarra][1] proposed a new addition to the
Model-View-Controller paradigm, which he calls the Network Controller (MVC-N):

> We have a network controller: it talks to the internet, your local network,
> or even be a flat file system. It then pushes data into your cache, into your
> persistence engine. Here comes the exciting part: your entire view layer
> talks to the cache only. It does not get data from the internet directly. The
> ViewController’s job is to display or update that data, not to do networking
> code.

> *Note: if you do not like the word “controller”, then “manager”, “handler”, or anything else works fine. The point is that it is a controller object, because it is not a view and not a model.*

I use this pattern all the time in my code, but I don't like calling it a
controller. I've started using the term `Service` to denote any class or set of
code that provides an abstraction for my View Controllers.<sup>1</sup> 

In my code, I will typically have classes like `NetworkService`,
`DropboxService`, `ChatService`, `NotificationService`, etc. These services abstract their underlying protocols, data stores, and logic away from the View Controllers and allow for cleaner VC code.

I'm no where near as experienced in iOS development as Marcus is, but I like to
think of any Cocoa class that uses the `.shared()` or `.default()` paradigm as a built-in service.

<pre><code class="c">
// This is a service. It abstracts the process of sending 
// notifications, and itself is not a view controller.
NSNotificationCenter.defaultCenter()
// So is this.
UIApplication.sharedApplication()
</code></pre>

I've heard these kinds of classes called `Utility` classes, but I think that's
a big misnomer. Utility classes are little convenience
classes or functions that provide esoteric and unique functionality, while a
service abstracts some underlying, logically distinct functionality away from the View Controllers.

[MVC-N: Isolating network calls from View Controllers &#8594;][1]

--------

<div class="footnote">
<sup>1</sup> Services in this sense come from the Angular term for non-view
controller related logic that handles some background communication with the
network.
</div>


[1]: https://realm.io/news/slug-marcus-zarra-exploring-mvcn-swift/

<link rel="stylesheet"
href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

