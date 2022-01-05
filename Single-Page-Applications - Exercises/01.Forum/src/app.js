import { loadArticles } from "./loadArticles.js";
import { onCreate } from "./utilities.js";

let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const form = document.querySelector('form');
form.addEventListener('submit', createArticle);

function createArticle(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('topicName');
    const username = formData.get('username');
    const post = formData.get('postText');

    const data = { title, username, post };
    //onCreate(url, data);
    loadArticles();
}