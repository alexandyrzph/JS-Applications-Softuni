import { html, render } from './node_modules/lit-html/lit-html.js';
import { getCities, post } from './getCities.js';

const optionsTemplate = (cities) => html`
${cities.map(c => html`<option value=${c[0]}>${c[1].text}</option>`)}`;

const root = document.getElementById('menu');
update();

const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const input = form.querySelector('#itemText');

	await post('http://localhost:3030/jsonstore/advanced/dropdown', { text: input.value.trim() });
	update();
	form.reset();
});


async function update() {
	render(optionsTemplate(Object.entries(await getCities())), root);
}