import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { listsPage } from "./views/myLists.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector('#site-content');

page(decorateContext); // x

page('/', homePage) // x
page('/catalog', catalogPage); // x 
page('/myLists', listsPage); // x 
page('/login', loginPage); // x 
page('/register', registerPage); // x 
page('/create', createPage); // x 
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);


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
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile').style.display = 'inline-block';
        document.querySelector('#profile a').textContent = `Welcome, ${userData.username}`;
    } else {
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

document.querySelector('#logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/');
    updateUserNav();
});