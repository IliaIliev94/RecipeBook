import "./RecipesCard.css";
import { Link } from "react-router-dom";

function RecipesCard({ recipe }) {
	return (
		<div class="col-lg-4 m-1">
			<div class="card h-100">
				<img
					src={recipe.imageURI}
					class="card-img-top"
					alt="Recipe Image"
				/>
				<div class="card-body d-flex flex-column">
					<h5 class="card-title">{recipe.title}</h5>
					<p class="card-text">{recipe.description}</p>
					<Link
						to={"/games/" + recipe.id}
						class="btn btn-primary card-button"
					>
						Learn more
					</Link>
				</div>
			</div>
		</div>
	);
}

export default RecipesCard;
