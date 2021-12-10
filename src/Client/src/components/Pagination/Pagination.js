import { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ totalPosts, postsPerPage, currentPage, onClickHandler }) {
	const [pagination, setPagination] = useState([]);
	useEffect(() => {
		const totalPages = Math.ceil(totalPosts / postsPerPage);
		let buttons = [];
		for (
			let i = Math.max(currentPage - 2, 1), counter = 0;
			counter < 3 && i < currentPage;
			counter++, i++
		) {
			buttons.push(createButton(i, i));
		}

		buttons.push(createButton(currentPage, currentPage, "active"));

		for (
			let i = currentPage + 1, counter = 0;
			counter < 2 && i <= totalPages;
			counter++, i++
		) {
			console.log("success");
			buttons.push(createButton(i, i));
		}

		if (totalPages > 3) {
			buttons.unshift(createButton(1, "First"));
			buttons.push(createButton(totalPages, "Last"));
		}

		setPagination(buttons);
	}, [currentPage]);

	const createButton = (page, text, isActive = "") => {
		return (
			<button
				key={text}
				onClick={() => onClickHandler(page)}
				className={"btn btn-primary " + isActive}
			>
				{text}
			</button>
		);
	};

	return (
		<section className="pagination-container mt-5"> {pagination} </section>
	);
}

export default Pagination;
