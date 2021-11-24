import "./FeatureImage.css";
import SearchBar from "../SearchBar/SearchBar";

function FeatureImage({ onClickSearch }) {
	return (
		<div className="feature-image">
			<SearchBar
				onClickSearch={onClickSearch}
				placeholder="Search for meal"
			>
				Search
			</SearchBar>
		</div>
	);
}

export default FeatureImage;
