slug: drawing-of-the-day
published: Sat, 19 Nov 2022 at 07:48 AM
updated: Sat, 19 Nov 2022 08:26:12 
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

DotD are produced using my [pdraw][1] library. It's free and open-source, so you could use it too!

[1]: https://github.com/sonictherocketman/pdraw

### Previous Drawings of the Day

<div id="gallery"></div>

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
        const day = date.getDate(),
            month = date.getMonth() + 1,
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
