import "./SearchBar.css";

function SearchBar({ placeholder, children, onClickSearch }) {
	return (
		<form
			action="#"
			className="h-100"
			onSubmit={(e) => {
				e.preventDefault();
				const searchInput = new FormData(e.currentTarget).get(
					"searchInput"
				);
				onClickSearch(searchInput);
			}}
		>
			<div className="feature-image-searchbar input-group mb-3 col-md-10 p-5">
				<input
					type="text"
					className="form-control"
					placeholder={placeholder}
					aria-label="Recipient's username"
					aria-describedby="button-addon2"
					name="searchInput"
				/>
				<button
					className="btn btn-primary"
					type="submit"
					id="button-addon2"
				>
					{children}
				</button>
			</div>
		</form>
	);
}

export default SearchBar;
