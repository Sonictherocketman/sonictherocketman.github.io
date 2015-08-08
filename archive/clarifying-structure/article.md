slug: clarifying-structure
published: Thu, 26 Feb 2015 at 12:00 AM
updated: Sat, 08 Aug 2015 at 04:31 PM
title: Clarifying Structure

author: Brian Schrader

tags: programming

status: published


<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">

<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>

<script>hljs.initHighlightingOnLoad();</script>



In moving between my day job, programming in Java, and my personal projects, usually in Python, there tends to be a lot of bleedover from one language/paradigm to the other. I love Python. It's a fun, straghtforward, powerful language and it has lots of great features and frameworks built up around it, but Python's dynamic nature can lead to problems with readability and understandability(?) when developers take it for granted.



Say one thing for Java, say that it's picky. It wants one class per file, getters and setters are explicit, and it can be very verbose (in the wrong ways). One thing Java does have though, is clear structure. Classes have members, members are laid out in advance, and you know what to expect. Python passes dictionaries like Java throws NullPointerExceptions: everywhere. Unlike NullPointerExceptions though, Python's reliance on dictionaries is one of my favorite features of the language, but relying on data types, which have no default structure, means that anyone reading your code will have to, not only decipher the meaning of the code, but also the structure of your data. Clarifying the structure of your dictionaries explicitly will help readability and enforce you to adhear to that structure down the line.



Here's some sample code that doesn't clarify ahead of time what the structure of the dictionary will be:



<pre><code class='python'>    results = {}

    results['users'] = get_users()

    results['posts'] = [post for post in get_posts()]

    if my_user_id not in results['users']:

    	results['users'].append(my_user_id)

    results['last_post_times'] = [last_post_time for last_post_time in get_times()]

    for lpt in results['last_post_times']:

    	if lpt['user'] not in results['users']:

    		raise SomeError

    return results

</code></pre>



Although it's not too hard to see, the structure of results can't be easily determined from the first line. You have to walk the code to see the structure.



<pre><code class='python'>    >>> results = {

    		'users': [

    			'terry.gilliam',

    			'eric.idle',

    			'graham.chapman',

    			'john.cleese',

    			'michael.palin',

    			'terry.jones'

    		],

    		'posts': [

    			{ 

    				'user': 'john.cleese',  

    				'content': 'How to defend yourself against a man armed with a banana.'

    			},

    			{

    				'user': 'eric.idle',

    				'content': '@john.cleese What about a pointed stick?'

    			}

    		],

    		'last_post_times': [...]

    	}

</code></pre>



Another way of laying out this code would be like this. Here, we clarify the structure that results will have upfront.



<pre><code class='python'>    results = { 'users': [], 'posts': [], 'last_post_times': [] }

    # The rest is the same...

    results['users'] = get_users()

    results['posts'] = [post for post in get_posts()]

    if my_user_id not in results['users']:

    	results['users'].append(my_user_id)

    results['last_post_times'] = [last_post_time for last_post_time in get_times()]

    for lpt in results['last_post_times']:

    	if lpt['user'] not in results['users']:

    		raise SomeError

    return results

</pre></code>



Now, from looking only at the first line, we know the structure that results will take. We don't have to decipher it. There's no performance difference in either approach, but laying out the structure of the dictionary ahead of time makes the code more easily scannable. 



Python will let you be sloppy in ways that Java just won't. Overall I much prefer working in Python, but because its so forgivable and dynamic, I'm constantly finding myself forcing structure onto my code to make it more understandable when I eventually come back to it.



**Update:** [Someone](https://twitter.com/macromicah) at the local Python meetup group told me about [NamedTuples](http://stackoverflow.com/a/2970722/2085172) saying, "If you're looking for that structure, I'm wondering if you should be using a dictionary."

