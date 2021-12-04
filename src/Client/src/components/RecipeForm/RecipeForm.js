function RecipeForm({
	handleSubmit,
	title,
	imageURI,
	description,
	minMinutes,
	maxMinutes,
}) {
	return (
		<form
			className="mx-auto col-10 col-md-8 col-lg-6 form-group"
			onSubmit={handleSubmit}
		>
			<h2>Create recipe</h2>
			<input
				type="text"
				className="form-control col-10 mx-auto"
				placeholder="Recipe title"
				name="title"
				defaultValue={title}
			></input>
			<input
				type="text"
				className="form-control col-10 mx-auto"
				placeholder="Image URI"
				name="imageURI"
				defaultValue={imageURI}
			></input>
			<textarea
				rows="5"
				className="form-control col-10 d-block m-auto"
				placeholder="Description"
				name="description"
				defaultValue={description}
			></textarea>
			<input
				type="number"
				className="form-control col-10"
				placeholder="Min minutes"
				name="minMinutes"
				defaultValue={minMinutes}
			></input>
			<input
				type="number"
				className="form-control col-10"
				placeholder="Max minutes"
				name="maxMinutes"
				defaultValue={maxMinutes}
			></input>
			<button
				type="submit"
				className="btn btn-primary col-10 col-lg-auto"
			>
				Submit
			</button>
		</form>
	);
}

export default RecipeForm;