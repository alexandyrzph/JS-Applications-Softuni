import { commentPost, deleteGame, getAllComments, getGameById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, comments, basicUser, addComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- list all comments for current game (If any) -->
                ${comments.length == 0 ? html`<p class="no-comment">No comments.</p>` : comments.map(commentTemplate)}
                
            </ul>
            
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->

        ${isOwner 
            ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>` 
            : null}
        
    </div>

    <!-- Bonus -->
    
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${basicUser ? html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${addComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`: null}

    

</section>`;


const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const game = await getGameById(ctx.params.id);
    let comments = await getAllComments(game._id);
    const userData = getUserData();
    const isOwner = userData && userData.id == game._ownerId;
    const basicUser = userData && userData.id != game._ownerId;

    update();
    function update() {
        ctx.render(detailsTemplate(game, isOwner, onDelete, comments, basicUser, addComment));
    }

    async function onDelete() {
        await deleteGame(ctx.params.id);
        ctx.page.redirect('/');
    }

    function addComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const comment = formData.get('comment');
        const gameId = game._id;
        commentPost({gameId, comment });
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}