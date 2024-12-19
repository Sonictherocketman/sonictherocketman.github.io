slug: easy-refactoring-with-source-making
published: Tue, 19 Jul 2016 at 11:58 AM
updated: Thu, 19 Dec 2024 20:03:54 
title: Easy Refactoring with Source Making 
author: Brian Schrader
tags: refactoring, programming
status: publish

If you haven't heard of [Source Making][sm], you should check them out. They
have a lot of really great and simple tips and tricks to help developers write
good code and refactor bad code, and they have lots of practical examples for
each of their techniques.

Here's two of my favorite tips: 

[Replace Conditional with Polymorphism][poly]

> - This technique adheres to the Tell-Don't-Ask principle: instead of asking an
object about its state and then performing actions based on this, it is much
easier to simply tell the object what it needs to do and let it decide for
itself how to do that.

> - Removes duplicate code. You get rid of many almost identical conditionals.

> - If you need to add a new execution variant, all you need to do is add a new
subclass without touching the existing code (Open/Closed Principle). 

[Replace Nested Conditional with Guard Clauses][guard]

> **Problem**
> You have a group of nested conditionals and it is hard to determine the normal
flow of code execution.

> **Solution**
> Isolate all special checks and edge cases into separate clauses and place them
before the main checks. Ideally, you should have a "flat" list of conditionals,
one after the other.

In regards to the first tip, I find myself falling into the trap of if/elsing
though a list of cases just to determine what to do next, or what state to
alter. Unfortunately, a lot of Python libraries are guilty of this practice. 
Replacing each of the cases with concrete subclasses would definitely help 
developers keep track of the various code paths, all while making the code cleaner. 

In keeping with the second tip, one of my favorite features of Swift is its [Guard][sw-guard] statement. It keeps the normal execution logic clean, while still allowing the developer to handle rare, or extraordinary cases easily. 


[sw-guard]: https://thatthinginswift.com/guard-statement-swift/
[sm]: https://sourcemaking.com
[guard]: https://sourcemaking.com/refactoring/replace-nested-conditional-with-guard-clauses
[poly]: https://sourcemaking.com/refactoring/replace-conditional-with-polymorphism

