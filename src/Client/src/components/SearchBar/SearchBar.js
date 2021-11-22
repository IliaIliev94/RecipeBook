import "./SearchBar.css";

function SearchBar(props) {
	return (
		<div class="feature-image-searchbar input-group mb-3 col-md-10 p-5">
			<input
				type="text"
				className="form-control"
				placeholder={props.placeholder}
				aria-label="Recipient's username"
				aria-describedby="button-addon2"
			/>
			<button
				className="btn btn-primary"
				type="button"
				id="button-addon2"
			>
				{props.children}
			</button>
		</div>
	);
}

export default SearchBar;
