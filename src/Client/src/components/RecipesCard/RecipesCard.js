import "./RecipesCard.css";
import { Link } from "react-router-dom";

function RecipesCard({ recipe, isInUserProfile = false, deleteHandler }) {
	return (
		<div className="col-lg-4 my-1">
			<div className="card h-100">
				<img
					data-testid="recipe-card-img"
					src={recipe.imageURI}
					className="card-img-top"
					alt="Recipe Image"
				/>
				<div className="card-body d-flex flex-column">
					<h5 data-testid="recipe-card-title" className="card-title">
						{recipe.title}
					</h5>
					<p
						data-testid="recipe-card-description"
						className="card-text"
					>
						{recipe.description}
					</p>
					<article className="d-flex flex-md-row flex-column justify-content-around card-body-cta mt-auto">
						<Link
							data-testid="recipes-card-details-cta"
							to={"/recipes/" + recipe.id}
							className="btn btn-primary card-button mt-3 mt-md-auto"
						>
							Details
						</Link>
						{isInUserProfile ? (
							<>
								<Link
									data-testid="recipes-card-edit-cta"
									className="btn btn-warning card-button mt-3 mt-md-0"
									to={"recipes/edit/" + recipe.id}
								>
									Edit
								</Link>
								<button
									data-testid="recipes-card-delete-cta"
									onClick={() => deleteHandler(recipe.id)}
									className="btn btn-danger card-button mt-3 mt-md-0"
								>
									Delete
								</button>
							</>
						) : (
							""
						)}
					</article>
				</div>
			</div>
		</div>
	);
}

export default RecipesCard;
