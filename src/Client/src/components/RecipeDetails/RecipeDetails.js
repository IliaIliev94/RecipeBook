import FeatureImage from "../FeatureImage/FeatureImage";
import { getOne } from "../../services/recipesService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";
function RecipeDetails() {
	const [recipe, setRecipe] = useState({});
	const recipeId = useParams().id;
	useEffect(async () => {
		let result = await getOne(recipeId);
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
			<article class="container text-center">
				<h2 className="display-3 my-5">{recipe.title}</h2>
				<p className="my-5">{recipe.description}</p>
			</article>
		</>
	);
}

export default RecipeDetails;
