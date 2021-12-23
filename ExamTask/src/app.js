import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { searchPage } from "./views/search.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector('#main-content');

page(decorateContext); // x
page('/', homePage); // x
page('/login', loginPage); // x
page('/register', registerPage); // x
page('/catalog', catalogPage); // x
page('/create', createPage); // 
page('/details/:id', detailsPage); // 
page('/edit/:id', editPage); // 
page('/search', searchPage); // 
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
        [...document.getElementsByClassName('guest')].forEach(el => el.style.display = 'none');
        [...document.getElementsByClassName('user')].forEach(el => el.style.display = 'inline-block');
    } else {
        [...document.getElementsByClassName('guest')].forEach(el => el.style.display = 'inline-block');
        [...document.getElementsByClassName('user')].forEach(el => el.style.display = 'none');
    }
}

document.querySelector('#logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/');
    updateUserNav();
});

