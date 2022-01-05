import { logout } from './api/api.js';
import { html, render, page } from './lib.js';
import { getUserData, loadMovie } from './util.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

const root = document.querySelector('main');

page(decorateContext);
page('/home', catalogPage);
page('/details/:id', loadMovie, detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit:/id', loadMovie, editPage);


page('/', '/home');

updateUserNav();
page.start();
// fn decorate ctx puts render fn in the pagejs ctx
function decorateContext(ctx, next) {
	// ti obekte shte imash render svoitvo
	// koeto 6te e funktciq koqto priema templeit i vrashta 
	// funkciqta render na templeita i go pe4ata varhu ruuta
	ctx.render = (template) => render(template, root);
	ctx.updateUserNav = updateUserNav;
	next();
}

function updateUserNav() {
	const userData = getUserData();
	if (userData) {
		[...document.querySelectorAll('nav .user')].forEach(el => el.style.display = 'inline-block');
		[...document.querySelectorAll('nav .guest')].forEach(el => el.style.display = 'none');
		document.getElementById('welcomeMsg').textContent = `Welcome, ${userData.email}`;
	} else {
		[...document.querySelectorAll('nav .user')].forEach(el => el.style.display = 'none');
		[...document.querySelectorAll('nav .guest')].forEach(el => el.style.display = 'inline-block');
	}
}

document.querySelector('#logoutBtn').addEventListener('click', async (event) => {
	event.target.disabled = true;
	await logout();
	updateUserNav()
})