slug: what-if-bookclub-but-with-ai
published: Wed, 04 Jun 2025 at 06:00 AM
updated: Fri, 06 Feb 2026 00:29:29 
title: What if: Bookclub, but AI?
notitlecaps:false
status: publish
author: Brian Schrader
hero: /images/blog/purple-cloud.jpg
tags: programming,ai

A while back I had a free evening and a silly idea, and what resulted was an interesting exploration of the large-context behavior and analytical capabilities of modern LLMs (ChatGPT in my case). The idea was very simple:

> What would happen if ChatGPT hosted a bookclub with itself?

Now, this is&mdash;of course&mdash;a very serious question with very serious implications for the trajectory of modern technology, so I set out on a quest to answer mankind's greatest curiosity.

A few hours later, [I had my answer][1], so let's go over it, shall we?


## The Why

There has long been a common notion in the Discourse that&mdash;since LLMs are trained on public internet data and since that data is increasingly polluted with AI spam content&mdash;the general quality of AI-generated results would degrade over time.

As well it's widely known that even the most top-quality LLMs today generally return banal, shallow, and overly friendly responses, even when prompted not to (in some cases because of explicit training to do so), and I was curious to see what would happen if GPT was given the opportunity to converse, long-form, over time with a disparate group of minds. I was interested to see if GPT would overcome its preference for lackluster observations when summarizing text and genuinely discover something novel. To do this, I knew I couldn't simply ask it questions about a given text in its training set, I would need to instruct it to conduct an elaborate play of personalities, each of whom would read and summarize the text in their own way.


## Getting it Together

The code itself isn't very exciting. I cobbled together a little Python script that would take in a set of personality files for each of my several bookclub participants and then randomly choose between them for who was going to speak next. To keep things consistent, the script would keep a log of the dialogue as it went and submit that with each request.

As I played with the script, I made two changes, each of which significantly improved the conversation. First, I made it so that each participant would be primed by feeding ChatGPT the given personality and the chapter text, and then I asked GPT to summarize the chapter in the perspective of the given person. That summary would then be added to the given person's `mind-state`. Second, I added a bias in the random choice of speaker that preferred any names mentioned in the prior response&mdash;GPT often referred to other characters by name and it would be natural for that person to respond directly.

Both of these changes inspired several additional ideas for future improvements, but we'll get to that in a minute. For now, let's see what happened when the script did its thing.


## Ready, Set, Bookclub!

<div class="image-right" style="max-width: 300px;">
<img alt="The Cover of the Book assigned for that week's session: The Purple Cloud" src="/images/blog/purple-cloud.jpg" style="max-width: 100%">
</div>

The book I had originally lined up for this was <q>Pride and Prejudice</q> as it's [easily available][2] in the public domain. However that choice proved useless as ChatGPT knew too much about the book from its training set. I needed something it had rarely encountered before so that I could test its observational prowess.

Hence I chose a book I read a few years back: <q>The Purple Cloud</q>, by M.P. Shiel.

All that was left was to craft a series of personalities to enact my little play, and so I set to crafting some backstories and, like a director: I set the scene.

<details>
  <summary>ChatGPT's Scene Instructions &amp; Motivation</summary>
<img alt="GPT receiving character motivations before the show" src="/images/blog/gpt-scene-directions.png">
<p>
    I workshopped these quite a bit, but I know there's more to do. Obviously I could have tried custom assistants, but that is discussed more below.
</p>
</details>

At first, I was pleasantly surprised. Each of GPT's personas invented motivations and expanded on their backstories, and GPT never seemed confused about who was talking and easily tracked the flow of the conversation. Characters routinely invented novel conversation topics and helped to slowly invent the character of the world around them.

However it didn't take long before things went awry.

On several attempts, one of my characters would pour wine for the group (a kind enough gesture), and the group would all toast and thank each other for coming out for the evening. However, it seems no where in GPT's training data does it contain any reference to narrative pacing or what to do in order to *finish* a toast, and so the conversation would inanely continue on and on as each character added more to the toast, and never once did any of them decide to actually drink. 🥂

<div class="image-container-center">
<img class="image-center" alt="A screenshot of the output of the script." src="/images/blog/bookclub-log.png" />
</div>

