export async function getArticles(url) {
    try {
        const res = await fetch(url);

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
    }
}

export async function onCreate(url, data) {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
}

