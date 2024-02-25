slug: automate-the-boring-stuff-with-chatgpt
published: Thu, 16 Feb 2023 at 10:49 PM
updated: Sun, 25 Feb 2024 22:33:21 
title: Automate the Boring Stuff with ChatGPT
author: Brian Schrader
tags: programming,software
status: publish
notitlecaps: true

There's been a lot of buzz around ChatGPT lately and most recently the discussion followed [Tom Scott's video][1] in which he describes how he was able to use ChatGPT to generate working code to solve a problem&mdash;including asking it to fix several bugs with its own implementation&mdash;and then write an ad spot for him.

In the video Tom expresses his disquiet with the ongoing advances in machine learning and goes so far as to predict that "everything is about to change" in the same way "everything changed" once smartphones came along in the mid-aughts.

I've enjoyed using text-to-image AIs like [Midjourney][3] for a while now, but I'd largely stayed clear of things like ChatGPT. Tom's video though got me curious, and so I logged on to see what all the fuss was about.

tl;dr I was pleasantly surprised.


### Introducing DeveloperGPT

There are so many things that developers do day-to-day that are at the same time important and dreadfully dull, and like many devs I find myself searching for ways to both save time and automate away as much menial work as I can. It's one of the [reasons I love Bash so much][4]. And while at some companies such work is often pawned off to junior developers in need of experience, as a one-man shop I have definite use for a sort of algorithmic junior developer who could take on some of that less-engaging work. And after watching Tom's video I started to hope that perhaps ChatGPT could be exactly that.

In order to see if ChatGPT could fill this role, I did what anyone looking to hire a junior developer would do: I gave it an interview.


### Giving ChatGPT a Coding Interview

In total I gave ChatGPT five questions to answer. These questions were almost entirely development related and spanned the range of what I'd expect a junior developer to be able to do given time and access to the internet.


<details><summary>Test 1: Django Unit Tests: ✅</summary>

<h5>Prompt</h5>
<p>write for me 4 python django unit test cases that each make a request to /api/users to do the following: create a user record, fetch a user record, delete a user record, and update a user record. Make sure to include partial update using the PATCH method. And be sure to use Python 3.10 compatible code.</p>

<h5>Response</h5>
<p>Sure, here are 4 Python Django unit test cases that cover the create, fetch, delete, and update functionality of the /api/users endpoint. These test cases assume that you have a Django application with a User model and a corresponding API viewset that handles CRUD operations for users.</p>

<code class="python"><pre>
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User

