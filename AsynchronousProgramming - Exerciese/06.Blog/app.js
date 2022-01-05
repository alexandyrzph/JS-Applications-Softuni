function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
    const selectedId = document.getElementById('posts').value;

    const titleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const ulElement = document.getElementById('post-comments');
    
    titleElement.textContent = 'Loading...';
    postBodyElement.textContent = '';
    ulElement.replaceChildren();
    
    const [post,comments] = await Promise.all([
        getPostById(selectedId),
        getCommentsByPostId(selectedId)
    ]);

    titleElement.textContent = post.title;
    postBodyElement.textContent = post.body;
    
    comments.forEach(c => {
        const liElement = document.createElement('li');
        liElement.textContent = c.text;
        ulElement.appendChild(liElement); 
    })
}

async function getAllPosts() {
    const url = `http://localhost:3030/jsonstore/blog/posts`;
    const res =  await fetch(url);
    const data = await res.json();
    
    const selectElement = document.getElementById('posts');
    selectElement.replaceChildren();

    Object.values(data).forEach(p => {
        const optionElement = document.createElement('option');
        optionElement.textContent = p.title;
        optionElement.value = p.id;
        
        selectElement.appendChild(optionElement);
    });

}

async function getPostById(postId) {
    const url = `http://localhost:3030/jsonstore/blog/posts/` + postId;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}


async function getCommentsByPostId(postId) {
    const url = `http://localhost:3030/jsonstore/blog/comments`;
    const res = await fetch(url);
    const data = await res.json();

    const comments = Object.values(data).filter(c => c.postId == postId);
    return comments;
}