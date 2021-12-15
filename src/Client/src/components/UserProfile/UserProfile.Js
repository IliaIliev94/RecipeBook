import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getUserRecipes } from "../../services/recipesService";
import RecipesCard from "../RecipesCard/RecipesCard";
import Pagination from "../Pagination/Pagination";
import "./UserProfile.css";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader/Loader";
import { deleteRecipe } from "../../services/recipesService";
import SearchBar from "../SearchBar/SearchBar";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";

function UserProfile({ isInUserProfile = false }) {
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState([]);
	const { searchQuery, onClickSearch } = useSearch();
	const [userData, setUserData] = useState({ username: "", imageName: "" });
	const [isLoading, setIsLoading] = useState(true);
	const { username } = useParams();
	const { user, logout } = useAuth();
	const { currentPage, buttonClickHandler, postsPerPage } = usePagination(
		9,
		searchQuery
	);

	useEffect(() => {
		async function fetchData() {
			const result = isInUserProfile
				? await getUserRecipes()
				: await getUserRecipes(username);
			if (result !== null) {
				setIsLoading(false);
			}
			if (result.status === 401) {
				logout();
				navigate("/");
			} else {
				setRecipes(result.recipes);
				setUserData({
					username: result.username,
					imageName: result.imageName,
				});
			}
		}
		fetchData();
	}, [username]);

	async function deleteHandler(id) {
		const result = await deleteRecipe(id);
		if (result.ok) {
			setRecipes(recipes.filter((recipe) => recipe.id !== id));
		} else {
			navigate("/400");
		}
	}

	function renderRecipes() {
		if (searchQuery == "") {
			return recipes;
		}
		return recipes.filter(
			(recipe) =>
				recipe.title
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				recipe.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);
	}

	const renderUserProfile = () => {
		if (isLoading) {
			return <Loader></Loader>;
		}
		if (recipes.length > 0) {
			return (
				<>
					<SearchBar
						placeholder="Recipe"
						onClickSearch={onClickSearch}
					>
						Search
					</SearchBar>
					<div
						data-testid="user-recipes-container"
						className="row d-flex align-items-stretch justify-content-center"
					>
						{renderRecipes()
							.slice(
								(currentPage - 1) * postsPerPage,
								(currentPage - 1) * postsPerPage + postsPerPage
							)
							.map((recipe) => (
								<RecipesCard
									isInUserProfile={isInUserProfile}
									recipe={recipe}
									deleteHandler={deleteHandler}
								></RecipesCard>
							))}
					</div>
					<Pagination
						key={searchQuery}
						totalPosts={renderRecipes().length}
						postsPerPage={postsPerPage}
						currentPage={currentPage}
						onClickHandler={buttonClickHandler}
					/>
				</>
			);
		} else if (recipes.length <= 0 && isInUserProfile) {
			return (
				<>
					<h2 data-testid="profile-heading" className="text-center">
						No recipes yet!
					</h2>
					<Link
						data-testid="add-recipe-cta"
						to="recipes/create"
						className="btn btn-primary"
					>
						Add recipes!
					</Link>
				</>
			);
		}
	};

	return (
		<div className="container my-5">
			<h2
				data-testid="user-profile-welcome-heading"
				className="text-center"
			>
				{isInUserProfile
					? `Welcome, ${user.username}`
					: userData.username}
			</h2>
			<img
				data-testid="user-profile-avatar"
				className="user-avatar"
				src={
					isInUserProfile
						? user.avatar
						: `/images/Avatars/${userData.imageName}`
				}
			/>
			<h3 className="my-5">Recipes</h3>
			{renderUserProfile()}
		</div>
	);
}

export default UserProfile;
