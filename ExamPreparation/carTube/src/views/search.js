import { searchCar } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

    </div>

</section>`;


const matchTemplate = (match) => html`
<div class="listing">
    <div class="preview">
        <img src=${match.imageUrl}>
    </div>
    <h2>${match.brand} ${match.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${match.year}</h3>
            <h3>Price: ${match.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${match._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function searchPage(ctx) {

    update();
    function update() {
        ctx.render(searchTemplate(onSearch));
    }


    async function onSearch() {
        const queryStr = document.getElementById('search-input');
        const matches = await searchCar(queryStr.value);
        ctx
    }
}

