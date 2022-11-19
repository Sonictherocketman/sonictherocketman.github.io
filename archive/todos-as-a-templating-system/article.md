slug: todos-as-a-templating-system
published: Mon, 31 Jul 2017 at 03:24 PM
updated: Sat, 19 Nov 2022 23:42:08 
title: TODOs as a Templating System
author: Brian Schrader
tags: software development, programming, thought technology
status: publish

When I sit down to start a new feature or project the blank page or empty function can be extremely intimidating; a void of infinite complexity. I'm sure lots of developers do this, and maybe most don't realize it, but I've found that `TODO` comments are super useful in helping to abstract away nitpicky details and focus on the overall purpose of the code as I'm writing it. Let's say that we want to validate some parameters from an HTTP request and kick off a background task to send an email to a list of requested users. First off, we need to handle the request and kick off the task, but there's a bunch of validation and database queries we need to make before we can do that, and we haven't even written the task function yet, that's where `TODOs` come in.

    class MassEmailView(APIView)
        # TODO: check if user has permission to send mass mail
        def post(self, request):
            # TODO: Get users from the request
            users = []
            for user in users:
                # TODO: send the message
                pass
            return Response(None, status=200)

Right off the bat I know that I need to get a list of users and do something with each of them. In a lot of ways I'm basically writing pseudo-code and slowly filling in the blanks with real code. Next, let's say we write the background task.

    # ---- tasks.py ----
    @shared_task
    def send_email(user, subject, message_text):
        email.send(user.email, subject, text=message_text)

    # ---- views.py ----
    class MassEmailView(APIView)
        # TODO: check if user has permission to mass send mail
        def post(self, request):
            # TODO: Get users, subject, and text from the request
            users = []
            subject = ''
            text = ''
            for user in users:
                tasks.send_email.delay(user, subject, text)
            return Response(None, status=200)

Slowly the code is coming together. I've written the background task and updated my view. The basic structure is there, but I haven't done the work of parsing the request or any error handling, so let's move on to that.

    # ---- tasks.py ----
    @shared_task
    def send_email(user, subject, message_text):
        email.send(user.email, subject, text=message_text)

    # ---- views.py ----
    class MassEmailView(APIView)
        @authentication_classes((SessionAuthetication,))
        @permission_classes((IsAdmin,))
        def post(self, request):
            try:
                users = [
                    User.objects.get(username=username)
                    for username in request.POST['users'].split(',')
                ]
            except ObjectDoesNotExist:
                return Response(INVALID_USER_RESPONSE, status=400)

            subject = request.POST['message_text']
            text = request.POST['message_text']
            for user in users:
                tasks.send_email.delay(user, subject, text)
            return Response(None, status=200)

Now that we're done, it's clear that the `TODO` comments were hiding quite a bit of complexity, but the overall structure is the same. Just because our code is read by the computer from top to bottom doesn't mean we have to write it that way. Sometimes it helps to start with a rough outline of the whole picture, and slowly color it in bit by bit.

<link rel="stylesheet" href="https://yandex.st/highlightjs/8.0/styles/default.min.css">
<script src="https://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

