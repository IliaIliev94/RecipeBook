import FeatureImage from "../FeatureImage/FeatureImage";
import getRecipes from "../../services/recipesService";
import { useEffect, useState } from "react";
function RecipeDetails({ match }) {
	const [recipe, setRecipe] = useState({});
	useEffect(async () => {
		const result = await getRecipes();
	});
	return <FeatureImage background></FeatureImage>;
}
