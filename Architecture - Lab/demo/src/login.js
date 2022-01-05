import * as api from './api/data.js';

const section = document.getElementById('loginSection');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;


export function showLoginPage(ctxTarget) {
	ctx = ctxTarget;
	console.log(ctx);
	ctx.showSection(section);
}

async function onSubmit(event) {
	event.preventDefault();
	const formData = new FormData(form);
	
	const email = formData.get('email');
	const password = formData.get('password');

	await api.login(email, password);
	ctx.updateUserNav();
	ctx.goTo('home');
}