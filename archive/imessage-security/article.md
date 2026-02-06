slug: imessage-security
published: Sun, 24 Apr 2016 at 10:29 AM
updated: Fri, 06 Feb 2026 00:29:27 
title: iMessage Security
author: Brian Schrader
tags: imessage, apple, security
status: publish

For a recent post, Rich Mogull talked with Apple about iMessage and security. I
always love to hear about cool engineering designs, and iMessage is
full them. 

> Here’s a simplified overview of how iMessage security works:

> - Each device tied to your iCloud account generates its own public/private key
pair, and sends the public key to an Apple directory server. The private key
never leaves the device, and is protected by the device’s Data Protection
encryption scheme (the one getting all the attention lately).
> - When you send an iMessage, your device checks Apple’s directory server for the public keys of all the recipients (across all their devices) based on their
Apple ID (iCloud user ID) and phone number.
> - Your phone encrypts a copy of the message to each recipient device, using its
public key. I currently have five or six devices tied to my iCloud account,
which means if you send me a message, your phone actually creates five or six
copies, each encrypted with the public key for one device.
> - For you non-security readers, a public/private keypair means that if you
encrypt something with the public key, it can only be decrypted with the
private key (and vice-versa). I never share my private key, so I can make my
public key… very public. Then people can encrypt things which only I can read
using my public key, knowing nobody else has my private keys.
> - Apple’s Push Notification Service (APN) then sends each message to its
destination device.
> - If you have multiple devices, you also encrypt and send copies to all your own devices, so each shows what you sent in the thread.

[How iMessage distributes security to block “phantom devices”
&#8594;](https://securosis.com/blog/how-imessage-distributes-security-to-block-phantom-devices)
