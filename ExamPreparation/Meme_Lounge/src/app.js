import { page, render } from './lib.js';
// debug

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);

page.start();
updateUserNav();

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next(); 
}

function onLogout() {
    logout();
    page.redirect('/memes');
    updateUserNav();
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('div.user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';

    }
}