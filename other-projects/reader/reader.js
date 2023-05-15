const TIMELINE_URL = 'https://mastodon.social/api/v1/timelines/home';
const EVENTS_URL = 'https://mastodon.social/api/v1/streaming/user';

function addPostNodeIfNeeded(post) {
    if (!document.querySelector(`article[id="${post.id}"]`)) {
        addPostNode(post);
    }
}

function addPostNode({ id, title, content, reblog, account }, prepend=false) {
    const node = document.querySelector('#post').content.cloneNode(true);
    const targetContainer = document.querySelector('#timeline');

    node.querySelector('article').id = id;
    node.querySelector("img.acct-image").src = account.avatar;
    node.querySelector("span.acct-name").innerHTML = account.acct;

    if (!!title) {
        node.querySelector("h1.article-title").innerHTML = title;
    }

    if (!!reblog) {
        node.querySelector("div.article-content").innerHTML = reblog.content;
    } else {
        node.querySelector("small.reblogged-by").innerHTML = '';
        node.querySelector("div.article-content").innerHTML = content;
    }

    if (prepend) {
        targetContainer.prepend(document.importNode(node, true));
    } else {
        targetContainer.appendChild(document.importNode(node, true));
    }
}

function reload() {
    window.location.reload();
}

function logout() {
    localStorage.removeItem('api-key');
    window.location.reload();
}

async function populate(key) {
    let response;
    try {
        response = await fetch(TIMELINE_URL, {
            headers: { Authorization: `Bearer ${key}` },
        });
    } catch(error) {
        console.log(error);
        localStorage.removeItem('api-key');
    }
    const posts = await response.json();
    posts.forEach(post => addPostNodeIfNeeded(post));
}

document.addEventListener("DOMContentLoaded", async () => {
    const key = localStorage.getItem('api-key') || prompt(
        'Welcome to the BiteofanApple Reader!\n\n'
        + 'Please Enter Your Mastodon API Key Below\n\n'
        + 'The key must have read-access to your Mastodon account. '
        + 'All API Keys are kept on-device and stored in local storage. '
        + 'This app is just two static HTML and JS files. '
        + 'View Source if you don\'t trust me.\n\n'
        + 'This app only works for Mastodon.social accounts.'
    );
    localStorage.setItem('api-key', key);
    populate(key);

    const source = new EventSource(`${EVENTS_URL}?access_token=${key}`);
    source.addEventListener("update", (e) => {
        addPostNode(JSON.parse(e.data), true);
    });
});
