import "../Register/Register.css";
function RecipeForm({
	handleSubmit,
	title,
	imageURI,
	description,
	minMinutes,
	maxMinutes,
	errors,
	page,
}) {
	return (
		<form
			className="mx-auto col-10 col-md-8 col-lg-6 form-group"
			onSubmit={handleSubmit}
		>
			<h2>{page} recipe</h2>
			<div className="register-form-inputs">
				<div className="col-10 text-left mx-auto">
					<label for="title">Title</label>
					<input
						type="text"
						className="form-control"
						placeholder="Recipe title"
						name="title"
						id="title"
						defaultValue={title}
					></input>
					{errors.title && (
						<p className="form-error">{errors.title}</p>
					)}
				</div>
				<div className="col-10 text-left mx-auto">
					<label for="imageURI">Image URL</label>
					<input
						type="text"
						className="form-control"
						placeholder="Image URI"
						name="imageURI"
						id="imageURI"
						defaultValue={imageURI}
					></input>
					{errors.imageURI && (
						<p className="form-error">{errors.imageURI}</p>
					)}
				</div>
				<div className="col-10 text-left mx-auto">
					<label for="description">Description</label>
					<textarea
						rows="5"
						className="form-control"
						placeholder="Description"
						name="description"
						id="description"
						defaultValue={description}
					></textarea>
					{errors.description && (
						<p className="form-error">{errors.description}</p>
					)}
				</div>
				<div className="col-10 text-left mx-auto">
					<label for="minMinutes">Minimum minutes</label>
					<input
						type="number"
						className="form-control"
						placeholder="Min minutes"
						name="minMinutes"
						id="minMinutes"
						defaultValue={minMinutes}
					></input>
					{errors.minMinutes && (
						<p className="form-error">{errors.minMinutes}</p>
					)}
				</div>
				<div className="col-10 text-left mx-auto">
					<label for="maxMinutes">Maximum minutes</label>
					<input
						type="number"
						className="form-control"
						placeholder="Max minutes"
						name="maxMinutes"
						id="maxMinutes"
						defaultValue={maxMinutes}
					></input>
					{errors.maxMinutes && (
						<p className="form-error">{errors.maxMinutes}</p>
					)}
				</div>
				<button
					type="submit"
					className="btn btn-primary col-10 col-lg-auto"
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default RecipeForm;
