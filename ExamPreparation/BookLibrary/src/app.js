import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myBooksPage } from "./views/mybooks.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector('#site-content');

page(decorateContext); // x
page('/', dashboardPage); // x
page('/login', loginPage); // x
page('/register', registerPage); // x
page('/create', createPage); // x
page('/details/:id', detailsPage); // x
page('/edit/:id', editPage); // x
page('/mybooks', myBooksPage); // x

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
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.querySelector('#logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/');
    updateUserNav();
});