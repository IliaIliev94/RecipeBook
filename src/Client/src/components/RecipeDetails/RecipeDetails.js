import FeatureImage from "../FeatureImage/FeatureImage";
import getRecipes from "../../services/recipesService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";
function RecipeDetails() {
	const baseUrl = "https://localhost:7274/api/Recipes";
	const [recipe, setRecipe] = useState({});
	const recipeId = useParams().id;
	useEffect(async () => {
		let result = await getRecipes(`${baseUrl}/${recipeId}`);
		setRecipe(result);
	}, []);
	return (
		<>
			<FeatureImage background={recipe.imageURI}>
				<div className="jumbotron recipe-details-card col-lg-6 col-10">
					<h1 className="display-4">{recipe.title}</h1>
					<hr className="my-4" />
					<p className="display-4">
						{recipe.minMinutes} - {recipe.maxMinutes} minutes
					</p>
				</div>
			</FeatureImage>
			<h2 className="display-3 my-5">{recipe.title}</h2>
			<p className="display-4 my-5">{recipe.description}</p>
		</>
	);
}

export default RecipeDetails;
