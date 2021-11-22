function RecipesCard(props) {
	return (
		<div class="col-md-4 mx-1">
			<div class="card h-100">
				<img
					src={props.image}
					class="card-img-top h-100"
					alt="Recipe Image"
				/>
				<div class="card-body">
					<h5 class="card-title">{props.title}</h5>
					<p class="card-text">{props.children}</p>
					<button class="btn btn-primary">Learn more</button>
				</div>
			</div>
		</div>
	);
}

export default RecipesCard;
