const tbody = document.querySelector('tbody');
tbody.addEventListener('click', onTableClick);

const createForm = document.querySelector('#createForm');
createForm.addEventListener('submit', onCreate);

const editForm = document.querySelector('#editForm');
editForm.addEventListener('submit', onEditSubmit);
document.getElementById('loadBooks').addEventListener('click', loadBooks);

loadBooks();

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, { author, title });

    event.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

async function onTableClick(event) {
    if (event.target.className == 'delete') {
        onDelete(event.target);
    } else if (event.target.className == 'edit') {
        onEdit(event.target);
    }
}



async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
}



async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}


async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const author = formData.get('author').trim();
    const title = formData.get('title').trim();
    const book = { author, title };

    const result = await createBook(book);
    loadBooks();
}

async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

async function loadBookById(id) {
    const res = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    return await res.json();
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td data-id=${id}>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
</td>`;

    return row;
}



async function createBook(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}

async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });
    return result;
}

async function deleteBook(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
    return result;
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: { 'Content-Type': 'application/json' },
        })
    }
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = response.json();
        throw new Error(error.message);
    }

    return await response.json();
}