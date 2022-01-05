import { getArticles } from "./utilities.js";


export async function loadArticles() {
    const articles = await getArticles('http://localhost:3030/jsonstore/collections/myboard/posts');
     
} 