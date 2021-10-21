slug: numba-compiling-python-using-llvm-the-way-webkit-compiles-javascript
published: Sat, 30 Aug 2014 at 11:10 PM
updated: Thu, 21 Oct 2021 at 02:26 AM
title: Numba: Compiling Python Using LLVM the way WebKit Compiles JavaScript
author: Brian Schrader
tags: python, javascript, llvm
status: publish


<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">

<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>

<script>hljs.initHighlightingOnLoad();</script>

In May, Apple announced a [new feature in WebKit][wkjit] that added a fourth tier of speed optimization for JavaScript in Safari. In this new tier, JavaScript would be compiled to machine code (specifics aside). This kind of optimization (called FTL JIT) gave Webkit a 35% performance boost when compared to the third tier of optimization, pretty impressive.

[wkjit]: https://www.webkit.org/blog/3362/introducing-the-webkit-ftl-jit/

It seems someone thought that JavaScript was getting all the love when it came to speed optimizations and thought Python should benefit from this idea as well. That became [Numba][nb]. Numba allows Python developers to annotate any given segment in their code, that segment will be just-in-time (JIT) compiled using LLVM giving it, potentially, a 2 orders of magnitude improvement in speed! 

<pre><code class="python"># Code from http://numba.pydata.org
from numba import jit
from numpy import arange

# jit decorator tells Numba to compile this function.
# The argument types will be inferred by Numba when function is called.
@jit
def sum2d(arr):
    M, N = arr.shape
    result = 0.0
    for i in range(M):
        for j in range(N):
            result += arr[i,j]
    return result

a = arange(9).reshape(3,3)
print(sum2d(a))
</code></pre>

[nb]: http://numba.pydata.org

After talking to someone who'd actually used Numba in their code, they say their code saw anywhere from 2x to 500x speed improvements depending on what they were doing (using regular, old vanilla Python). That's really impressive. I can't wait to try out Numba, and I think I have some very interesting use cases coming up where this might be the solution I've been looking for.
