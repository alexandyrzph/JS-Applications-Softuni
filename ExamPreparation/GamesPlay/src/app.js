import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { page, render } from './lib.js';
import { logout } from "./api/data.js";

const root = document.querySelector('#main-content');

page(decorateContext); 

page('/', '/home')
page('/home', homePage); // x
page('/catalog', catalogPage); // x
page('/login', loginPage); // x
page('/register', registerPage); // x
page('/create', createPage); // x
page('/details/:id', detailsPage); // x
page('/edit/:id', editPage); // x

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

updateUserNav();

function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

document.querySelector('#logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/');
    updateUserNav();
});