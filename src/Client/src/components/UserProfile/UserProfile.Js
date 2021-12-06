import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserRecipes } from "../../services/recipesService";
import RecipesCard from "../RecipesCard/RecipesCard";
import Pagination from "../Pagination/Pagination";
import "./UserProfile.css";
import AuthContext from "../../contexts/AuthContext";

function UserProfile({ username }) {
	const postsPerPage = 9;
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const { user } = useContext(AuthContext);
	useEffect(async () => {
		try {
			const result = await getUserRecipes();
			setRecipes(result);
		} catch {
			navigate("/500");
		}
	}, []);

	function buttonClickHandler(page) {
		setCurrentPage(page);
	}

	const renderUserProfile = () => {
		if (recipes.length > 0) {
			return (
				<div className="row d-flex align-items-stretch justify-content-center">
					{recipes
						.slice(
							(currentPage - 1) * postsPerPage,
							(currentPage - 1) * postsPerPage + postsPerPage
						)
						.map((recipe) => (
							<RecipesCard recipe={recipe}></RecipesCard>
						))}
					<Pagination
						totalPosts={recipes.length}
						postsPerPage={postsPerPage}
						currentPage={currentPage}
						onClickHandler={buttonClickHandler}
					/>
				</div>
			);
		} else {
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
			<h2 className="text-center">Welcome, {user.username}</h2>
			<img className="user-avatar" src={user.imageName} />
			<h3>Recipes</h3>
			{renderUserProfile()}
		</div>
	);
}

export default UserProfile;
