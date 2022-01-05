import { updateUserNav } from "./app.js";
import { showHomePage } from "./home.js";

export async function logoutUser() {

    // we create options to send as second parameter of the fetch API

    const options = { method: 'GET', headers: {} };
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    

    // if we have userData in out sessionStorage we add X-Authorization to our option headers
    // the token of the X-Authorization will be out userData token from the sessionStorage
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    const res = await fetch('http://localhost:3030/data/movies', options);
    const data = await res.json();
    sessionStorage.removeItem('userData');
    updateUserNav();
    showHomePage();
    return data;
}
sa