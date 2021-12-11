import { useState, useEffect } from "react";

function usePagination(postsPerPage, searchQuery) {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const buttonClickHandler = (page) => {
		setCurrentPage(page);
	};

	return { currentPage, buttonClickHandler, postsPerPage };
}

export default usePagination;
