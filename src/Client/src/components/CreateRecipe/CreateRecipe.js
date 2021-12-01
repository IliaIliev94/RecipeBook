import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../services/recipesService";
import RecipeForm from "../RecipeForm/RecipeForm";

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
		if (title.length > 50) {
			alert("Title must be less than 50 characters!");
			return;
		}
		let result = await createRecipe(
			title,
			imageURI,
			description,
			minMinutes,
			maxMinutes
		);
		console.log(result);
		console.log("Result: " + result);

		if (result.status !== 200) {
			alert("Incorrect data try again!");
			return;
		}
		navigate("/");
	}
	return <RecipeForm handleSubmit={handleSubmit} recipeData={undefined} />;
}

export default CreateRecipe;
