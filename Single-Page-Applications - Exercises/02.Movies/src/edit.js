import { showDetails } from "./details.js";
import { showView } from "./dom.js";

const section = document.getElementById('edit-movie');
section.remove();


export async function showEdit(event) {
    // onedit btn click 
    // inputs must be the same as the movie info data
    // we must get the data from the form data and send and authorized put request

    event.preventDefault();
    showView(section);
    const id = event.target.id;
    const request = await fetch('http://localhost:3030/data/movies/' + id);
    const movieData = await request.json();

    const form = section.querySelector('form');
    form.addEventListener('submit', onEdit);
    form.querySelector('[name="title"]').value = movieData.title;
    form.querySelector('[name="description"]').value = movieData.description;
    form.querySelector('[name="imageUrl"]').value = movieData.img;

    async function onEdit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            if (userData != null) {
                const token = userData.token;

                const request = await fetch('http://localhost:3030/data/movies/' + id, {
                    method: 'put',
                    headers: {
                        'X-Authorization': token
                    },
                    body: JSON.stringify({ title, description, img })
                })

                if (request.ok == false) {
                    const error = await request.json();
                    throw new Error(error.message);
                }
                const data = await request.json();
                showDetails(id);
                return data;
            }
        } catch (err) {
            alert(err.message)
        }
    }
}
