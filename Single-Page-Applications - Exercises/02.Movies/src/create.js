import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.querySelector('#add-movie');
section.remove();

export function showCreate() {
    showView(section);

    const form = section.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const title = formData.get('title')
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const token = userData.token;
            if (userData != null) {
                const request = await fetch('http://localhost:3030/data/movies', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': token
                    },
                    body: JSON.stringify({ title, description, img })
                });

                if (request.ok != true) {
                    const error = await request.json();
                    throw new Error(error.message);
                }

                const data = request.json();
                showHome();
                form.reset();
                return data;
            }

        } catch (err) {
            alert(err.message)
        }
    });

}