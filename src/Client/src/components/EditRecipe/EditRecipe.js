import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";
import { getOne, editRecipe } from "../../services/recipesService";
import { validateRecipe } from "../../helpers/validateHelper";

function EditRecipe() {
	const [recipeData, setRecipeData] = useState({});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const id = useParams().id;

	useEffect(async () => {
		console.log("ok");
		let result = await getOne(id);
		setRecipeData(result);
	}, []);

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

		const result = await editRecipe(
			id,
			title,
			imageURI,
			description,
			minMinutes,
			maxMinutes
		);

		if (result.status !== 200) {
			alert("Wrong input data! Try again please!");
			return;
		}

		navigate(`/recipes/${id}`);
	}
	return (
		<RecipeForm
			handleSubmit={handleSubmit}
			title={recipeData.title}
			description={recipeData.description}
			imageURI={recipeData.imageURI}
			minMinutes={recipeData.minMinutes}
			maxMinutes={recipeData.maxMinutes}
			errors={errors}
		/>
	);
}

export default EditRecipe;
