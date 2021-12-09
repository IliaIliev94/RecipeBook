import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getUserRecipes } from "../../services/recipesService";
import RecipesCard from "../RecipesCard/RecipesCard";
import Pagination from "../Pagination/Pagination";
import "./UserProfile.css";
import AuthContext from "../../contexts/AuthContext";
import Loader from "../Loader/Loader";
import { deleteRecipe } from "../../services/recipesService";
import SearchBar from "../SearchBar/SearchBar";

function UserProfile({ isInUserProfile = false, authHandler }) {
	const postsPerPage = 9;
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState([]);
	const [searchParameter, setSearchParameter] = useState("");
	const [userData, setUserData] = useState({ username: "", imageName: "" });
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const { username } = useParams();
	const { user } = useContext(AuthContext);

	useEffect(async () => {
		try {
			const result = isInUserProfile
				? await getUserRecipes()
				: await getUserRecipes(username);
			if (result !== null) {
				setIsLoading(false);
			}
			console.log(result);
			if (result.status === 401) {
				authHandler();
				navigate("/");
			} else {
				setRecipes(result.recipes);
				setUserData({
					username: result.username,
					imageName: result.imageName,
				});
			}
		} catch {
			navigate("/500");
		}
	}, [username]);

	async function deleteHandler(id) {
		const result = await deleteRecipe(id);
		if (result.ok) {
			setRecipes(recipes.filter((recipe) => recipe.id !== id));
		} else {
			navigate("/400");
		}
	}

	function buttonClickHandler(page) {
		setCurrentPage(page);
	}

	function onClickSearch(searchParams) {
		setSearchParameter(searchParams);
	}

	function renderRecipes() {
		if (searchParameter == "") {
			return recipes;
		}
		return recipes.filter(
			(recipe) =>
				recipe.title
					.toLowerCase()
					.includes(searchParameter.toLowerCase()) ||
				recipe.description
					.toLowerCase()
					.includes(searchParameter.toLowerCase())
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
					<div className="row d-flex align-items-stretch justify-content-center">
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
						key={searchParameter}
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
					<h2 className="text-center">No recipes yet!</h2>
					<Link to="recipes/create" className="btn btn-primary">
						Add recipes!
					</Link>
				</>
			);
		}
	};

	return (
		<div className="container my-5">
			<h2 className="text-center">
				{isInUserProfile
					? `Welcome, ${user.username}`
					: userData.username}
			</h2>
			<img
				className="user-avatar"
				src={
					isInUserProfile
						? user.imageName
						: `/images/Avatars/${userData.imageName}`
				}
			/>
			<h3 className="my-5">Recipes</h3>
			{renderUserProfile()}
		</div>
	);
}

export default UserProfile;
