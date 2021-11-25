import { React, useState } from "react";
import FeatureImage from "../FeatureImage/FeatureImage";
import RecipesCatalog from "../RecipesCatalog/RecipesCatalog";

function RecipesListSection() {
	const [searchQuery, setSearchQuery] = useState("");

	const onClickSearch = (e, searchParams) => {
		e.preventDefault();
		setSearchQuery(searchParams);
	};

	return (
		<>
			<FeatureImage onClickSearch={onClickSearch} />
			<RecipesCatalog searchParams={searchQuery} />
		</>
	);
}

export default RecipesListSection;
