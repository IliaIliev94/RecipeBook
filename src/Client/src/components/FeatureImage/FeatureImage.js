import "./FeatureImage.css";

function FeatureImage({ children, background }) {
	return (
		<div
			data-testid="feature-image-background"
			style={{
				background: `url("${background}") no-repeat center center fixed`,
			}}
			className="feature-image"
		>
			{children}
		</div>
	);
}

export default FeatureImage;