class UserTests(APITestCase):
    def test_create_user(self):
        """
        Ensure we can create a new user object.
        """
        url = reverse('user-list')
        data = {'username': 'testuser', 'email': 'test@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

        # ... (mine: omitted for brevity) ...</pre></code>

<a href="https://gist.github.com/Sonictherocketman/dd7c06c3792a55cba420324bab365b19">Complete Generated Source Code&#8594;</a>

<p>These test cases cover the basic functionality of the /api/users endpoint and ensure that users can be created, fetched, updated, and deleted. They also cover partial updates using the PATCH method. Note that you will need to update the URLs used in the reverse() function to match the actual URLs for your application.</p>
</details>

The first test I gave ChatGPT was simply to write a suite of unit tests to verify that a Django User REST API allowed for standard CRUD operations. In general it did very well, even including a test for partial updates via the PATCH method, but it did assume I also wanted it to use Django REST Framework and its implementation of the PUT and POST tests don't include all the correct values. The assumption to use DRF is a fair one, but the other mistake is a red flag.

Still though it would have saved me from writing the bulk of the code&mdash;assuming it works. I didn't actually test the code.


<details><summary>Test 2: S3 File Clean Up: ✅</summary>

<h5>Prompt</h5>
<p>write for me a python function that pulls data from a CSV file containing files that need to be deleted from S3 and that then deletes each file. Include error handling if a file cannot be deleted and return a list of all files that were and were not deleted. Also include suite of three test cases that ensure the function works, that errors are caught, and that the return value is two lists.
</p>

<h5>Response</h5>
<p>As an AI language model, I don't have the capability to access files from your computer. However, I can provide you with a sample code that demonstrates how to delete files from S3 using the Boto3 library in Python.</p>

<code class="python"><pre>
    import boto3
    import csv

    def delete_files_from_s3(file_path):
        # Initialize S3 client
        s3 = boto3.client('s3')

        # Read the CSV file containing file names
        with open(file_path, 'r') as f:
            reader = csv.reader(f)
            files = list(reader)

        # Delete each file from S3
        deleted_files = []
        failed_files = []
        for file in files:
            try:
                s3.delete_object(Bucket='your-bucket-name', Key=file[0])
                deleted_files.append(file[0])
            except Exception as e:
                failed_files.append(file[0])
                print(f"Failed to delete {file[0]}: {e}")

        # Return the list of deleted and failed files
        return deleted_files, failed_files
</pre></code>

<p>The function takes the path of the CSV file containing file names as input. It reads the file using the csv module and deletes each file from S3 using the delete_object method of the Boto3 client. If a file cannot be deleted, it is added to the list of failed files and an error message is printed. The function returns two lists, one containing the names of deleted files and the other containing the names of failed files.</p>

<p>Here are three test cases to ensure that the function works correctly:</p>

<code class="python"><pre>
    # Test case 1: All files are deleted successfully
    deleted_files, failed_files = delete_files_from_s3('file_list.csv')
    assert len(deleted_files) == 5
    assert len(failed_files) == 0

    # Test case 2: Some files cannot be deleted
    deleted_files, failed_files = delete_files_from_s3('file_list_with_errors.csv')
    assert len(deleted_files) == 3
    assert len(failed_files) == 2

    # Test case 3: CSV file does not exist
    deleted_files, failed_files = delete_files_from_s3('nonexistent_file.csv')
    assert len(deleted_files) == 0
    assert len(failed_files) == 0</pre></code>

<p>In the first test case, all files are deleted successfully and the function should return a list of 5 deleted files and an empty list of failed files. In the second test case, some files cannot be deleted and the function should return a list of 3 deleted files and a list of 2 failed files. In the third test case, the CSV file does not exist and the function should return empty lists for deleted and failed files.</p>
</details>

The second test involved writing a simple Python function to clean up stray files in S3 using a list provided by a CSV file. ChatGPT scored pretty well here. It included the asked-for error handling and API interface, but its tests are not correct. The third test especially would crash when the file was opened, but the script does not account for that.

Once again I didn't run the code, but assuming the use of boto3 is anywhere close to the actual API, it was faster to have ChatGPT write the code than for me to do it.

<details><summary>Test 3: Two-Column Layout in React: ✅</summary>

<h5>Prompt</h5>
<p>write for me a JSX file using React that displays a two column layout with a list of appointments in the left column and the appointment details on the right columns. Use the react-bootstrap library for styling and no other libraries. Assume the list of appointments are passed into the component as props.</p>

<h5>Response</h5>
<p>Sure, here's an example of a JSX file using React that displays a two-column layout with a list of appointments on the left column and the appointment details on the right column, using the react-bootstrap library for styling:</p>

<code class="js"><pre>
import React from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
    function AppointmentList({ appointments }) {
      return (
        &lt;Container&gt;
          &lt;Row&gt;
            &lt;Col sm={4}&gt;
              &lt;ListGroup&gt;
                {appointments.map((appointment) =&gt; (
                  &lt;ListGroup.Item key={appointment.id}&gt;
                    {appointment.title}
                  &lt;/ListGroup.Item&gt;
                ))}
              &lt;/ListGroup&gt;
            &lt;/Col&gt;
            &lt;Col sm={8}&gt;
              &lt;Card&gt;
                &lt;Card.Body&gt;
                  &lt;Card.Title&gt;Appointment Details&lt;/Card.Title&gt;
                  &lt;Card.Subtitle className=&quot;mb-2 text-muted&quot;&gt;Title&lt;/Card.Subtitle&gt;
                  &lt;Card.Text&gt;
                    Lorem ipsum dolor sit ...
                  &lt;/Card.Text&gt;
                  &lt;Card.Subtitle className=&quot;mb-2 text-muted&quot;&gt;Date&lt;/Card.Subtitle&gt;
                  &lt;Card.Text&gt;
                    January 1, 2023
                  &lt;/Card.Text&gt;
                  &lt;Card.Subtitle className=&quot;mb-2 text-muted&quot;&gt;Location&lt;/Card.Subtitle&gt;
                  &lt;Card.Text&gt;
                    123 Main St, Anytown USA
                  &lt;/Card.Text&gt;
                &lt;/Card.Body&gt;
              &lt;/Card&gt;
            &lt;/Col&gt;
          &lt;/Row&gt;
        &lt;/Container&gt;
      );
    }

    export default AppointmentList;</pre></code>

<p>Here, the AppointmentList component takes in a prop called appointments, which is an array of appointment objects. The left column displays the list of appointments using the ListGroup component from react-bootstrap, and the right column displays the appointment details using the Card component. You can customize the appearance of the list and the details as desired by modifying the styling properties of the components.</p>
</details>

This test surprised me. I had ChatGPT create a two column layout in React for an appointment management application. Explaining a complex UI in words is difficult without visual aids, so I expected some misunderstandings, but it powered through and did exactly what I asked. It failed to add any navigation to the app nor did it use the data inside of the appointments array, so it's not really usable as a component, but it's certainly a good starting point and one I'd be happy to use as a starting template should I ever need such a thing.

That said, without tooling to make ChatGPT more available during development it would be easier to just write the layout myself.

<details><summary>Test 4: RSS Parsing in Swift: ✅</summary>

<h5>Prompt</h5>
<p>write for me a Swift RSS feed parser that takes in a string of XML data and produces a Post object with a title, description, pubdate, and enclosure fields. Use only the swift standard library</p>

<h5>Response</h5>
<p>Sure, here's an example Swift RSS feed parser that uses the Swift standard library to parse a string of XML data and produce a Post object with a title, description, pubdate, and enclosure fields:</p>

<a href="https://gist.github.com/Sonictherocketman/dd7c06c3792a55cba420324bab365b19">Check out the code here. It's very long.</a>
</details>

This last test was by far the most involved and open-ended. I asked ChatGPT for a Swift-based RSS Feed Parser and it certainly gave me something close. It used the correct Foundation APIs and even understood the need to concatenate the element text, but it failed to generate a valid test fixture (or even valid XML) and there's absolutely no error handling to speak of.

That said, it did produce valid XML once I called it out and there's something to be said for such humility. I would certainly use this code as a starting point if I needed to build something like this in the near future.


### Should I Hire ChatGPT?

In general I'd say it performed fairly well as a developer, though its ability to imitate bloggers is very lacking. For the fifth test I tried to have it write this post, but the output didn't sound like me at all and it kept trying to sell itself using features it doesn't have. Overall I'd give ChatGPT a tentative recommendation and would probably hire it contingent of course on a 30-day probationary period to see if it can keep its tendency toward exaggeration in check.


### It's Not an AI Apocalypse, It's Better

I don't really buy the idea that ChatGPT and its ilk will do much to disrupt our everyday lives in a dramatic way. I do however see both it and it's text-to-image cousins as being more and more useful as tools to automate away so much of the boring or tedious work of being a developer or a person on the internet in general.

Like I said, I already use Midjourney to create images for my D&amp;D campaign and those images have had a significant impact in improving the gaming experience. We were never going to contract an artist for four once-a-week landscapes and so economically speaking the AI has had no external effect. Our D&amp;D games just got marginally better. And that's great!

ChatGPT seems to me like it could be yet another advantage that enterprising developers would use to enhance their own productivity. If something like ChatGPT ever shipped inside of an IDE like Xcode, I could imagine a whole suite of amazing features (automatic complex refactors, automating test writing, and more). GitHub's Copilot does some of this, but it's in its infancy. In general I'd expect to see tools like ChatGPT improve a developer's productivity and let us focus more on the design and nuances of our code rather than on the tedious implementation; and for that I am *very* excited.


[1]: https://www.youtube.com/watch?v=jPhJbKBuNnA
[2]: https://www.youtube.com/watch?v=nPMEozP8vvY
[3]: https://www.midjourney.com/app/
[4]: /archive/take-a-break-script-something/

<!-- Begin Syntax Stylesheet -->
<link rel="stylesheet" href="/bin/highlight.default.min.css">
<script src="/bin/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