In future attempts, I intend to add another personality to act as a sort of *stage direction* bot, whose only job is to add occasional scene changes that the characters would be assumed to observe. This, hopefully, would alleviate this issue and help to avoid the next one:

Once GPT established a scene, it never changed or evolved. This was surprising as over time all sorts of conversational details were being added to the chat: discussions of the book chapter, character moments, and backstory were ripe for use, but the conversations only ever got duller as they went on. Soon characters were agreeing to visit a consistently invented, newly-opened, vegan cafe with apparently fantastic croissants, but as the small talk progressed characters would endlessly revisit topics, gush pointlessly, and never add anything novel of value.

And that leads me to my most interesting observation: the conversation always died without any insight into or worthwhile analysis of the book chapter provided. Sure, characters would discuss the most superficial of elements and it was all incredibly mundane. Discussion was largely focused on the sense of foreboding mood found in the chapter or on the director's stage direction for some of the characters to be put off by the often unwieldy prose. For all it's might, GPT couldn't even be bothered to bring up specifics of the main character's arctic expedition, comment on any specific character's motivations or plot drama, or even try to predict the ending.

<div class="image-container-center">
<img class="image-center" alt="A screenshot of the output of the script." src="/images/blog/gpt-conversation-quality.png" style="border-radius: 5px; max-width: 100%; padding: 0;" />
<small><center>Overall (perceived) conversational quality.</center></small>
</div>

And invariably, one of my characters would ask when the eponymous Purple Cloud would appear, to which another would reply that it "sounded ominous". GPT it seems is about as good at analyzing novel text as a high-schooler who only read the back-of-the-book blurb (read: myself in high-school).


## What Does It All Mean?

In general, I was less-than-impressed with GPT's abilities in this task. As I mentioned before, it quickly became apparent that GPT could spout off vapid insights regarding the text of <q>Pride and Prejudice</q> even without the chapter text (I had a bug originally that prevented the text from being included in the chat log, but nevertheless GPT knew about the plot and characters), however with a less-familiar text it proved much less insightful than I expected.

In general, I'm not sure what to make of this little experiment. I'm more certain that I'd like to try it all again with several specific, technical improvements that will hopefully address some of the limitations I encountered.


## Bookclub 2.0

While I haven't gotten around to implementing any of these yet, here's the list of features I came up with to improve the process:

*Use Stage Direction:* As I said, one of the chief limitations of this process was the fact that the scene itself never evolved. That meant that after each character had explored their backstory and current setting, there was no where to go and so they babbled on incessantly about nothing. Adding another agent whose primary job is to insert novel change would hopefully disturb the equilibrium and allow for new insights.

> A dump truck drives by and outside a dog barks.

*Improve each Character's Mental Model:* Here I'd hope to track not only the character dialogue but improve on the priming process I mentioned before by asking (at every step) what each character *thinks* about the current situation and allow their own mental state to evolve beyond what is present in the spoken dialogue. Currently it's not possible for characters to have separate internal and external states which also likely flattens their complexity. As well I'd hope to include much more detail in each character's backstory and education including other materials they found interesting or recently encountered.

*Consider Different LLMs:* One critical limitation of this approach is that it only uses one LLM and therefore is biased toward one set of training data and methods. Perhaps if a given character were assigned a different LLM that could help matters. There's bound to be implicit baises in each model that could affect the conversational tone (and who knows! perhaps then it would be possible to have a jerk participate in the conversation).

In addition to these two improvements, I'd hope to investigate some technical changes as well. The sheer volume of tokens being submitted (including the entire chapter text and dialogue history) means that the project quickly racked up a tab. However in order to have richer character personas I'd likely need to investigate training custom assistants rather than feeding it all through the chat log API.

Anyways that's it. I don't really have a through-line for this post. I just tried a thing and thought it was worth sharing. If you have suggestions or feedback, please file an issue or shoot me an email. The project is up [on GitHub][1] if you want to play with it yourself.

[1]: https://github.com/Sonictherocketman/bookclub/
[2]: https://www.gutenberg.org/files/1342/1342-h/1342-h.htm
