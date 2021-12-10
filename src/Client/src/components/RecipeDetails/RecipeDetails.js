import FeatureImage from "../FeatureImage/FeatureImage";
import {
	getOne,
	deleteRecipe,
	likeRecipe,
	unlikeRecipe,
} from "../../services/recipesService";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./RecipeDetails.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import AuthContext from "../../contexts/AuthContext";
import RecipesCard from "../RecipesCard/RecipesCard";

function RecipeDetails() {
	const { isAuthenticated, user } = useContext(AuthContext);
	const [recipe, setRecipe] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const recipeId = useParams().id;
	const navigate = useNavigate();
	useEffect(async () => {
		try {
			let result = await getOne(recipeId);
			console.log(result);
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
		if (result === null) {
			alert("An error occupied pelase try again later!");
			return;
		}

		navigate("/");
	}

	const likeHandler = async () => {
		console.log(recipeId);
		const result = await likeRecipe(recipeId);
		if (result.ok) {
			setRecipe({
				...recipe,
				usersLiked: [...recipe.usersLiked, user.username],
			});
		}
	};

	const unlikeHandler = async () => {
		const result = await unlikeRecipe(recipeId);
		if (result.ok) {
			setRecipe({
				...recipe,
				usersLiked: recipe.usersLiked?.filter(
					(like) => like !== user.username
				),
			});
		}
	};

	if (recipe.status !== 400 && recipe.status !== 404) {
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
								<a
									onClick={deleteHandler}
									className="btn btn-danger"
								>
									Delete
								</a>
							</>
						) : isAuthenticated ? (
							!recipe.usersLiked?.includes(user.username) ? (
								<button
									onClick={likeHandler}
									className={"btn btn-success"}
								>
									Like {recipe.usersLiked?.length}
								</button>
							) : (
								<button
									onClick={unlikeHandler}
									className="btn btn-primary"
								>
									Unlike {recipe.usersLiked?.length}
								</button>
							)
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
