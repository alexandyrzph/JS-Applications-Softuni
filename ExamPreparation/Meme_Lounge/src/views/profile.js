import { getUserMemes } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (userInfo, memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${userInfo.gender}.png">
        <div class="user-content">
            <p>Username: ${userInfo.username}</p>
            <p>Email: ${userInfo.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length == 0 
        ? html`<p class="no-memes">No memes in database.</p>` 
        : memes.map(memeTemplate)}
    </div>
</section>`;

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
    const userInfo = getUserData();
    const memes = await getUserMemes(userInfo.id);
    ctx.render(profileTemplate(userInfo, memes));
}