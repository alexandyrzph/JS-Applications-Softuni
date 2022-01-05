import * as api from './api/data.js';
import { showSection } from './dom.js';
import { showCatalogPage } from './catalog.js';
import { showHomePage, showAboutPage } from './home.js';
import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';

document.getElementById('logoutBtn').addEventListener('click', onLogout);
document.querySelector('nav').addEventListener('click', onNavigate);


const views = {
	'home': showHomePage,
	'catalog': showCatalogPage,
	'about': showAboutPage,
	'login': showLoginPage,
	'register': showRegisterPage
}
// associative object that associates to a string 
const links = {
	'homeBtn': 'home',
	'catalogBtn': 'catalog',
	'aboutBtn': 'about',
	'loginBtn': 'login',
	'registerBtn': 'register'
};

updateUserNav();


const ctx = {
	updateUserNav,
	goTo,
	showSection,
};

// Start application in home view
goTo('home');


// operation onclick  
function onNavigate(event) {
	if (event.target.tagName == 'A') {
		const name = links[event.target.id];
		if (name) {
			event.preventDefault();
			goTo(name);
		}
	}
}


// programmistic redirect
function goTo(name, ...params) {
	const view = views[name];
	if (typeof view == 'function') {
		view(ctx, ...params);
	}
}

export function updateUserNav() {
	const userData = JSON.parse(sessionStorage.getItem('userData'));
	if (userData != null) {
		document.getElementById('userNav').style.display = 'inline-block';
		document.getElementById('guestNav').style.display = 'none';
	} else {
		document.getElementById('userNav').style.display = 'none';
		document.getElementById('guestNav').style.display = 'inline-block';
	}
}

async function onLogout(event) {
	event.stopImmediatePropagation();
	await api.logout();
	updateUserNav();
	goTo('home');
}