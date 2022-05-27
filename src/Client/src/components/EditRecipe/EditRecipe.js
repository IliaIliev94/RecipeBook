import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";
import { getOne, editRecipe } from "../../services/recipesService";
import { validateRecipe } from "../../helpers/validateHelper";
import Loader from "../Loader/Loader";

function EditRecipe() {
    const [recipeData, setRecipeData] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        try {
            async function fetchRecipe() {
                let result = await getOne(id);
                setIsLoaded(true);
                setRecipeData(result);
            }
            fetchRecipe();
        } catch {
            navigate("/500");
        }
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

        const result = await editRecipe(id, title, imageURI, description, minMinutes, maxMinutes);

        if (result.status !== 200) {
            alert("Wrong input data! Try again please!");
            return;
        }

        navigate(`/recipes/${id}`);
    }
    return (
        <>
            {isLoaded ? (
                <RecipeForm
                    handleSubmit={handleSubmit}
                    title={recipeData.title}
                    description={recipeData.description}
                    imageURI={recipeData.imageURI}
                    minMinutes={recipeData.minMinutes}
                    maxMinutes={recipeData.maxMinutes}
                    errors={errors}
                    page="Edit"
                />
            ) : (
                <Loader />
            )}
        </>
    );
}

export default EditRecipe;
