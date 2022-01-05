window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);
})


async function onLogin(event) {
    const url = `http://localhost:3030/users/login`;
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const req = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (req.ok != true) {
            const error = await req.json();
            throw new Error(error.message);
        };

        const res = await req.json();
        const token = res.accessToken;

        localStorage.setItem('token', token);

        window.location = `/index.html`;
    } catch (err) {
        alert(err.message);
    }
}