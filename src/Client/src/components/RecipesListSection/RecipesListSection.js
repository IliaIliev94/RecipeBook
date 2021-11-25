import { React, useState } from "react";
import FeatureImage from "../FeatureImage/FeatureImage";
import RecipesCatalog from "../RecipesCatalog/RecipesCatalog";
import SearchBar from "../SearchBar/SearchBar";
import background from "../../assets/cereal-g1778f911a_1920.jpg";

function RecipesListSection() {
	const [searchQuery, setSearchQuery] = useState("");

	const onClickSearch = (e, searchParams) => {
		e.preventDefault();
		setSearchQuery(searchParams);
	};

	return (
		<>
			<FeatureImage background={background} onClickSearch={onClickSearch}>
				<SearchBar
					onClickSearch={onClickSearch}
					placeholder="Search for meal"
				>
					Search
				</SearchBar>
			</FeatureImage>
			<RecipesCatalog searchParams={searchQuery} />
		</>
	);
}

export default RecipesListSection;
