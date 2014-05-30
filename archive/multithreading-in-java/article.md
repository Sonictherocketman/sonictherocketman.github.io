title: Multithreading in Java

slug: multithreading-in-java

author: Brian Schrader

status: published


<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">

<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>

<script>hljs.initHighlightingOnLoad();</script>



I work as a Java Software Developer. That being the case, I know comparatively little about Java[*](#note1). I'm much more well-versed in Objective-C, Python, or even PHP, than in Java. As such I've had quite a few occasions I've needed to do some task or another and I'm at a loss for the "Java way", so I put together this handy-dandy little guide.  



<img src="http://brianschrader.com/images/blog/branches.png" class="image-center hide-on-mobile" style="width:70%;">



Let's assume that I want to do some heavy processing, but not have it clog up the main thread, a pretty common task. In Objective-C we have Grand Central Dispatch.



## GCD and Multithreading in Objective-C

<pre><code class="objc">

dispatch_async( dispatch_get_global_queue( DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^(void){

		//Do your long processing job here.

	});

</code></pre>



And in Objective-C, if I want to return to the main thread to do some UI Updates, or return to do something else I just add 1 line and it becomes:



<pre><code class="objc">

dispatch_async( dispatch_get_global_queue( DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^(void){

	//Do your long processing job here.

	dispatch_async( dispatch_get_main_queue(), ^(void){

       	//Run UI Updates

   	});

});

</code></pre>



## Now, In Java



In Java, I wanted to do the same thing, dispatch work to be done on another thread. After some research, I found this on StackOverflow. It seemed to be just want I wanted.



### Using Threads (The Wrong Way)



<pre><code class="java">

new Thread(new Runnable() {

	public void run() {

		//Do your heavy lifting here.

	}

}).start();

</code></pre>



<img src="http://brianschrader.com/images/blog/java.png" class="image-right hide-on-mobile" style="width:30%;">



This tells Java, literally, to make a new thread and execute this code on that new thread. Unlike in Objective-C where I'm handing some code off to a queue that might make a new thread, choose an existing one, or whatever. This also means that, in Java, the developer is tasked with maintaining that thread, and as far as I know, it isn't handled like regular system threads. As such, this is kind of frowned upon.



The problem I encountered in testing this was 2-fold. First, the task was unable to give status updates or return to the main thread without considerably more code, and second, if the process encountered an Exception it went uncaught and you'd never know that anything happened. Obviously there are ways around both of those things, but they require significant changes to the source code, and I wanted an inline solution just like GCD in Objective-C. Let's try something else.



### Using Executors (The Right Way)



After more research, I discovered a way to accomplish what I wanted in an inline way that was preferred by the Java community and worked the way I wanted. There's three options for doing this depending on what you need to accomplish.



If you want to do some execution on another thread but don't need results or status updates from it then this code should work.



#### Asynchronous Execution (No Status Updates, No Returns, No Exceptions)



<pre><code class="java">

ExecutorService executorService = Executors.newSingleThreadExecutor();

executorService.execute(new Runnable() {

    public void run() {

       //Do your heavy lifting here. 

    }

});

executorService.shutdown();

</code></pre>



#### Asynchronous Execution (Status Updates, but No Returns, No Exceptions)



If you need to check on the task, but not get values from it: 

(i.e. you want to know if its finished, but you dont care about getting results). 



<pre><code class="java">

Future future = executorService.submit(new Runnable() {

    public void run() {

        //Do your heavy lifting here.

    }

});

future.get();  //returns null if the task has finished correctly.

</code></pre>



#### Asynchronous Execution (Status Updates, Returns, and Exceptions)



If the task needs to return values, or throw exceptions, then use a Callable instead of Runnable.



<pre><code class="java">

Future future = executorService.submit(new Callable(){

    public Object call() throws Exception {

        //Do your heavy lifting here.

        return "Callable Result";

    }

});

System.out.println("future.get() = " + future.get());

</code></pre>



Hopefully this little guide helps you. Let me know if you have any suggestions or if you want to correct me. As I said, Java isn't my strongest language and I may have gotten some details wrong regarding the benefits of each approach. Overall, I still admire Objective-C's implementation, it just feels more straight forward and readable. I know that people have [ported GCD][gcdport], which Apple [open sourced][gcdos], to Java and other languages, but for business applications, that kind of thing isn't really accepted. I'm stuck doing it the Java way, which is fine.



<span id="note1" style="font-size:small;">

* Java is a language I learned in class and hadn't touched again until I was roped in to do Java Development at work. Its not my favorite language, but it gets the job done and its community is enormous. If you have questions, the Java section of StackOverflow has an answer. 

</span>



<span id="note2" style="font-size:small;">

** I've been sitting on this article for a while, mostly because I didn't know if these "answers" were correct or not. Now that I've not only researched this topic more, but I've actually used it quite a bit, I'm far more confident in the answers I'm giving.

</span>



<span id="note3" style="font-size:small;">

*** Also, [Highlight.js](http://highlightjs.org) is really cool.

</span>



[gcdport]: http://hawtdispatch.fusesource.org

[gcdos]: http://libdispatch.macosforge.org

