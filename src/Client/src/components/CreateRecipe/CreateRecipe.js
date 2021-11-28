import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../services/recipesService";

function CreateRecipe() {
	let navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = formData.get("title");
		const imageURI = formData.get("imageURI");
		const description = formData.get("description");
		const minMinutes = formData.get("minMinutes");
		const maxMinutes = formData.get("maxMinutes");
		let result = await createRecipe(
			title,
			imageURI,
			description,
			minMinutes,
			maxMinutes
		);
		console.log(result);
		//navigate("/");
	}
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
			></input>
			<input
				type="text"
				className="form-control col-10 mx-auto"
				placeholder="Image URI"
				name="imageURI"
			></input>
			<textarea
				rows="5"
				className="form-control col-10 d-block m-auto"
				placeholder="Description"
				name="description"
			></textarea>
			<input
				type="number"
				className="form-control col-10"
				placeholder="Min minutes"
				name="minMinutes"
			></input>
			<input
				type="number"
				className="form-control col-10"
				placeholder="Max minutes"
				name="maxMinutes"
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

export default CreateRecipe;
