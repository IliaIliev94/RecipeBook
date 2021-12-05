import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipesCard from "../RecipesCard/RecipesCard";
import { getRecipes } from "../../services/recipesService";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import "../Loader/Loader.css";

function RecipesCatalog({ searchParams }) {
	const postsPerPage = 6;
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(async () => {
		try {
			let result = await getRecipes();
			setRecipes(result);
			if (result !== null) {
				setIsLoaded(true);
			}
		} catch {
			navigate("/500");
		}
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchParams]);

	function buttonClickHandler(page) {
		console.log("Page: " + page);
		setCurrentPage(page);
		console.log("Current page: " + currentPage);
	}

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
								<RecipesCard key={recipe.id} recipe={recipe} />
							))}
					</>
				);
			} else {
				return (
					<h2 className="mx-auto">
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
				<div className="row d-flex align-items-stretch">
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
