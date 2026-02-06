slug: a-vision-of-the-open-web
published: Tue, 08 Mar 2016 at 09:31 AM
updated: Fri, 06 Feb 2026 00:10:34 
title: A Vision of the Open Web
author: Brian Schrader
tags: open web, technology, essay
status: publish
featured: false

> **The Open Web**: (N) A term used by tech nerds and developers whenever a large corporation shuts off their public API.

The term *[Open Web][w]* has so many definitions, and applies to so many situations that it can be difficult to pin down what people often mean when they use the term. To some it means open access to data, to others it means free, and unregulated communication, and still to others it means an end to licensed content and even ownership on the web. With so many meanings, it can be difficult to even use the term in conversation for fear of people misunderstanding your intent, and to me, as with many, the term has a different meaning depending on the situation or technology being discussed. That is why I'd like to take some time out to explain my vision for the Open Web, specifically when it comes to social media.

[w]: https://en.wikipedia.org/wiki/Open_Web


## What we have

Social networks are a stream of information, and we already have technologies that exist and excel at conveying this kind of data. RSS, Email, and IRC are fantastic tools that are useful for building open and performant social networks. Most of the issues with these existing technologies are their public perceptions. Email sounds like work, and RSS is for nerds who follow tech blogs. The issue with all of these technologies is that they were [never properly abstracted from their underlying protocol][irc]. The Email protocol doesn't require that messages be formal, we just have the cultural expectation that this is the case.

<div class="image-container" style="width:300px;">
<img src="https://brianschrader.com/images/blog/reeder.jpg" alt="A screenshot of Reeder for iOS" />
<small>How can we make this more than just a feed <i>reader</i>?</small></div>

New, emerging, and standardized tools like [WebMentions][wm], from the [IndieWebCamp][iwc], will allow us to build most of the features provided by a centralized social network in a decentralized way. The best part is that all of these technologies are battle-hardened, and scalable to immense sizes; Email doesn't have the scaling issues like Twitter does because it was designed to be large-scale, and RSS scales fairly easily as well. Each of these technologies have their own dark pasts riddled with spam and invalid markup, but beyond these downsides lie incredible potential. The design of the Open Web is more akin to HTTP than Facebook. It should be thought of as a standard to follow at our benefit, and abandoned at our peril.

[wm]: https://www.w3.org/TR/webmention/
[tw]: //brianschrader.com/archive/breaking-up-is-hard-to-do/
[adn]: http://app.net
[irc]: https://twitter.com/sonicrocketman/status/676526749757214720


## Putting the pieces together

Services like [Manton Reeces'][mr] [Snippets.today][snip] are working to bring the concept of Twitter-like timelines to microblogs, and make it easier to start a microblog in an open way. [WebMentions][wm] would allow for cross-platform replies in real-time. Another service could easily interact with Manton's and give users a plethora of apps to choose from. Manton's service has an API for developers, but anyone could extend or interact with his service just via the RSS feed for each microblog.

RSS feeds are extremely powerful, and they already possess standard support for things like [profile pictures][img], comments threads, and [new post notification subscriptions][cloud]. I propose using the channel `<image>` tag of the RSS feed as the user's profile image (preferably a [Gravatar URL][gr]). This way, a user's profile pictures are independent of the microblogging service they use. I imagine that microblog RSS feeds will be person-centric rather than site-centric. The feed's `<title>` should be the person's name, not the service's, and the `<image>` should be their image. Hashtags are here to stay, put them in the RSS item's `<category>` fields. Services implementing this new feature-set should be on the lookout for replies coming from WebMentions, and a specific WebMentions URL should be present in the feeds for alerting a user of a reply and services should show these replies to the user.

If a given social network focuses more on private communication, then building it on top of the Email standard might be more apt. Remove the subject field in your client (you can even use it for your own tagging purposes if you need). Structure the email's UI more like a chat or threaded comment system. Group chat is built in to email so there's nothing you need to do. Stick [MailRoute][mail] in front of your service to filter spam, and err on the side of caution when showing the user a message from some "rando" they don't follow. Hide the emails of the users and just show their Gravatar profile images and usernames. Email is designed for decentralized messaging, use that to your advantage. Allow users to chat with anyone, including rival email-based messaging services (but don't make it like conventional email). Most of Facebook could easily be built using this kind of system.

<div class="image-container" style="width:350px;">
<img src="https://brianschrader.com/images/blog/textual.jp2" alt="Textual IRC app" />
<small>Textual is, by far, the nicest looking IRC app out there, but it still looks like IRC.</small></div>

