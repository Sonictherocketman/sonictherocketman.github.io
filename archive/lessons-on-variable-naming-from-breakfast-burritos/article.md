slug: lessons-on-variable-naming-from-breakfast-burritos
published: Sat, 17 Apr 2021 at 01:19 AM
updated: Thu, 05 Feb 2026 23:53:22 
title: Lessons on Variable Naming from Breakfast Burritos
author: Brian Schrader
tags: programming, software development, fun
status: publish

This morning I ordered a breakfast burrito from a local taco shop. Normally this would not be news and obviously would not warrant a blog post or any in-depth analysis, but it was early and I hadn't yet had coffee, so my mind was loose and my thoughts wandering. As I looked over the menu, I pondered the two vegetarian breakfast burrito options:

- **Mushroom burrito** filled with mushrooms, potatoes, eggs, and cheese
- **Potato burrito** filled with potatoes, eggs, beans, and cheese

At the counter I asked for the potato breakfast burrito, and I intended to order the latter of the two, but it occurred to me that they both contained potatoes and therefor my order was ambiguous. What after all makes a burrito with potatoes, eggs cheese, and mushrooms deserve a different name than a burrito with potatoes, beans, eggs, and cheese? What makes the latter not a bean breakfast burrito, as the beans are the item that is unique to the latter burrito whereas potatoes are common to both? Are potatoes a more significant ingredient? If so, why?

I received my order&mdash;which was correct by the way&mdash;and went home, but as I walked I wondered, how is it that the cashier and I understood each other? There was so much ambiguity in the names of those menu items. How were we able to make sense of the obvious ambiguity?


## Naming is **Really** Hard

If you haven't seen the connection by now, let me drop the pretext. These same questions also relate to how we choose to name our variables and our functions in code. Naming after all is hard, and I think my burrito example helps explain why.

> It is often said that the three hardest problems in computer science are naming and off-by-one errors.

In a more rigorous naming system, I assume that most people would come to the conclusion that the second burrito is probably mis-named. It should be called the "bean breakfast burrito" since, as I mentioned, the beans are the distinct ingredient that make the latter burrito not strictly a subset of the former.

That said, beans are not normally considered a main ingredient in a burrito. In the conventional burrito naming scheme, more appealing or distinct ingredients, or ingredients not considered to be condiments, take precedence. This naming scheme is the reason why a burrito with carne asada, pico de gallo, and guacamole would be simply called a carne asada burrito and not a guacamole burrito.

These same conventions exist when we name variables and functions. We can imagine a scenario where we have a list of users and need to filter out which users have recently logged in and which among those have active subscriptions to our service.


    def get_active_subscribed_users():
        all_users = get_all_users()
        active_users = (user for user in all_users if user.is_active)
        <variable> = (user for user in active_users if user.has_active_subscription)


The first two variable names are fairly obvious, the question becomes: what do we name the third variable so that it is not ambiguous? We could of course call this new variable `active_users_with_active_subscriptions`, but to many that would be too long, and to my eyes that makes it seem that this variable contains a list of `(user, subscription)` pairs.

We could name the value `active_users`, `actively_subscribed_users`, or even just `relevant_users` if the criteria for what relevancy means is clear enough in context. Some developers prefer to simply refer to these as `users` but I find that incredibly confusing. Others may prefer to define the variable `users` and then redefine it as they filter down the list to suit their needs, which I find even more confusing and unclear.

In practice I tend to prefer the third option along with a comment explaining what I mean by "relevant". This only exacerbates our problems though. If two groups of "relevant" users meet in a new context, their names would clash and we would need to find new names for these groups.

The context is here is key. If we instead fetched the same list from another function call, we could drop the qualifier entirely.


    def get_active_subscribed_users():
        users = get_active_users()
        # We can avoid the question entirely if we simply return the list here.
        return (user for user in users if user.has_active_subscription)


## Names are a Leaky Abstraction

As with our breakfast burritos, we could simply default to the names being a list of the components, but that can become overly burdensome very quickly. Our potato burrito would be unceremoniously called the "potato, eggs, bean and cheese breakfast burrito", which is unambiguous but also cumbersome. It can also cause problems as forgetting to mention a single component could confuse the reader and lead them to believe that a reference to a potato, egg, and bean burrito was not the same as your potato, egg, bean, and cheese burrito even if you were both referring to the same thing.

As programmers we aren't taxed by the character; we can have longer variable names, but at best those names should be descriptive, succinct, and distinct. Issues arise when names, by their nature, don't convey the whole story. Names almost always convey a summary of their true meaning. They can't effectively convey the context in which the name was given or the inherent value of the named thing. Out of context a name might be confusing, but that confusion may vanish when used in the appropriate context.

Likewise, in some contexts a potato breakfast burrito is the same thing as a mushroom burrito, but today it wasn't.
