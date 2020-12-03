slug: updates-on-using-nsoperation
published: Sat, 29 Jun 2019 at 07:31 PM
updated: Thu, 03 Dec 2020 at 04:21 AM
title: Updates on using NSOperation
author: Brian Schrader
tags: development, nsoperation
status: publish

Last time [I talked about NSOperation][op], I mentioned that I really liked using it to do things like networking and asynchronous operations in my app. Well, I've made a few tweaks to my `BackgroundNetworkingController` recently (alas a new name was not among them) and I think the new version is even more readable and expressive.

For those who don't know, NSOperation (or just Operation in Swift) is a class that when paired with (NS)OperationQueue allow you to order and track long running and often asynchronous tasks in your apps. You can use it to do API calls, animate transitions, walk a user through a process, and a lot more.

In my last blog post I demoed this piece of code as an example of how I use Operations in the Pine.blog app.

<code class="swift"><pre>
func updateTimeline() {
    let reauthorize = TokenReauthorizationOperation()
    let fetchTimeline = FetchTimelineOperation()
    fetchTimeline.delegate = self
    fetchTimeline.addOperation(reauthorization)
    BackgroundQueueController.queue?.addOperations(
        [reauthorize, fetchTimeline],
        waitUntilFinished: false
    )
}
</pre></code>

And while that example is pretty straight forward, I knew it could be better. There's so many times when I just need to tell my app: do these things in the background, in this order, and tell me when you're done (and let me know if something comes up). Operations allow me to do that, but setting up delegates and adding dependencies seems like cruft that I don't really want to care about.

With that in mind, I added a new set of methods to my queue controller: `performInSeries(operations:)` and `performInSeries(operations: with:)`. Using those instead, the above example becomes:

<code class="swift"><pre>
BackgroundNetworkingController.performInSeries(
    operations: [
        TokenReauthorizationOperation(),
        FetchTimelineOperation(),
    ],
    with: self
)
</pre></code>

This code sets up the given operation with each previous operation as a dependency and assigns their delegate to `self`. Reading this it becomes pretty clear that I want these operations to be performed in the order I specify and I want them to alert me if anything comes up, which is exactly what I want.

Even the most complex uses in all of the Pine.blog app still retain their readability (aside from array concatenation). This example reauthorizes the user's token, then fetches the most recent posts in  each of the user's timelines, finds any new posts that the user has liked, and finally calls the given completionHandler to let the app know that it has completed updating its data.

<code class="swift"><pre>
BackgroundNetworkingController.performInSeries(
    operations:
        [ ReauthorizationTask() ]
        + timelines.map { FetchNewestPostsInTimeline(timeline: $0) }
        + [ FetchLikesOperation(), BlockOperation { completionHandler?(self.fetchResult) }],
    with: self
)
</pre></code>

There's still a bit further I can go with this, but I'm really happy with the readability and clarity improvement that these changes have made to my codebase.


[op]: /archive/i-love-nsoperation/


<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script><script>hljs.initHighlightingOnLoad();</script>
