slug: i-love-nsoperation
published: Sun, 23 Dec 2018 at 10:29 PM
updated: Sat, 19 Nov 2022 07:49:34 
title: I Love NSOperation
author: Brian Schrader
tags: development, software, nsoperation
status: publish

I've [talked before][gcd] about how much I like using Apple's Grand Central Dispatch API for multithreading on iOS, but over the last year I've become a huge fan of NSOperation and it's become my preferred way to do multitasking on iOS over bare-bones GCD.

NSOperation (or just Operation in Swift) can be used a layer of abstraction over GCD that provides built-in dependency tracking, and task isolation. When combined with NSOperationQueue (OperationQueue in Swift) you also get powerful throttling APIs and more. Typically I've used Operations for background networking and processing, but the API is designed to be used for any set of discrete tasks including UI workflows and more.

## As a Networking Layer

My most common use case for NSOperation is in doing networking. In Pine.blog for example I need to always ensure that a user's OAuth Access Token is valid before making a resource request, say for their timeline. That code looks something like this:

<code class="swift"><pre>
func updateTimeline() {
    // This task must always happen first. It ensures that the OAuth token
    // is going to be valid when I request it, or it attempts to refresh the token.
    let reauthorize = TokenReauthorizationOperation()
    // Now we attempt to fetch the user's timeline and add ourselves as a delegate
    // so the Operation will tell us when new data is available. We also set the
    // reauthorization operation as a dependency of the FetchTimelineOperation
    let fetchTimeline = FetchTimelineOperation()
    fetchTimeline.delegate = self
    fetchTimeline.addOperation(reauthorization)
    // Add the tasks to the queue and process them asyncronously.
    // The custom delegate will be alerted when new data is available.
    BackgroundQueueController.queue?.addOperations(
        [reauthorize, fetchTimeline],
        waitUntilFinished: false
    )
}
</pre></code>

What I've really liked about my NSOperation-based networking is that from the ViewController's perspective, it doesn't care what these tasks do or how, they're just notified when they've received results and I've finally stashed away my networking code into it's own little corner of the codebase, rather than in a custom controller or nestled inside the ViewController where it just gets in the way.

The FetchTimelineOperation takes care of fetching the JSON from the API and creating Core Data Managed Objects. Then my ViewController's FetchedResultsController just worries about displaying the changes to the user. It's simple, clean, and there's a clear seperation between the ViewController and the Networking Stack.

## Gotchas

If there's one thing that frustrates my iOS development it's that Core Data Contexts aren't thread-safe. Originally, I thought that just meant that I couldn't write to the same Core Data store from another thread, but that's simply not the full story. **Never read from or write to Core Data objects from a thread or context other than the one they came from.** Better yet: do all your Core Data writing inside a `performAndWait() {}` block.

Keep in mind, these aren't so much issues with NSOperation as they are overall tips for using Core Data.

### The Bad Way

When it comes to my Operations, what that means is that although you'd be tempted to write something like this:

<code class="swift"><pre>
class MarkPostAsRead: Operation {
    var post: Post
    init(post: Post) {
        self.post = post
    }
    override main() {
        let context = getManagedObjectContext()
        context.performAndWait {
            self.post.read = true
            do {
                context.save()
            } catch {
                NSLog("Failed to save post read status for Post: \(id)")
            }
        }
    }
}
</pre></code>

**You should never do this.** You're violating a number of Core Data's assumptions and you'll get a crash.

### The Good Way

The best way I've found to do Core Data work in a Background Operation is something like this:

<code class="swift"><pre>
class MarkPostAsRead: Operation {
    var id: NSManagedObjectId
    init(postWith id: NSManagedObjectId) {
        self.id = id
    }
    override main() {
        let context = getBackgroundManagedObjectContext()
        context.performAndWait {
            // Get the post from CoreData
            var post: Post!
            do {
                post = try context.existingObject(with: id) as? Post
            } catch {
                NSLog("Unable to mark post as read because it doesn't exist.")
                return
            }
            // Mark it as read
            post.read = true
            // Save the Context
            do {
                context.save()
            } catch {
                NSLog("Failed to save post read status for Post: \(id)")
            }
        }
    }
}
</pre></code>

This method ensures that you're never passing managed objects between threads and you're only modifying that object within the background context you created
for that purpose.

Keep in mind though, any `FetchedResultsControllers` you've made won't be immediately notified of the changes because they happened in a background context instead of the View Context they're using. To fix this add something like this into your Core Data Stack Code:

<code class="swift"><pre>
    func initializeCoreDataStack() {
        // ... Do startup work...
        // Listen for background context changes
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(contextDidSave),
            name: .NSManagedObjectContextDidSave,
            object: nil
        )
    }
    @objc func contextDidSave(notification: Notification) {
        guard let sender = notification.object as? NSManagedObjectContext else {
            // Not a managed object context. Just leave it alone.
            return
        }
        // Don't listen for changes to the view context.
        let viewContext = DataController.persistentContainer.viewContext
        if sender != viewContext {
            ensureMainThread {
                viewContext.mergeChanges(fromContextDidSave: notification)
            }
        }
    }
</pre></code>

Now the View Context will automatically merge changes from the background contexts when you call `context.save()`.

### Dispatching Concurrent Groups of Operations

In some cases your app will need to dispatch an operation that could need to dispatch multiple, concurrent suboperations. In this case I've found it really helpful to wrap the group of asynchronous operations inside of a synchronous operation that simply waits for them to complete.

<code class="swift"><pre>
class LotsOfConcurrentRequests: Operation {
    var urls: [URL]
    var results: [JSONObject]? = nil
    init(responsesFrom urls: [URL]) {
        self.urls = urls
    }
    override main() {
        let suboperations = urls.map { url in
            return AsyncFetchURLOperation(url: url)
        }
        // Add the tasks to the queue and wait until they're all done. Easy.
        BackgroundQueueController.queue?.addOperations(
            suboperations,
            waitUntilFinished: true
        )
        // Gather the results
        results = suboperations.map { $0.result }
    }
}
</pre></code>

And that's pretty much it. NSOperation has basically replaced GCD for me in all but a few niche use-cases since NSOperation allows you to define complex workflows in a simple, clear way that you can invoke and control from any aspect of your app and it nicely separates your networking code from the other parts of the system.

[gcd]: /archive/multithreading-in-java/

<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script><script>hljs.initHighlightingOnLoad();</script>
