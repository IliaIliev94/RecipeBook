import "./RecipesCard.css";
import { Link } from "react-router-dom";

function RecipesCard({ recipe }) {
	return (
		<div className="col-lg-4 m-1">
			<div className="card h-100">
				<img
					src={recipe.imageURI}
					className="card-img-top"
					alt="Recipe Image"
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">{recipe.title}</h5>
					<p className="card-text">{recipe.description}</p>
					<Link
						to={"/recipes/" + recipe.id}
						className="btn btn-primary card-button"
					>
						Learn more
					</Link>
				</div>
			</div>
		</div>
	);
}

export default RecipesCard;
