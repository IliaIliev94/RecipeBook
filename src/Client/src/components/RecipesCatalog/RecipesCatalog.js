import React, { useState, useEffect } from "react";
import RecipesCard from "../RecipesCard/RecipesCard";
import getRecipes from "../../services/recipesService";

function RecipesCatalog({ searchParams }) {
	const baseUrl = "https://localhost:7274/api/Recipes";
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getRecipes(baseUrl).then((res) => setRecipes(res));
	}, []);

	const recipesToDisplay =
		searchParams == ""
			? recipes
			: recipes.filter(
					(recipe) =>
						recipe.title
							.toLowerCase()
							.includes(searchParams.toLowerCase()) ||
						recipe.description
							.toLowerCase()
							.includes(searchParams.toLowerCase())
			  );

	return (
		<>
			<h2 className="mt-4">Recipes</h2>
			<div className="container">
				<div className="row d-flex align-items-stretch">
					{recipesToDisplay.map((recipe) => (
						<RecipesCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			</div>
		</>
	);
}

export default RecipesCatalog;
