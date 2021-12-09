import "../Register/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../services/recipesService";
import { validateRecipe } from "../../helpers/validateHelper";
import RecipeForm from "../RecipeForm/RecipeForm";

function CreateRecipe() {
	const [errors, setErrors] = useState({});
	let navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { title, imageURI, description, minMinutes, maxMinutes } =
			Object.fromEntries(formData);

		const validationErrors = validateRecipe(
			title,
			imageURI,
			description,
			minMinutes,
			maxMinutes
		);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		let result = await createRecipe(
			title,
			imageURI,
			description,
			minMinutes,
			maxMinutes
		);

		if (result.status !== 200) {
			alert("Incorrect data try again!");
			return;
		}
		navigate("/");
	}
	return (
		<RecipeForm
			errors={errors}
			handleSubmit={handleSubmit}
			recipeData={undefined}
			page="Create"
		/>
	);
}

export default CreateRecipe;
