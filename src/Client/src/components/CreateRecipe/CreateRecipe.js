import "../Register/Register.css";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
	let navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		navigate("/");
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
