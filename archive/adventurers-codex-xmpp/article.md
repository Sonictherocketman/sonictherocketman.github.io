slug: adventurers-codex-xmpp
published: Tue, 11 Jul 2017 at 01:12 PM
updated: Sat, 19 Nov 2022 07:49:36 
title: Adventurer's Codex: XMPP
status: publish
author: Brian Schrader
tags: adventurerscodex, dnd, software, xmpp

You might have noticed in my [last post in this series][stack] that I mentioned Adventurer's Codex using [Ejabberd][ej]. A few of you might even be a little abhorred by the idea that a modern piece of software has even a line of XML running through it, but it's true.


## But it's XML!

XMPP is an old standard these days, and I think it's safe to say that it's earned a reputation for being a very complex and stateful XML-based protocol. But XMPP has also had years of industry giants testing its limits and adding new and improved functionality to the spec. All of that means that the XMPP spec has tons of recommendations and countless extensions which can make it difficult to approach as a newbie, but it also means that nearly anything you need to do with XMPP has already been done.

In building [Adventurer's Codex][ac] we wanted to leverage as many server technologies as possible with as little custom logic as we could manage. Nobody on the team wanted to write chat or pubsub functionality, or handle scaling the system with multiple nodes, and we wanted the system to be built on open technologies that support the idea of a standards based Open Web and all of the inter-compatibility that such a web entails. We looked around, and here was this perfectly good, time-tested standard just lying there, waiting for us.

[Ejabberd][ej] has lots of great resources and chat rooms out there filled with people that can help you and the majority of commonly used specs like [Multi-User Chat][muc] and [PubSub][pubsub] are very well documented. The server software is robust and adaptable, and the defaults are already pretty good at getting you up and running. Perhaps most importantly, the client-side support for XMPP is really good: The web has [Strophe.js][stro] and all of the native platforms have either built in support or a wealth of Open Source options for speaking XMPP, so expanding support is easy. All of these things came together to make XMPP a worthwhile choice for our needs... even if it's XML.



[ej]: http://ejabberd.im
[stack]: /archive/adventurers-codex-the-stack/
[xmpp]: https://xmpp.org
[ac]: https://adventurerscodex.com
[muc]: https://xmpp.org/extensions/xep-0045.html
[pubsub]: https://xmpp.org/extensions/xep-0060.html
[stro]: http://strophe.im
