import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";


const views = {
    "homeLink": showHome,
    "loginLink": showLogin,
    "registerLink": showRegister,
};

const nav = document.querySelector('nav');

document.getElementById('logoutBtn').addEventListener('click', onLogout);
nav.addEventListener('click', (event) => {
    if (event.target.tagName == "A") {
        const view = views[event.target.id];
        event.preventDefault();
        if (typeof view == 'function') {
            view();
        }
    }
});



updateNav();
showHome();

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}


async function onLogout(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const {token}  = JSON.parse(sessionStorage.getItem('userData'));
    
    await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    showLogin();
    updateNav();
}