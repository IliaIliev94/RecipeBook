import FeatureImage from "../FeatureImage/FeatureImage";
import { getOne } from "../../services/recipesService";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RecipeDetails.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

function RecipeDetails() {
	const [recipe, setRecipe] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const recipeId = useParams().id;
	useEffect(async () => {
		let result = await getOne(recipeId);
		console.log(result);
		if (result !== null) {
			setIsLoaded(true);
		}
		setRecipe(result);
		console.log(recipe);
	}, []);
	if (recipe.status !== 404) {
		return (
			<>
				{isLoaded ? (
					<>
						<FeatureImage background={recipe.imageURI}>
							<div className="jumbotron recipe-details-card col-lg-6 col-10">
								<h1 className="display-4">{recipe.title}</h1>
								<hr className="my-4" />
								<p className="display-4">
									{recipe.minMinutes} - {recipe.maxMinutes}{" "}
									minutes
								</p>
							</div>
						</FeatureImage>
						<article class="container text-center">
							<h2 className="display-3 my-5">{recipe.title}</h2>
							<p className="my-5">{recipe.description}</p>
						</article>
						<Link to={"/recipes/edit/" + recipeId}>Edit</Link>
					</>
				) : (
					<Loader></Loader>
				)}
			</>
		);
	} else {
		return (
			<Error title="404! Unexisting recipe!">
				Please try with another recipe id.
			</Error>
		);
	}
}

export default RecipeDetails;
