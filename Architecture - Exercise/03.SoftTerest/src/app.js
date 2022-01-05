import { showCatalog } from "./views/catalog.js";
import { showCreatePage } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHomePage } from "./views/home.js";
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { showSection } from "./dom.js";
import { logout } from "./api/data.js";


const links = {
	'homeLink': 'home',
	'getStartedLink': 'home',
	'catalogLink': 'catalog',
	'loginLink': 'login',
	'registerLink': 'register',
	'createLink': 'create',
};

const views = {
	'home': showHomePage,
	'catalog': showCatalog,
	'login': showLoginPage,
	'register': showRegisterPage,
	'create': showCreatePage,
	'details': showDetails,
};

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', async (ev) => {
	ev.preventDefault();
	await logout();
	updateNav();
	goTo('home');
})


const ctx = {
	goTo,
	showSection,
	updateNav,
}

updateNav()
goTo('home');


function onNavigate(event) {
	const name = links[event.target.id];
	if (name) {
		event.preventDefault();
		goTo(name);
	}
}

function goTo(name, ...params) {
	const view = views[name];
	if (typeof view == 'function') {
		view(ctx, ...params);
	}
}

function updateNav() {
	const userData = JSON.parse(sessionStorage.getItem('userData'));
	// if user data is null we don't have logged account
	if (userData == null) {
		[...nav.querySelectorAll('.user')].forEach(u => u.style.display = 'none');
		[...nav.querySelectorAll('.guest')].forEach(u => u.style.display = 'block');
	} else {
		[...nav.querySelectorAll('.user')].forEach(u => u.style.display = 'block');
		[...nav.querySelectorAll('.guest')].forEach(u => u.style.display = 'none');
	}
}