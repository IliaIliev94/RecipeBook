import { useEffect, useState } from "react";
import { getUsers } from "../../services/usersService";
import UserCard from "../UserCard/UserCard";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

function UsersCatalog() {
	const postsPerPage = 10;
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(async () => {
		const result = await getUsers();
		if (result !== null) {
			setIsLoading(false);
		}
		setUsers(result);
	}, []);

	function buttonClickHandler(page) {
		setCurrentPage(page);
	}

	const renderUsersCatalogue = () => {
		if (isLoading) {
			return <Loader />;
		} else if (users.length > 0) {
			return (
				<>
					<div className="row">
						{users
							.slice(
								(currentPage - 1) * postsPerPage,
								(currentPage - 1) * postsPerPage + postsPerPage
							)
							.map((user) => (
								<UserCard user={user} />
							))}
					</div>
					<Pagination
						totalPosts={users.length}
						postsPerPage={postsPerPage}
						currentPage={currentPage}
						onClickHandler={buttonClickHandler}
					/>
				</>
			);
		} else {
			return <h3>No users were created at this moment!</h3>;
		}
	};
	return (
		<div className="container my-5">
			<h2 className="text-center my-5">Users</h2>
			{renderUsersCatalogue()}
		</div>
	);
}

export default UsersCatalog;
