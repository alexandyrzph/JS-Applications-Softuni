import { render, html } from './node_modules/lit-html/lit-html.js';
import { towns as townNames } from "./towns.js";

const listTemplate = (towns) => html`
<ul>
	${towns.map(t => html`<li class=${t.match ? 'active' : '' }>${t.name}</li>`)}
</ul>`;

const towns = townNames.map(t => ({ name: t, match: false }));
const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch);
// the first param is the template function
// the second is the place where we append the template
update();

// update renders shows the changes made
function update() {
	render(listTemplate(towns), root);
}

function onSearch() {
	const match = input.value.trim().toLocaleLowerCase();
	let matches = 0;

	for (const town of towns) {
		if (match && town.name.toLocaleLowerCase().includes(match)) {
			town.match = true;
			matches++;
		} else {
			town.match = false;
		}
	}
	output.textContent = `${matches} matches found.`;

	// invoking update to see which towns match to the input
	update();
}