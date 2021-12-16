import { useEffect, useState } from "react";
import { getUsers } from "../../services/usersService";
import UserCard from "../UserCard/UserCard";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";

function UsersCatalog() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { searchQuery, onClickSearch } = useSearch();
	const { currentPage, buttonClickHandler, postsPerPage } = usePagination(
		10,
		searchQuery
	);
	useEffect(() => {
		async function fetchData() {
			const result = await getUsers();
			console.log(result);
			if (result !== null) {
				setIsLoading(false);
			}
			setUsers(result);
		}
		fetchData();
	}, []);

	const renderUsers = () => {
		if (searchQuery === "") {
			return users;
		}

		return users.filter((user) =>
			user.username.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	const renderUsersCatalogue = () => {
		if (isLoading) {
			return <Loader />;
		} else if (users?.length > 0) {
			return (
				<>
					<SearchBar placeholder="User" onClickSearch={onClickSearch}>
						Search
					</SearchBar>
					<div
						data-testid="users-catalog-users-container"
						className="row"
					>
						{renderUsers()
							.slice(
								(currentPage - 1) * postsPerPage,
								(currentPage - 1) * postsPerPage + postsPerPage
							)
							.map((user) => (
								<UserCard user={user} />
							))}
					</div>
					<Pagination
						key={searchQuery}
						totalPosts={renderUsers().length}
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
