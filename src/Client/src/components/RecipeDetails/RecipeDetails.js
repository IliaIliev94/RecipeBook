import FeatureImage from "../FeatureImage/FeatureImage";
import {
	getOne,
	deleteRecipe,
	likeRecipe,
	unlikeRecipe,
} from "../../services/recipesService";
import { addComment, removeComment } from "../../services/commentsService";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./RecipeDetails.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useAuth } from "../../contexts/AuthContext";
import AddComment from "../AddComment/AddComment";
import CommentList from "../CommentList/CommentList";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";

function RecipeDetails() {
	const { isAuthenticated, user } = useAuth();
	const [recipe, setRecipe] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const recipeId = useParams().id;
	const navigate = useNavigate();
	const { currentPage, buttonClickHandler, postsPerPage } = usePagination(5);
	useEffect(() => {
		async function fetchData() {
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
		}
		fetchData();
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
		if (!result.ok) {
			navigate("/400");
			return;
		}

		setRecipe({
			...recipe,
			usersLiked: [...recipe.usersLiked, user.username],
		});
	};

	const unlikeHandler = async () => {
		const result = await unlikeRecipe(recipeId);
		if (!result.ok) {
			navigate("/400");
			return;
		}

		setRecipe({
			...recipe,
			usersLiked: recipe.usersLiked?.filter(
				(like) => like !== user.username
			),
		});
	};

	const postComment = async (message) => {
		const result = await addComment(recipeId, message);

		if (!result.ok) {
			navigate("/400");
			return;
		}

		const comment = await result.json();
		setRecipe({ ...recipe, comments: [comment, ...recipe.comments] });
	};

	const deleteComment = async (id) => {
		const result = await removeComment(id);

		if (!result.ok) {
			navigate("/400");
			return;
		}

		setRecipe({
			...recipe,
			comments: recipe.comments?.filter((comment) => comment.id !== id),
		});
	};

	const renderUserFunctionality = () => {
		if (isAuthenticated && recipe.isOwner) {
			return (
				<>
					<Link
						data-testid="recipe-details-edit-cta"
						className="btn btn-primary mr-4"
						to={"/recipes/edit/" + recipeId}
					>
						Edit
					</Link>
					<a
						data-testid="recipe-details-delete-cta"
						onClick={deleteHandler}
						className="btn btn-danger"
					>
						Delete
					</a>
				</>
			);
		}
		if (isAuthenticated) {
			return (
				<>
					{!recipe.usersLiked?.includes(user.username) ? (
						<button
							data-testid="recipe-details-like-cta"
							onClick={likeHandler}
							className={"btn btn-success"}
						>
							Like {recipe.usersLiked?.length}
						</button>
					) : (
						<button
							data-testid="recipe-details-unlike-cta"
							onClick={unlikeHandler}
							className="btn btn-primary"
						>
							Unlike {recipe.usersLiked?.length}
						</button>
					)}
					<div
						data-testid="recipe-details-add-comment-container"
						className="container my-5"
					>
						<AddComment
							avatar={user.avatar}
							submitHandler={postComment}
						/>
					</div>
				</>
			);
		}
		return "";
	};

	const renderDetails = () => {
		if (!isLoaded) {
			return <Loader />;
		}

		if (recipe.status === 400 || recipe.status === 404) {
			return (
				<Error title="404! Unexisting recipe!">
					Please try with another recipe id.
				</Error>
			);
		}

		return (
			<section className="recipe-details-container">
				<FeatureImage background={recipe.imageURI}>
					<div className="jumbotron recipe-details-card col-lg-6 col-10">
						<h1
							data-testid="recipe-details-banner-title"
							className="display-4"
						>
							{recipe.title}
						</h1>
						<hr className="my-4" />
						<p
							data-testid="recipe-details-banner-time"
							className="display-4"
						>
							{recipe.minMinutes} - {recipe.maxMinutes} minutes
						</p>
					</div>
				</FeatureImage>
				<article class="container text-center">
					<h2
						data-testid="recipe-details-title"
						className="display-3 my-5"
					>
						{recipe.title}
					</h2>
					<p
						data-testid="recipe-details-description"
						className="my-5 text-justify"
					>
						{recipe.description}
					</p>
				</article>
				<article>
					<h3>Created by:</h3>
					<Link
						data-testid="recipe-details-user-profile-cta"
						to={"/users/" + recipe.username}
					>
						<img
							data-testid="recipe-details-user-avatar"
							className="avatar"
							src={"/images/Avatars/" + recipe.userImage}
						/>
						<h3 data-testid="recipe-details-username">
							{recipe.username}
						</h3>
					</Link>
				</article>

				{renderUserFunctionality()}

				{recipe.comments?.length > 0 ? (
					<div
						data-testid="recipe-details-comments-container"
						className="container mt-5 p-5"
					>
						<h3>Comments</h3>
						{recipe.comments
							?.slice(
								(currentPage - 1) * postsPerPage,
								(currentPage - 1) * postsPerPage + postsPerPage
							)
							.map((comment) => (
								<CommentList
									comment={comment}
									deleteHandler={deleteComment}
								/>
							))}
					</div>
				) : (
					""
				)}

				<Pagination
					key={recipe.comments}
					totalPosts={recipe.comments ? recipe.comments.length : 0}
					postsPerPage={postsPerPage}
					currentPage={currentPage}
					onClickHandler={buttonClickHandler}
				/>
			</section>
		);
	};

	return renderDetails();
}

export default RecipeDetails;
