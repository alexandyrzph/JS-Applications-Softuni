import { showCatalogPage } from './catalog.js';
import { showAboutUs, showHomePage } from "./home.js";
import { showLoginPage } from './login.js';
import { logoutUser } from './logout.js';
import { showRegisterPage } from './register.js';


// adding event listener to whole nav bar

document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
    'homeBtn': showHomePage,
    'catalogBtn': showCatalogPage,
    'aboutUsBtn': showAboutUs,
    'loginBtn': showLoginPage,
    'registerBtn': showRegisterPage,
    'logoutBtn': logoutUser
};

updateUserNav()
showHomePage();



function onNavigate(event) {
    if (event.target.tagName == "A") {
        const view = sections[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    }
}

export function updateUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData == null) {
        document.getElementById('guestNav').style.display = 'inline-block';
        document.getElementById('userNav').style.display = 'none';
    } else {
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
    }
}