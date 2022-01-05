import { e, showView } from "./dom.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";

const section = document.getElementById('movie-details');
section.remove();

export function showDetails(movieId) {
    showView(section);
    getMovie(movieId)
}

async function getMovie(id) {
    section.replaceChildren(e('p', {}, 'Loading...'));

    const requests = [
        fetch('http://localhost:3030/data/movies/' + id),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`),
    ]

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        requests.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`))
    }

    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests)
    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        // if hasLiked is falsy type 
        // hasLiked.json() won't start
        hasLikedRes && hasLikedRes.json()
    ]);

    section.replaceChildren(createDetails(movieData, likes, hasLiked));
}

function createDetails(movie, likes, hasLiked) {
    const controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, `Movie description`),
        e('p', {}, movie.description)
    );

    const deleteBtn = e('a', { className: 'btn btn-danger', href: '#', onclick: onDelete }, 'Delete')
    deleteBtn.id = `${movie._id}`;
    const editBtn = e('a', { className: 'btn btn-warning', href: '#', onclick: showEdit }, 'Edit');
    editBtn.id = `${movie._id}`;
    const likeBtn = e('a', { className: 'btn btn-primary', href: '#', onclick: onLike }, 'Like');
    const unlikeBtn = e('a', { className: 'btn btn-primary', href: '#', onclick: onUnlike }, 'Unlike');

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        if (userData.id == movie._ownerId) {
            controls.appendChild(deleteBtn);
            controls.appendChild(editBtn);
        } else {
            if (hasLiked.length > 0) {
                controls.appendChild(unlikeBtn);
            } else {
                controls.appendChild(likeBtn);
            }
        }
    }
    controls.appendChild(e('span', { className: 'enrolled-span' }, `Liked ${likes}`));

    const element = e('div', { className: 'container' },
        e('div', { className: 'row bg-light text-dark' },
            e('h1', {}, `Movie title: ${movie.title}`),
            e('div', { className: 'col-md-8' },
                e('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })
            ),
            controls
        )
    );
    return element;

    async function onLike() {
        const res = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token,
            },
            body: JSON.stringify({
                movieId: movie._id
            })
        })

        showDetails(movie._id);
    }

    async function onUnlike() {
        const likeId = hasLiked[0]._id;
        await fetch('http://localhost:3030/data/likes/' + likeId, {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token,
            },
        })

        showDetails(movie._id);
    }

    async function onDelete(event) {
        const id = event.target.id;
        try {
            if (userData != null) {
                const request = await fetch('http://localhost:3030/data/movies/' + id, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': userData.token
                    }
                });
                
                if (request.ok != true) {
                    const error = await request.json();
                    throw new Error(error);
                }

                const data = await request.json();
                showHome();
                return data;
            }
        } catch(err) {
            alert(err.message);
        }
        
    }
}
