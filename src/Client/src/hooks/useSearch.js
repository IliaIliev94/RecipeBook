import { useState } from "react";

function useSearch() {
	const [searchQuery, setSearchQuery] = useState("");

	const onClickSearch = (searchParams) => {
		setSearchQuery(searchParams);
	};

	return { searchQuery, onClickSearch };
}

export default useSearch;
