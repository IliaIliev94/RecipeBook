import "./RecipesCard.css";

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
					<button class="btn btn-primary card-button">
						Learn more
					</button>
				</div>
			</div>
		</div>
	);
}

export default RecipesCard;
