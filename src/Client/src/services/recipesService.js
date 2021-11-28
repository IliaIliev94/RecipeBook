const baseUrl = "https://localhost:7274/api/Recipes";

export async function getRecipes(url) {
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export async function createRecipe(
	title,
	imageURI,
	description,
	minMinutes,
	maxMinutes
) {
	const data = {
		title: title,
		imageURI: imageURI,
		description: description,
		minMinutes: minMinutes,
		maxMinutes: maxMinutes,
	};
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	const result = await response.json();

	return result;
}
