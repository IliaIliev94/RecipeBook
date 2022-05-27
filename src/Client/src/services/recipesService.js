const baseUrl = "https://localhost:7274/api/Recipes";
const likesUrl = "https://localhost:7274/api/Likes";

export async function getRecipes() {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
}

export async function getOne(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
        credentials: "include",
    });
    const result = await response.json();
    return result;
}

export async function createRecipe(title, imageURI, description, minMinutes, maxMinutes) {
    const data = {
        title: title,
        imageURI: imageURI,
        description: description,
        minMinutes: minMinutes,
        maxMinutes: maxMinutes,
    };
    const response = await fetch(baseUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return response;
}

export async function editRecipe(id, title, imageURI, description, minMinutes, maxMinutes) {
    const data = {
        title: title,
        imageURI: imageURI,
        description: description,
        minMinutes: minMinutes,
        maxMinutes: maxMinutes,
    };

    const response = await fetch(`${baseUrl}/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response;
}

export async function deleteRecipe(id) {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    return response;
}

export async function getUserRecipes(username = null) {
    const url = `${baseUrl}/user-recipes${username === null ? "" : `/${username}`}`;
    console.log(url);
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();
    return result;
}

export async function likeRecipe(id) {
    console.log(id);
    const response = fetch(`${likesUrl}/like/${id}`, {
        method: "GET",
        credentials: "include",
    });

    return response;
}

export async function unlikeRecipe(id) {
    const response = fetch(`${likesUrl}/unlike/${id}`, {
        method: "GET",
        credentials: "include",
    });

    return response;
}
