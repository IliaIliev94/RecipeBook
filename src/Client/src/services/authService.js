const baseUrl = "https://localhost:7274/api/Users";

export async function register(username, email, password, confirmPassword) {
	const response = await fetch(`${baseUrl}/register`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			username: username,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
		}),
	});

	return response;
}

export async function login(username, password) {
	const response = await fetch(`${baseUrl}/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});

	return response;
}

export async function logout() {
	const response = await fetch(`${baseUrl}/logout`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-type": "application/json",
		},
	});

	const result = await response;
	return result;
}

export async function isAuthenticated() {
	const response = await fetch(`${baseUrl}/isAuthenticated`, {
		method: "GET",
		credentials: "include",
	});

	const result = await response.json();
	return result;
}
