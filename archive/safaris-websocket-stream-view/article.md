slug: safaris-websocket-stream-view
published: Sun, 04 Mar 2018 at 10:16 PM
updated: Thu, 03 Dec 2020 at 04:21 AM
title: Safari's WebSocket Stream View
author: Brian Schrader
tags: development, software, programming, adventurer's codex, xmpp
status: publish

I've mentioned before that [Adventurer's Codex][ac] uses XMPP over WebSockets for it's live-chat and party features, and we're planning to add lots more of these kinds of features in the future. That being said, as a developer, I've had a pretty difficult time building features that rely on WebSockets because it's kind of annoying to see exactly what is being sent and received over the connection. I know that Chrome has some features to help with developing WebSocket applications, but I've never had a good experience with them, and I use Safari as my default browser for both casual use and for web development.

That said, I stumbled across a new WebSocket Stream View in Safari's Dev Tools and, just like when [I discovered that Git supports notes][git-notes], I got really excited. Clicking on an active WebSocket connection now brings up a live timeline of every message sent and received by the browser over that connection. It even shows the `ping/pong` frames that the browser occasionally sends to verify that the connection is still open.

<div class="image-container">
    <img src="/images/blog/safari-websocket-stream-viewer.png"
         alt="safari websocket viewer">
    <p><small>Safari's New WebSocket Stream View</small></p>
</div>

I'm hoping that this new view will make it a lot easier to debug problems because I can now see exactly what's being sent over the connection. I'm not sure when this was added to the Safari Dev Tools, but it's definitely very welcome.


[ac]: https://adventurerscodex.com
[git-notes]: /archive/gits-hidden-feature-notes/
