import { useEffect, useState } from "react";
import { getUserRecipes } from "../../services/recipesService";
import RecipesCard from "../RecipesCard/RecipesCard";
import Pagination from "../Pagination/Pagination";
import "./UserProfile.css";

function UserProfile({ username }) {
	const postsPerPage = 9;
	const baseAvatarUrl = require.context(
		"../../../public/images/Avatars",
		true
	);

	const [userData, setUserData] = useState({
		username: "",
		imageName: "",
		recipes: [],
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [image, setImage] = useState("");
	useEffect(async () => {
		const result = await getUserRecipes();
		setUserData(result);
	}, []);

	useEffect(() => {
		if (userData.imageName !== "") {
			setImage(baseAvatarUrl(`./${userData.imageName}`).default);
		}
	}, [userData.imageName]);

	function buttonClickHandler(page) {
		setCurrentPage(page);
	}

	const renderUserProfile = () => {
		if (userData.recipes.length > 0) {
			return (
				<div className="row d-flex align-items-stretch justify-content-center">
					{userData.recipes
						.slice(
							(currentPage - 1) * postsPerPage,
							(currentPage - 1) * postsPerPage + postsPerPage
						)
						.map((recipe) => (
							<RecipesCard recipe={recipe}></RecipesCard>
						))}
					<Pagination
						totalPosts={userData.recipes.length}
						postsPerPage={postsPerPage}
						currentPage={currentPage}
						onClickHandler={buttonClickHandler}
					/>
				</div>
			);
		} else {
			return <h2 className="text-center">No recipes yet!</h2>;
		}
	};

	return (
		<div className="container my-5">
			<h2 className="text-center">Welcome, {userData.username}</h2>
			<img className="user-avatar" src={image !== "" ? image : ""} />
			<h3>Recipes</h3>
			{renderUserProfile()}
		</div>
	);
}

export default UserProfile;
