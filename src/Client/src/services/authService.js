const baseUrl = "https://localhost:7274/api/Users";

export async function register(formData) {
    const response = await fetch(`${baseUrl}/register`, {
        credentials: "include",
        method: "POST",
        body: formData,
    });

    console.log(response);

    return response;
}

export async function authLogin(username, password) {
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

export async function authLogout() {
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

export async function authIsAuthenticated() {
    const response = await fetch(`${baseUrl}/isAuthenticated`, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();
    return result;
}
