slug: markdown-syntax-request-math-syntax
published: Thu, 19 Sep 2013 at 02:35 AM
updated: Sun, 16 Aug 2015 at 04:38 PM
title: MarkDown Syntax Feature Request: Math Syntax
author: Brian Schrader
status: publish 

<p><a href=\"http://daringfireball.net/projects/markdown/\">MarkDown</a> provides a simple way to write in plaintext, that can easily be translated into HTML. The syntax provides support for headers, paragraphs, images, links, emphasis, and more. It really makes it easy to write content without worrying about tags or formatting. </p><p>One of the most painful, and tedious things to do on a computer is enter mathematical formulas and functions. Until now, if you wanted to enter equations into a computer interface, you were forced to use MS Word's terrible equation editor, or HTML and do all of the span elements manually. MarkDown can make it easy. I believe that adding a simple extension to MarkDown will make this time-consuming and fairly arduous task a lot easier and bring mathematics into the folds of the computing era.</p><h3>The Proposed Syntax</h3><p>The syntax for entering an equation into MarkDown syntax you enter the equations between a curly-brace followed immediately by a colon.</p><p>{: <em>Anything entered here is treated as an equation</em> :}</p><p>Even Multi-Line equations</p><p>{: </p><p>(2x^2) = 54</p><p>x=2+34y^2</p><p>:}</p><p>The above equations would become:</p><p></p><p><img style=\"margin-left:15px;\" src=\"http://images.biteofanapple.com/blog/eq1.png\" alt=\"math equation\"/></p><p><img style=\"margin-left:15px;\" src=\"http://images.biteofanapple.com/blog/eq2.png\" alt=\"math equation\"/></p><p></p><p>Inside the equation delimiters (an I will call them) text and characters are treated as mathematical expressions, not as text. Examples: ^ (carats) are parsed to subscripts; x/y (forward slashes) are converted to a vertical division symbol; * (asterisks) are parsed as multiplication; etc.</p><p>Special symbols like greek letters, and integrals (essential in math intensive fields) will use <em><a href=\"http://web.ift.uib.no/Teori/KURS/WRK/TeX/symALL.html\">TeX-like</a></em> \terms. </p><p>Note: Symbols like \\int (which makes an integral) will only work <em>inside</em> the equation delimiters.  </p><p>{:</p><p>Y(x) = \\int:4,8\\ 2x dx</p><p>:}</p><p>Would become:</p><p><img style=\"margin-left:15px;\" src=\"http://images.biteofanapple.com/blog/eq3.png\" alt=\"eq3\"/></p><h3>The Goal is not to remake LaTeX</h3><p>The goal of MarkDown is to make writing simple things easier, and to cut away distractions. It doesn't cover everything nor should it. Similarly, this MarkDown extension will not be a remake of LaTeX, it will not cover every symbol in mathematics. Instead it will be a way to easily write the most common mathematical symbols (fractions, greek letters, integrals, and functions). </p><p>Note: Some <a href=\"http://www.cs.tut.fi/~jkorpela/math/\">others</a> have written on this subject and it seems to be a limitation in HTML that holds this idea back since HTML has no way to display a lot of elements in mathematics. This could probably be worked around by keeping the symbol library relatively small and limited to standard font characters.</p>"  