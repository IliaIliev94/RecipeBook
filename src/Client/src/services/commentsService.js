const baseUrl = "https://localhost:7274/api/Comments";

export async function addComment(recipeId, message) {
	const data = { recipeId: recipeId, message: message };
	const response = await fetch(`${baseUrl}/add`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return response;
}

export async function removeComment(id) {
	const response = await fetch(`${baseUrl}/delete/${id}`, {
		method: "DELETE",
		credentials: "include",
	});

	return response;
}
