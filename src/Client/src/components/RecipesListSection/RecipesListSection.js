import { React, useState } from "react";
import { Link } from "react-router-dom";
import FeatureImage from "../FeatureImage/FeatureImage";
import RecipesCatalog from "../RecipesCatalog/RecipesCatalog";
import SearchBar from "../SearchBar/SearchBar";
import background from "../../assets/cereal-g1778f911a_1920.jpg";

function RecipesListSection() {
	const [searchQuery, setSearchQuery] = useState("");

	const onClickSearch = (searchParams) => {
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
			<div className="jumbotron">
				<h1 className="display-4">Recipe catalog.</h1>
				<p className="lead">
					You can find a selection of recipes added by other users
					here.
				</p>
				<p>You can also add your own recipe.</p>
				<p className="lead">
					<Link
						to="/recipes/create"
						className="btn btn-primary btn-lg"
						role="button"
					>
						Add recipe
					</Link>
				</p>
			</div>
			<RecipesCatalog searchParams={searchQuery} />
		</>
	);
}

export default RecipesListSection;
