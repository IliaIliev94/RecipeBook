import FeatureImage from "../FeatureImage/FeatureImage";
import { getOne, deleteRecipe } from "../../services/recipesService";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./RecipeDetails.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

function RecipeDetails() {
	const [recipe, setRecipe] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const recipeId = useParams().id;
	const navigate = useNavigate();
	useEffect(async () => {
		try {
			let result = await getOne(recipeId);
			if (result !== null) {
				setIsLoaded(true);
			}
			setRecipe(result);
		} catch {
			navigate("/500");
		}
	}, []);

	async function deleteHandler() {
		const result = await deleteRecipe(recipeId);
		console.log("Delete result: ");
		console.log(result);
		if (result === null) {
			alert("An error occupied pelase try again later!");
			return;
		}

		navigate("/");
	}

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
							<p className="my-5 text-justify">
								{recipe.description}
							</p>
						</article>
						<article>
							<h3>Created by:</h3>
							<Link to={"/users/" + recipe.username}>
								<img
									className="avatar"
									src={"/images/Avatars/" + recipe.userImage}
								/>
								<h3>{recipe.username}</h3>
							</Link>
						</article>
						{recipe.isOwner ? (
							<>
								<Link
									className="btn btn-primary mr-4"
									to={"/recipes/edit/" + recipeId}
								>
									Edit
								</Link>
								<button
									onClick={deleteHandler}
									className="btn btn-danger"
								>
									Delete
								</button>
							</>
						) : (
							""
						)}
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
