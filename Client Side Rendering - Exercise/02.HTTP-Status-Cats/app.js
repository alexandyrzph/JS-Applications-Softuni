import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats as catData } from './catSeeder.js';


// template by lit-html
const catCard = (cat) => html`
<li>
	<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
	<div class="info">
		<button @click=${()=> toggleInfo(cat)} class="showBtn">Show status code</button>
		${cat.info ? html`<div class="status" id=${cat.id}>
			<h4>Status code: ${cat.statusCode}</h4>
			<p>${cat.statusMessage}</p>
		</div>` : null}
	</div>
</li>`;

// getting the root element where we will append the template
const root = document.getElementById("allCats")
catData.forEach(c => c.info = false);
update();


// fn update to visualise the changes

function update() {
	render(html`<ul>${catData.map(catCard)}</ul>`, root);
}

// the logic of the toggle button
function toggleInfo(cat) {
	cat.info = !cat.info;
	update();
}