If your network is more like Slack or HipChat, then IRC is what you want. Once again, err on the side of caution when showing chats from unidentified users, encrypt your messages, keep and sync the user's messages between devices, try sending HTML instead of plaintext, and make the UI more like Facebook Messenger or WhatsApp. Anyone can talk to anyone on any IRC service, it's our job as Application developers to make it look and feel good to use.

[am]: https://9to5mac.files.wordpress.com/2014/09/ios-8-continuity-sms.png
[snip]: http://snippets.today/
[mr]: http://www.manton.org
[iwc]: http://indiewebcamp.com
[img]: http://cyber.law.harvard.edu/rss/rss.html#ltimagegtSubelementOfLtchannelgt
[cloud]: http://cyber.law.harvard.edu/rss/rss.html#ltcloudgtSubelementOfLtchannelgt
[gr]: http://sonicrocketman.snippets.xyz/2016/02/23/f2c3.html
[mail]: http://mailroute.net


## Ecosystem, ecosystem, ecosystem

The thing that made Twitter worth using was it's variety of 3rd-party clients. [Tweetbot][tb], and [Twitteriffic][tc] are some of the best designed, and most powerful apps I've ever used. To me, they *are* Twitter. Having great alternative clients for their service was one of the things that made Twitter popular, and a good ecosystem of applications for a given service is a must for open technologies.

<div class="image-container" style="width:300px;">
<img src="https://brianschrader.com/images/blog/tweetbot.jpg" alt="Tweetbot" />
<small>There's no reason we can't have awesome apps like Tweetbot for the Open Web.</small></div>

Manton's Snippets.today service is great for following people you care about, but currently it is lacking when users want to search for people to follow, or discover trending topics. Having an open service that provides a directory of blog and microblog feeds, trending topics, featured users, and an open API to access it all would allow microblog services to focus more on their core competency, but still provide advanced functionality through these other services. It's these kinds of related apps, which all embrace the concept of the Open Web, that will give the ecosystem the broad functionality of centralized systems but still allow users to move about between clients or services as they need.

[tb]: http://tapbots.com/tweetbot/
[tc]: http://twitterrific.com/ios


## What's next

At time of writing, there are a few large corporations that control social media in the U.S. and a few more world-wide. Corporations exist to make money and that's fine, but free<sup>[1](#1)</sup>, open, and dependable communication shouldn't be dependent on something as short-lived, and temperamental as a Silicon Valley start-up. At their core, social networks like Facebook and [Twitter are communications services][cs], and the purpose they serve has become too important to be in the hands of a few publicly-traded companies.

If any of this sounds weird, crazy, or impossible then I have a surprise for you: we've already got a system that works like this. Podcasts are an open format, based on RSS<sup>[2](#2)</sup>, with a great ecosystem of clients and content. The iTunes directory provides a downloadable index for clients to base their search results on, and implement subscribing from within the individual clients. Podcasts are perhaps the perfect example of how we've already accomplished our goal of making an open social network in spite of corporate influence. [No one owns podcasting][ma]; some have tried, but it remains a decentralized, and, better yet, growing ecosystem.<sup>[3](#3)</sup> Services like Facebook, Instagram, YouTube, and Twitter are just good-looking wrappers over what is essentially an RSS feed, and Slack is just IRC with a nicer UI and less spam. We have standard implementations of all of these services, we just aren't using them.

I've long heard people say that we've lost video, music, and messaging to the walled worlds of YouTube, iTunes, and WhatsApp/Facebook/Twitter respectively, and while I believe that is the current state of the web, I don't believe it's the end-state. As the pendulum of open-closed online communication reaches it's peak in the near future, it will start to swing the other way. User growth for services like Facebook and Twitter is slowing down, and Twitter especially is desperate to hold on to it's user-base. Now is the time to begin wrestling users from the closed grip of these systems and to build the kinds of services that are only possible on the Open Web.

[ma]: http://www.marco.org
[cs]: http://globalspin.com/2014/09/communication-news-entertainment/

---

<small><sup id="1">1</sup>As in freedom, not price.</small>

<small><sup id="2">2</sup>Podcasts use a modified version of RSS with added tags for things like audio file location and genre info. There's no reason we couldn't [extend RSS in a similar way for Microblogs][mystuff]</small>

<small><sup id="3">3</sup>Apps like [Hop for iOS][hop] already do something like this. Hop is an email client that structures messages like I described. </small>

[hop]: https://itunes.apple.com/us/app/hop-email-messenger/id707452888?mt=8
[mystuff]: https://brianschrader.com/archive/the-open-microblog-standard/
