export async function getCities() {
	try {
		const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
		if (response.ok != true) {
			const error = await response.json();
			throw new Error(error);
		}
		const data = await response.json();
		return data;
	} catch (err) {
		alert(err.message);
		throw err;
	}
}

export async function post(url, data) {
	try {
		const res = await fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (res.ok != true) {
			const error = await res.json();
			throw new Error(error.message)
		}

		return await res.json();
	} catch (err)  {
		alert(err.message);
		throw err;
	}
}