import { searchAlbum } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (albums, onSearch, albumQuery) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${albumQuery || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
    
    ${albums.length == 0 && window.location.search.includes('query')
        ? html`<p class="no-result">No result.</p>`
        : albums.map(albumTemplate)}
        
    </div>
</section>`;

const albumTemplate = (album) => html`<div class="card-box">
    <img src=${album.imgUrl} />
    <div> 
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${getUserData() != null 
            ? html`
                <div class="btn-group">
                    <a href="/details/${album._id}" id="details">Details</a>
                </div>` 
            : null}
        
    </div>
</div>`;

export async function searchPage(ctx) {
    const albumQuery = ctx.querystring.split('=')[1];
    let albums = albumQuery == '' ? [] : await searchAlbum(albumQuery);
    
    ctx.render(searchTemplate(albums, onSearch, albumQuery));

    function onSearch() {
        const query = document.getElementById('search-input').value.trim();
        if (query == '') {
            return alert('Please enter album name!')
        }
        ctx.page.redirect('/search?query=' + query);
    }
}
