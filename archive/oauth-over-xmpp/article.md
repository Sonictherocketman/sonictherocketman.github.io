slug: oauth-over-xmpp
published: Tue, 24 Oct 2017 at 06:24 PM
updated: Thu, 05 Feb 2026 03:14:22 
title: OAuth Over XMPP
author: Brian Schrader
tags: django, software, xmpp, oauth, adventurerscodex
status: publish


As [I've said before][xmpp], [Adventurer's Codex][ac] uses XMPP for it's real-time features. During development we ran into a couple of interesting challenges with integrating such a mature system with our new-ish web stack, one of which was User Authentication.

The majority of Adventurer's Codex uses an OAuth Provider model for user authentication but Ejabberd (our XMPP server) requires that the username and password be sent at connection time. Obviously we didn't want to have two different auth schemes to support, and we didn't want our client app to store any passwords (hence OAuth). We spent a while hunting for different possible solutions, and in the end we stumbled into a really simple one.

Ejabberd allows for authentication to be handled by an external script, which allows us to use our core database as the auth backend. We could, in principle, use a Django management command to make a call to our database, hash the password that we were given by the client and compare it to the one stored in our database, but not only is that a lot of work and error prone, it's too coupled to our database layer, and it still required the client to store the user's password.

In the end we went with what might seem like the obvious solution: just keep using OAuth. After the client receives the initial user data at load time, it sends the same OAuth token as the password along with the user's XMPP JID to Ejabberd. Ejabberd then calls out to an external script which makes an HTTP request to our API to see if the user exists and that the token is valid. Clean and simple.

![A visualization of the OAuth over XMPP process.](/images/blog/xmpp-auth.svg)

There's a few major advantages to using this method. First, The client no longer has to store user passwords, which not only makes our implementation simpler, but also protects our users from a whole host of attacks. Second, the user's XMPP session is now bound to the same limits as the rest of their access to the site which greatly simplifies permissions handling. Third, and perhaps the most interesting is that Ejabberd is no longer tied to either the Django CLI or the database and can be spun off as essentially a separate microservice on another machine.

[Check out the Ejabberd Auth Script &#8594;][gist]

[ac]: https://adventurerscodex.com
[xmpp]: /archive/adventurers-codex-xmpp/
[auth]: https://docs.ejabberd.im/admin/configuration/#external-script
[gist]: https://gist.github.com/Sonictherocketman/aefd78575280978af0562a0b9841a903
