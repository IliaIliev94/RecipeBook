import "./SearchBar.css";

function SearchBar(props) {
	return (
		<form
			action="#"
			className="h-100"
			onSubmit={(e) => {
				e.preventDefault();
				const searchInput = new FormData(e.currentTarget).get(
					"searchInput"
				);
				props.onClickSearch(searchInput);
			}}
		>
			<div className="feature-image-searchbar input-group mb-3 col-md-10 p-5">
				<input
					type="text"
					className="form-control"
					placeholder={props.placeholder}
					aria-label="Recipient's username"
					aria-describedby="button-addon2"
					name="searchInput"
				/>
				<button
					className="btn btn-primary"
					type="submit"
					id="button-addon2"
				>
					{props.children}
				</button>
			</div>
		</form>
	);
}

export default SearchBar;
