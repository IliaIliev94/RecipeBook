import { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ totalPosts, postsPerPage, currentPage, onClickHandler }) {
	const [pagination, setPagination] = useState([]);
	useEffect(() => {
		console.log("Page: " + currentPage);
		const totalPages = Math.ceil(totalPosts / postsPerPage);
		let buttons = [];
		for (
			let i = Math.max(currentPage - 2, 1), counter = 0;
			counter < 3 && i < currentPage;
			counter++, i++
		) {
			buttons.push(
				<button
					onClick={() => onClickHandler(i)}
					className="btn btn-primary"
				>
					{i}
				</button>
			);
		}

		buttons.push(
			<button
				onClick={() => onClickHandler(currentPage)}
				className="btn btn-primary active"
			>
				{currentPage}
			</button>
		);

		for (
			let i = currentPage + 1, counter = 0;
			counter < 2 && i <= totalPages;
			counter++, i++
		) {
			console.log("success");
			buttons.push(
				<button
					onClick={() => onClickHandler(i)}
					className="btn btn-primary"
				>
					{i}
				</button>
			);
		}

		if (totalPages > 3) {
			buttons.unshift(
				<button
					onClick={() => onClickHandler(1)}
					className="btn btn-primary"
				>
					First
				</button>
			);
			buttons.push(
				<button
					onClick={() => onClickHandler(totalPages)}
					className="btn btn-primary"
				>
					Last
				</button>
			);
		}

		setPagination(buttons);
	}, [currentPage]);

	return (
		<section className="pagination-container mt-5"> {pagination} </section>
	);
}

export default Pagination;
