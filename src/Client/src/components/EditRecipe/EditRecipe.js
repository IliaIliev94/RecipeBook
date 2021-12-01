import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";
import { getOne, editRecipe } from "../../services/recipesService";

function EditRecipe() {
	const [recipeData, setRecipeData] = useState({});
	const id = useParams().id;
	useEffect(async () => {
		console.log("ok");
		let result = await getOne(id);
		console.log(result);
		setRecipeData(result);
	});

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
		const result = editRecipe(id);
		console.log(result);
	}
	return (
		<RecipeForm
			handleSubmit={handleSubmit}
			title={recipeData.title}
			description={recipeData.description}
			imageURI={recipeData.imageURI}
			minMinutes={recipeData.minMinutes}
			maxMinutes={recipeData.maxMinutes}
		/>
	);
}

export default EditRecipe;
