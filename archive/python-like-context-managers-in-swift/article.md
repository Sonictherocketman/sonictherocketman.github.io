slug: python-like-context-managers-in-swift
published: Wed, 25 May 2016 at 03:25 PM
updated: Tue, 09 Dec 2025 22:38:19 
title: Python-like Context Managers in Swift
author: Brian Schrader
status: publish
tags: programming, python, swift

One of the most expressive concepts in Python is the context manager, and their
simplest use case is reading and writing files.

<code class="python"><pre>
with open('path/to/my/file') as f:
    f.write(some_data)
</pre></code>

All of the logic that handles opening the file, checking for errors, and
closing the file is handled automatically by the `with` statement. This allows
developers to write cleaner, more expressive code without worrying about the
nitty gritty details of opening/closing files, and Python allows you to write
your own context managers. This makes it easy to clean up any code that needs
to execute in a given, safe context.


## Enter Swift

Swift doesn't have the concept of a context manager, but they can still be easily implemented using Swift's clean and clear closure syntax.

One of the most helpful use-cases for a context manager in Cocoa is in a custom view's `drawRect` function. CGContexts can get confusing
if you're having to deal with them yourself. If only we had some sort of
manager for these contexts. 

<pre><code class="swift">
// First let's define our context manager function.
func drawBlockInSafeContext(block: (context: CGContext?) -> ()) {
    let context = UIGraphicsGetCurrentContext()
    CGContextSaveGState(context)
    block(context: context)
    CGContextRestoreGState(context)
}
class MyView: UIView {
    //...
    func drawRect(rect: CGRect) {
        drawBlockInSafeContext { context in
            // Now we can draw our view 
            // without polluting the root context 
        }
    }
}</code></pre>

Context Managers are one of my favorite features of Python and I'd love to see
the concept carried over to Swift. For the record: Omar Abdelhafith has a great tutorial on making more advanced, and more [Pythonic Swift Context
Managers](https://medium.com/ios-os-x-development/swift-context-manager-implementing-python-context-manager-in-swift-f327b2b4a7d7#.oys53xm0u).

<link rel="stylesheet"
href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

