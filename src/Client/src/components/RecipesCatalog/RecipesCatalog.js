import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipesCard from "../RecipesCard/RecipesCard";
import {
	getRecipes,
	likeRecipe,
	unlikeRecipe,
} from "../../services/recipesService";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import "../Loader/Loader.css";
import usePagination from "../../hooks/usePagination";

function RecipesCatalog({ searchParams }) {
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const { currentPage, buttonClickHandler, postsPerPage } = usePagination(
		6,
		searchParams
	);

	useEffect(() => {
		async function fetchData() {
			try {
				let result = await getRecipes();
				console.log(result);
				setRecipes(result);
				setIsLoaded(true);
			} catch {
				navigate("/500");
			}
		}
		fetchData();
	}, []);

	const likeHandler = async (recipeId, username) => {
		const result = await likeRecipe(recipeId);
		if (!result.ok) {
			navigate("/400");
			return;
		}
		const recipesCopy = [...recipes];
		const recipe = recipesCopy.filter(
			(recipe) => recipe.id === recipeId
		)[0];
		recipe.usersLiked?.push(username);
		setRecipes([...recipesCopy]);
	};

	const unlikeHandler = async (recipeId, username) => {
		console.log(username);
		const result = await unlikeRecipe(recipeId);
		if (!result.ok) {
			navigate("/400");
			return;
		}
		const recipesCopy = [...recipes];
		const recipe = recipesCopy.filter(
			(recipe) => recipe.id === recipeId
		)[0];
		console.log(recipe);
		recipe.usersLiked = recipe.usersLiked?.filter(
			(like) => like != username
		);
		setRecipes([...recipesCopy]);
	};

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

	const renderCatalog = () => {
		if (isLoaded) {
			if (recipesToDisplay.length > 0) {
				return (
					<>
						{recipesToDisplay
							.slice(
								(currentPage - 1) * postsPerPage,
								(currentPage - 1) * postsPerPage + postsPerPage
							)
							.map((recipe) => (
								<RecipesCard
									key={recipe.id}
									recipe={recipe}
									likeHandler={likeHandler}
									unlikeHandler={unlikeHandler}
								/>
							))}
					</>
				);
			} else {
				return (
					<h2
						data-testid="recipes-catalog-no-recipes"
						className="mx-auto"
					>
						No recipes yet! You can add some!
					</h2>
				);
			}
		} else {
			return <Loader />;
		}
	};

	return (
		<>
			<h2 className="mt-4">Recipes</h2>
			<div className="container my-5">
				<div
					data-testid="recipes-catalog-container"
					className="row d-flex align-items-stretch"
				>
					{renderCatalog()}
				</div>
				{recipesToDisplay.length > 0 ? (
					<Pagination
						key={searchParams}
						totalPosts={recipesToDisplay.length}
						postsPerPage={postsPerPage}
						currentPage={currentPage}
						onClickHandler={buttonClickHandler}
					/>
				) : (
					""
				)}
			</div>
		</>
	);
}

export default RecipesCatalog;
