import { html } from "../lib.js";
import { login } from '../api/data.js';


const loginTemplate = (onSubmit) => html`
<section id="form-login">
	<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
		<div class="form-group">
			<label for="email">Email</label>
			<input type="type" class="form-control" placeholder="Email" name="email" value="">
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" class="form-control" placeholder="Password" name="password" value="">
		</div>

		<button type="submit" class="btn btn-primary">Login</button>
	</form>
</section>`;

export function loginPage(ctx) {
	ctx.render(loginTemplate(onSubmit));


	async function onSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const email = formData.get('email');
		const password = formData.get('password');

		await login(email, password);
		ctx.updateUserNav();
		ctx.page.redirect('/');
	}
}
