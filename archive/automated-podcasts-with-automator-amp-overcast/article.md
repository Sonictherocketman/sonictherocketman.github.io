slug: automated-podcasts-with-automator-amp-overcast
published: Tue, 24 Aug 2021 at 08:59 PM
updated: Sun, 06 Nov 2022 05:02:17 
title: Automated Podcasts with Automator &amp; Overcast
author: Brian Schrader
tags: blogging, programming
status: publish

I've [mentioned before][1] that I use Siri as an editing tool. I write a piece, lightly edit it, and then have Siri read it back to me. This helps me catch unintended grammatical errors and clumsy sentences. Building on that principle, [Pine.blog][2] and [Hewell][3] both ship with a feature that use iOS's `AVSpeechSynthesizer` API to read articles or location information aloud.

That said, I often find articles that I want to read, but after a long day staring at a computer screen, I don't want to actually *read* them. Lots of sites these days provide spoken audio for their articles&mdash;which is great&mdash;but the vast majority don't.

That's where Automator comes in.

<img
    alt="Save Spoken Text to File"
    src="/images/blog/automator-spoken-text.png"
    style="width:500px; height:381.5px;"
    class="image-center"
/>

This Automator service simply runs a bash script that takes the contents of the selected text as input, feeds it to the built-in macOS `say` command, and outputs it to a file on the Desktop named using the contents in my clipboard.

<details>
  <summary>Check out the full script</summary>
<pre><code>cd ~/Desktop;
# A hack to get stdin into say through Automator. For some
# reason simply saying -f didn't work for me.
while read line; do echo "$line" done < "${1:-/dev/stdin}" |
    say -o .spoken_text -f -

TITLE="$(pbpaste -Prefer txt)"
if [ -z "$TITLE" ]; then
	TITLE="Spoken Text"
fi
# Sanitize the article title. Writers love colons which macOS hates
TITLE="$(echo "$TITLE" | sed -e 's/[^A-Za-z0-9._-]/_/g')"

# Conver the audio and be quiet about it
/usr/local/bin/ffmpeg -i .spoken_text.aiff -loglevel -8 -y "$TITLE.aac"
rm .spoken_text.aiff</code></pre>
</details>

The script also uses FFmpeg to convert the audio to an AAC file so that I can then upload it to [Overcast][4], my preferred podcast player.

By default, macOS will include Automater services in the right-click menu, but I've also bound the script to `Cmd+Ctl+Shift+S` (which is similar to my existing `Cmd+Ctl+S` shortcut for reading the selected text aloud).

<img
    alt="The macOS Services Menu"
    src="/images/blog/services-menu-speak.png"
    style="width:321px; height:230px"
    class="image-center"
/>

Now, I can discover new articles to read, perform a quick set of keystrokes, upload the audio to Overcast, and then go for a walk while I catch up on the day's interesting news!<sup>1</sup>

I've provided the Automator service as a zip archive below if anyone wants to play with it.

[⬇️ Save Spoken Text to File.workflow](/dropzone/Save Spoken Text to File.zip)

<hr />
<div class="footnote">
    <p><sup>1.</sup>&nbsp;There are a few quirks to this workflow still. Websites are filled with non-article content, so to avoid selecting those, I typically following the following steps:
    </p>
    <ol>
        <li>Turn on reader mode (<code>Cmd+Shift+R</code>)</li>
        <li>Copy the title of the article to the clipboard (<code>Cmd+C</code>)</li>
        <li>Select the article text (<code>Cmd+A</code>)</li>
        <li>Run my Automator service (<code>Cmd+Ctl+Shift+S</code>)</li>
        <li>Upload the new AAC file to Overcast</li>
    </ol>
    <p>I admit, it's a little cumbersome, but it does work really well.</p>
</div>


[1]: /archive/siri-is-a-blogging-tool/
[2]: https://pine.blog
[3]: https://hewellapp.com
[4]: https://overcast.fm
