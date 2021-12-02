import { useEffect, useState } from "react";

function Pagination({ totalPosts, postsPerPage, currentPage, onClickHandler }) {
	const [pagination, setPagination] = useState([]);
	useEffect(() => {
		console.log("Total posts: " + totalPosts);
		const totalPages = Math.ceil(totalPosts / postsPerPage);
		let buttons = [];
		for (
			let i = Math.max(currentPage - 3, 1), counter = 0;
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
				className="btn btn-primary"
			>
				{currentPage}
			</button>
		);

		for (
			let i = currentPage + 1, counter = 0;
			counter < 3 && i <= totalPages;
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

		setPagination(buttons);
	}, []);

	return <div> {pagination} </div>;
}

export default Pagination;
