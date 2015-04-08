title: PEP 484 - Type Hints for Python

author: Brian Schrader

tags: python, pep

status: published


[Guido van Rossum][guido]:



<center><blockquote class="twitter-tweet" lang="en"><p>Almost everyone in the language summit is supportive of PEP 484.</p>&mdash; Guido van Rossum (@gvanrossum) <a href="https://twitter.com/gvanrossum/status/585872596090032131">April 8, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></center>



[guido]: https://en.wikipedia.org/wiki/Guido_van_Rossum



I'm for any improvements that will help my favorite language run smoother, with fewer errors, [and maybe faster someday*](#speeeed). 



> This PEP aims to provide a standard syntax for type annotations, opening up Python code to easier static analysis and refactoring, potential runtime type checking, and performance optimizations utilizing type information.

> Of these goals, static analysis is the most important. This includes support for off-line type checkers such as mypy, as well as providing a standard notation that can be used by IDEs for code completion and refactoring.



There's been a big push for better static analysis in Python for the last few years, and there've been attempts like this before (see Cython) and having a language level standard for Type Hints would bring the benefits to all the various Python implementations.



<pre><code class="python"># An example of the proposed type hint syntax.

def greeting(name: str) -> str:

    return 'Hello ' + name</code></pre>



I admit, the new syntax looks very Rust/Swift-like, and that's probably by design. One thing that worries me, and which isn't obvious from that code sample is that Python Type Hints will (must) include generics and blocks (i.e. lambdas, closures, etc). When those get into the mix, the Type Hint system starts to look a little messy.



<pre><code class="python">from typing import Mapping, Set



def notify_by_email(employees: Set[Employee], overrides: Mapping[str, str]) -> None: ...</code></pre>



Even though that code isn't particularly pretty, the Type Hints can help the static analyzer find errors that could potentially be very hard to track down. As I said, I'm completely in favor of this addition to the Python syntax.   



As a final note, for those of you worried that Python might be changing to a statically typed language, fear not.



> It should also be emphasized that Python will remain a dynamically typed language, and the authors have no desire to ever make type hints mandatory, even by convention.



[PEP 484 - Type Hints &#8594;](https://www.python.org/dev/peps/pep-0484/)



<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">

<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>

<script>hljs.initHighlightingOnLoad();</script>



————



<span id="speeeed">*</span> According to the PEP, the goal of Type Hints will not be performance based, but they do go on to say, "Using type hints for performance optimizations is left as an exercise for the reader," which keeps me hopeful that PyPy or maybe even CPython could use them for that purpose as an added benefit.
