slug: drawing-of-the-day
published: Sat, 19 Nov 2022 at 07:48 AM
updated: Thu, 05 Feb 2026 23:15:21 
title: Drawing of the Day
author: Brian Schrader
tags: fun, programming
status: publish
hidden: true

<style>
    #gallery {
        width: auto;
        overflow-x: scroll;
        display: flex;
        gap: 0.5rem;
    }

    #gallery>a {
        flex: 1;
        text-align: center;
        padding-bottom: 1rem;
        max-width: 150px;
        margin-right: 0.25rem;
    }

    .post img.potd {
        background: white;
        padding: 0.25rem;
        border-radius: 4px;
    }

    .post img.prev-potd {
        background: white;
        padding: 0.25rem;
        border-radius: 4px;
        max-width: 150px;
        max-height: 300px;
    }

</style>

<a
  href="https://home.brianschrader.com/drawing-of-the-day/latest.png"
  target="_blank"
  title="Drawing of the Day"
  rel="noreferrer nofollow noopener">
<img
  alt="The Current Drawing of the Day"
  src="https://home.brianschrader.com/drawing-of-the-day/latest.png"
  class="image-center potd"
/></a>
<center><caption><small>
The Drawing of the Day for Today
</small></caption></center>

DotD are produced using my [pdraw][1] library. It's free and open-source, so you could use it too! The images are generated using randomly-generated data resulting in a completely new drawing each and every day.

If you'd like more information about this project, please check out [the announcement blog post][2] or the [pdraw][1] library on GitHub.

[1]: https://github.com/sonictherocketman/pdraw
[2]: /archive/a-drawing-every-day/

### Previous Drawings of the Day

<div id="gallery"></div>

<div style="text-align:center">
<a
    href="https://home.brianschrader.com/drawing-of-the-day/rss.xml"
    title="RSS Feed for Drawings of the Day"
    rel="alternate"
/>
<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15" height="15"
	 viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
<path d="M6,21c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S8.8,21,6,21z"/>
<path d="M5.8,1c-1.2,0-2.5,0.1-4,0.3C1.4,1.4,1,1.8,1,2.3v5.1c0,0.3,0.1,0.6,0.4,0.8s0.5,0.3,0.8,0.2c1.2-0.2,2.4-0.4,3.6-0.4
    c10,0,18.1,8.1,18.1,18.1c0,1.2-0.1,2.4-0.4,3.6c-0.1,0.3,0,0.6,0.2,0.8c0.2,0.2,0.5,0.4,0.8,0.4h5.1c0.5,0,0.9-0.4,1-0.8
    c0.2-1.4,0.3-2.7,0.3-4C31,12.3,19.7,1,5.8,1z"/>
<path d="M5.9,11c-1.4,0-2.8,0.2-4.1,0.6c-0.4,0.1-0.7,0.5-0.7,1V18c0,0.3,0.2,0.7,0.5,0.8c0.3,0.2,0.7,0.2,1,0.1
    c1.1-0.5,2.2-0.8,3.4-0.8c4.4,0,8,3.6,8,8c0,1.2-0.3,2.3-0.8,3.4c-0.1,0.3-0.1,0.7,0.1,1c0.2,0.3,0.5,0.5,0.8,0.5h5.5
    c0.4,0,0.8-0.3,1-0.7c0.4-1.4,0.6-2.8,0.6-4.1C21,17.8,14.2,11,5.9,11z"/>
</g>
</svg>
DotD RSS Feed</a>
|
<a
    href="https://pine.blog/sites/45032b9d-80e1-414d-b693-cca389b5dd1a"
    title="DotD on Pine.blog"
    rel="nofollow noopener noreferrer">
DotD on Pine.blog
</a>
</div>

<script>
(() => {
    const p = 'https://home.brianschrader.com/drawing-of-the-day/{date}.png';
    const dates = Array.from(Array(14).keys()).map(i => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
    }).filter(date => (
        Math.floor((date.getTime() - (new Date('2022-11-18').getTime())) / (60*60*24*1000)) >= 0 && Math.floor(((new Date().getTime()) - date.getTime()) / (60*60*24*1000)) < 14
    )).map(date => {
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            year = date.getFullYear();
        return `${year}-${month}-${day}`;
    });

    const gallery = document.querySelector('#gallery');
    dates.forEach(date => {
        const url = p.replace('{date}', date);

        const container = document.createElement('a');
        container.href = url;
        container.target = '_blank';
        container.rel = 'noreferrer noopener nofollow';

        const img = document.createElement('img');
        img.src = url;
        img.alt = `The Image of the Day for ${dates}`;
        img.className = 'prev-potd';
        img.loading = 'lazy';

        container.appendChild(img);

        const text = document.createElement('small');
        text.innerText = date;
        container.appendChild(text);

        gallery.appendChild(container);
    });
})()
</script>
