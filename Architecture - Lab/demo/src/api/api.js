const host = `http://localhost:3030`;

async function request(url, options) {
	try {
		const res = await fetch(host + url, options);

		if (res.ok != true) {
			if (res.status == 403) {
				sessionStorage.removeItem('userData');
			}
			const error = await res.json();
			throw new Error(error.message);
		}
		if (res.status == 204) {
			return res;
		} else {
			return res.json();
		}

	} catch (err) {
		alert(err.message);
		throw err;
	}
}

// creating options by default the method will be get request
// if data isn't undefined
// we add Content Type and the stringified data
// for the authorization we get the userData from sessionStorage
// and if we have data that isn't null to the options we add X-Authorization
// that will be the userData.token;
// at the end we return the options

function createOptions(method = 'get', data) {
	const options = {
		method,
		headers: {},
	}
	if (data != undefined) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}

	const userData = JSON.parse(sessionStorage.getItem('userData'));

	if (userData != null) {
		options.headers['X-Authorization'] = userData.token;
	}
	return options;
}

async function get(url) {
	return request(url, createOptions());
}

async function post(url, data) {
	return request(url, createOptions('post', data));
}

async function put(url, data) {
	return request(url, createOptions('put', data));
}

async function del(url) {
	return request(url, createOptions('delete'));
}

async function login(email, password) {
	const response = await request('/users/login', createOptions('post', { email, password }));
	const userData = {
		email: response.email,
		id: response._id,
		token: response.accessToken,
	}
	sessionStorage.setItem('userData', JSON.stringify(userData))
}

async function register(email, password) {
	const response = await request('/users/register', createOptions('post', { email, password }));
	const userData = {
		email: response.email,
		id: response._id,
		token: response.accessToken,
	}
	sessionStorage.setItem('userData', JSON.stringify(userData))
}

async function logout() {
	await request('/users/logout', createOptions());
	sessionStorage.removeItem('userData');
}

export {
	get,
	post,
	put,
	del,
	login,
	register,
	logout
}