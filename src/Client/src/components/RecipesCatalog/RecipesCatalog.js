import React, { useState, useEffect } from "react";
import RecipesCard from "../RecipesCard/RecipesCard";
import getRecipes from "../../services/recipesService";

function RecipesCatalog() {
	const baseUrl = "https://localhost:7274/api/Recipes";
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getRecipes(baseUrl).then((res) => setRecipes(res));
	}, []);

	return (
		<>
			<h2 className="mt-4">Recipes</h2>
			<div className="container">
				<div className="row d-flex align-items-stretch">
					{recipes.map((recipe) => (
						<RecipesCard
							key={recipe.id}
							image={recipe.imageURI}
							title={recipe.title}
						>
							{recipe.description}
						</RecipesCard>
					))}
				</div>
			</div>
		</>
	);
}

export default RecipesCatalog;
