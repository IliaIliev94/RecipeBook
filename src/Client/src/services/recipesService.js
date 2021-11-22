async function getRecipes(url) {
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export default getRecipes;
