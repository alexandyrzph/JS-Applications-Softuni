import { html, until } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (moviePromise) => html`
<section id="movie-details">
	${until(moviePromise, html`<p>Loading &hellip;</p>`)}
</section>`;

const movieTemplate = (movie) => html`
<div class="container">
	<div class="row bg-light text-dark">
		<h1>Movie title: ${movie.title}</h1>

		<div class="col-md-8">
			<img class="img-thumbnail" src=${movie.img} alt="Movie">
		</div>
		<div class="col-md-4 text-center">
			<h3 class="my-3 ">Movie Description</h3>
			<p>${movie.description}</p>
			${movie.isOwner
				? html`
					<a class="btn btn-danger" href="#">Delete</a>
					<a class="btn btn-warning" href="#">Edit</a>
					<a class="btn btn-primary" href="#">Like</a>` 
				: html`<a class="btn btn-primary" href="#">Like</a>`}

			<span class="enrolled-span">Liked 1</span>
		</div>
	</div>
</div>`;

export function detailsPage(ctx) {
	ctx.render(detailsTemplate(loadMovie(ctx)));
}

async function loadMovie(ctx) {
	const movie = await ctx.moviePromise;
	console.log(movie);
	const userData = getUserData();
	
	if (userData && userData.id == movie._ownerId) {
		movie.isOwner = true;
	}

	return movieTemplate(movie);
	
}