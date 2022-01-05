import { html } from "../lib.js";

const editTemplate = () => html`
<section id="edit-movie">
	<form class="text-center border border-light p-5" action="#" method="">
		<h1>Edit Movie</h1>
		<div class="form-group">
			<label for="title">Movie Title</label>
			<input type="text" class="form-control" placeholder="Movie Title" value="" name="title">
		</div>
		<div class="form-group">
			<label for="description">Movie Description</label>
			<textarea class="form-control" placeholder="Movie Description..." name="description"></textarea>
		</div>
		<div class="form-group">
			<label for="imageUrl">Image url</label>
			<input type="text" class="form-control" placeholder="Image Url" value="" name="imageUrl">
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</section>`;

export function editPage(ctx) {
	ctx.render(editTemplate());
}