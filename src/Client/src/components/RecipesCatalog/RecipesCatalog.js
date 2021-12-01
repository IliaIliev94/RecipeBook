import React, { useState, useEffect } from "react";
import RecipesCard from "../RecipesCard/RecipesCard";
import { getRecipes } from "../../services/recipesService";
import Loader from "../Loader/Loader";
import "../Loader/Loader.css";

function RecipesCatalog({ searchParams }) {
	const baseUrl = "https://localhost:7274/api/Recipes";
	const [recipes, setRecipes] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(async () => {
		let result = await getRecipes(baseUrl);
		setRecipes(result);
		console.log(recipes);
		if (result !== null) {
			setIsLoaded(true);
		}
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
			<div className="container my-5">
				<div className="row d-flex align-items-stretch">
					{isLoaded ? (
						recipesToDisplay.length > 0 ? (
							recipesToDisplay.map((recipe) => (
								<RecipesCard key={recipe.id} recipe={recipe} />
							))
						) : (
							<h2 className="mx-auto">
								No recipes yet! You can add some!
							</h2>
						)
					) : (
						<Loader />
					)}
				</div>
			</div>
		</>
	);
}

export default RecipesCatalog;
