import "./FeatureImage.css";
import SearchBar from "../SearchBar/SearchBar";

function FeatureImage({ onClickSearch, children, background }) {
	return (
		<div
			style={{
				background: `url(${background})`,
			}}
			className="feature-image"
		>
			{children}
		</div>
	);
}

export default FeatureImage;
