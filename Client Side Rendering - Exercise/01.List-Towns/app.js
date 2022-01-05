import { html, render } from './node_modules/lit-html/lit-html.js';

document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
	const towns = document.getElementById('towns').value.split(',').map(e => e.trim());
	const root = document.getElementById('root');

	render(listTemplate(towns), root);
})

const listTemplate = (towns) => html`
<ul>
	${towns.map(t => html`<li>${t}</li>`)}
</ul>`