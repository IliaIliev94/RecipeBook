import { React, useState } from "react";
import FeatureImage from "../FeatureImage/FeatureImage";
import RecipesCatalog from "../RecipesCatalog/RecipesCatalog";

function Main() {
	const [searchQuery, setSearchQuery] = useState("");

	const onClickSearch = (e, searchParams) => {
		e.preventDefault();
		setSearchQuery(searchParams);
	};

	return (
		<main>
			<FeatureImage onClickSearch={onClickSearch} />
			<RecipesCatalog searchParams={searchQuery} />
		</main>
	);
}

export default Main;
