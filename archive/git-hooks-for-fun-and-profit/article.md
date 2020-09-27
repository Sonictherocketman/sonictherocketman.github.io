slug: git-hooks-for-fun-and-profit
published: Sun, 27 Sep 2020 at 07:44 PM
updated: Sun, 27 Sep 2020 at 07:44 PM
title: Git Hooks for Fun and Profit
author: Brian Schrader
tags: git, hooks, automation, bash, hacks, web dev
status: publish

I love Git hooks. For those who aren't aware, Git hooks allow you to specify actions that will be automatically taken whenever certain Git commands start or complete. Git hooks are great for simple, easily forgettable, automate-able tasks. In most projects, [I use Git hooks][2] to [automatically run preflight checks][1] before I'm allowed to commit any changes to a codebase. Usually this means that the codebase is properly formatted, dangling imports are removed, and basic style checks and tests pass. If these checks don't pass, the commit fails.

That said, Git hooks can do so much more. As I've mentioned many times, this site, along with [GoingIndie.tech][3] and [IndieDevLife.fm][5] are static sites. They're just files served by apache. Because of that, both sites aren't able to take advantage of a lot of really cool blog ecosystem features like ping change notifications. These notifications are typically sent from blogging systems to search engines or news aggregators to let those services know that the site's content has been updated (i.e. a new post was just published, etc). These notifications help services more quickly discover and disseminate that new content to users. [Pine.blog supports this feature][4] and Wordpress blogs automatically send these notifications to Google, but my simple static site couldn't.

Then I realized that Git hooks can solve this problem!

Both sites are just Git repos that use a `post-receive` hook to check out the latest version to a directory served by apache. I commit a new set of changes, push those changes to the remote repo on my server, and that hook runs and copies this new version into wherever apache is expecting. All I need to do is add a little snippet of code to that same hook to send Pine.blog a notification, because by definition: whenever a Git commit is received, the site has changed.

    # Send an XML-RPC extendedPing notification to Pine.blog
    echo "<methodCall>
        <methodName>weblogUpdates.extendedPing</methodName>
        <params>
            <param><value><string>brianschrader.com</string></value></param>
            <param><value><string>https://brianschrader.com/</string></value></param>
        </params>
    </methodCall>
    " | curl -H "Content-Type: application/xml" -X POST -d @- \
        https://pine.blog/api/xml-rpc/ping

Adding this simple curl script to my `post-receive` hook did the trick! Now my blog posts will more quickly appear on Pine.blog! Git hooks for the win.


[1]: https://gist.github.com/Sonictherocketman/b196995f768eda4411e0771e9c509237
[2]: /archive/remembering-things-is-hard/
[3]: //goingindie.tech/
[4]: https://pine.blog/kb/add_external_blog#ping
[5]: http://indiedevlife.fm
