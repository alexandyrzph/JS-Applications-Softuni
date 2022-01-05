import { deleteBook, getBookById, getLikes, likeBook } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete, userData, onLike, totalLikes) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner 
                ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
                : userData != null ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : null}


            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const book = await getBookById(ctx.params.id);
    const userData = getUserData();
    
    const totalLikes = await getLikes(book._id);
    const isOwner = userData && userData.id == book._ownerId;
    ctx.render(detailsTemplate(book, isOwner, onDelete, userData, onLike, totalLikes));

    async function onDelete() {
        await deleteBook(ctx.params.id);
        ctx.page.redirect('/');
    }

    function onLike() {
        likeBook(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}