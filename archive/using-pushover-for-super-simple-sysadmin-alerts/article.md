slug: using-pushover-for-super-simple-sysadmin-alerts
published: Wed, 27 Apr 2022 at 11:36 PM
updated: Wed, 13 Nov 2024 01:34:34 
title: Using Pushover for Super Simple SysAdmin Alerts
author: Brian Schrader
tags: programming,software development
status: publish

For those who don't know, [Pushover][1] is a really great tool that allows users to easily set up and send push notifications to a smartphone. The setup is super simple, and all you need is their app and a little scripting know-how.

I've used Pushover for years to help me monitor my apps and services, and over the years my uses for Pushover have evolved and grown more and more integral to my ability to keep track of the various apps I run. To me, Pushover has gone from a nice-to-have integration to an absolute necessity.

I use Pushover to alert me of all kinds of things. Just to give you an idea, here are a few examples of some of the things I currently use Pushover for:

- Potential queue backups in [Pine.blog](https://pine.blog)
- Reporting daily user signups for [Nine9s](https://nine9s.cloud)
- Alerts when critical background jobs fail
- Alerts when nightly builds fail to deploy
- Alerts when a manually-run, long-running job completes

Because Pushover is so easy to integrate with basically any codebase (and even one-off shell scripts) I use it all the time for everything from simple alerts to complex and critical reports.

One particular use I'd like to call out from that list above is the nightly build alerts. [Adventurer's Codex][2] has a test environment that we use to sanity check our code before a full deploy. We used to have the test environment redeploy after every single merged pull request, but that system proved incredibly fickle and error prone, so we switched to a simple nightly build. The issue with any automatic build system is that unless you have a detailed live dashboard of deployment statuses (which we do not) it's hard to know if/when a given build has finished deploying or if it encountered an error. That's where Pushover comes in.

<details><summary>Nightly Build and Deploy Script</summary>
<hr />
<p>This script runs as a cron job every night. It attempts to deploy the latest version of the application and if that fails it sends a notification to Pushover.</p>
<code><pre>PUSHOVER_USER="xxxx"
PUSHOVER_KEY="xxx"
PUSHOVER_URL="https://api.pushover.net/1/messages.json"

TITLE="AC Nightly: Build Failed to Deploy"
MESSAGE="The latest build on Nightly has failed."

log() {
  echo "[$(date)] $@";
}

alert_admins() {
  curl -X POST $PUSHOVER_URL \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"$TITLE\", \"message\": \"$MESSAGE\", \
        \"user\": \"$PUSHOVER_USER\", \"token\": \"$PUSHOVER_KEY\"}"
}

./docker-bootstrap.sh upgrade --env nightly
STATUS=$?

if [ $STATUS -eq 0 ]; then
  log "🚀 Build completed successfully!"
else
  log "Uh oh. There was an issue. Alert the admins!"
  alert_admins
fi</pre></code>
</details>

My nightly build script for Adventurer's Codex includes a section after the deployment has completed that checkes the status code of the deploy command and if it is not 0 (i.e. it failed) then it sends me a notification. Bam! Now, every morning that I don't get a notification, I know things are working as intended. If I ever wake up to a notification, then I know I have work to do.


### What Happens in the Background is Ignored in the Background

Crucially, I use Pushover to alert me about problems with background tasks. Modern web apps include lots of always-running or periodic asynchronous behavior, and because &mdash; when they fail &mdash; they don't directly result in user feedback or a big, loud error page mistakes, bottlenecks, and bugs often go unnoticed or unaccounted for.

Pushover solves those issues. It's trivial to write code that checks for bad behavior or that catches difficult-to-reach-but-critical bugs and just send off a notification.

I used to use email for this sort of thing, and while email is still a good solution, the setup is actually more involved. Most VPSs aren't allowed to send emails directly anymore (due to concerns over spam) and configuring an email provider is just as much work if not slightly more work than using Pushover. In some cases email is more flexible and might be better for larger teams, but I almost always reach for Pushover these days instead of email.

It's just that good.

[1]: https://pushover.net
[2]: https://adventurerscodex.com
