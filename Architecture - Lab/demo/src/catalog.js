import { getAllMovies } from './api/data.js';
import { e } from './dom.js';

const section = document.getElementById('catalogSection');
const ul = section.querySelector('ul');
section.remove();

export function showCatalogPage(ctx) {
	ctx.showSection(section);

	loadMovies();
}

async function loadMovies() {
	ul.replaceChildren(e('p', {}, 'Loading...'));
	const movies = await getAllMovies();
	ul.replaceChildren(...movies.map(createMovieCard));
}

function createMovieCard(movie) {
	return e('li', {}, movie.title);
}