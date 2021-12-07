import UserCard from "../UserCard/UserCard";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/usersService";

function UsersCatalog() {
	const [users, setUsers] = useState([]);
	useEffect(async () => {
		const result = await getUsers();
		setUsers(result);
	}, []);
	return (
		<div className="container my-5">
			<h2 className="text-center my-5">Users</h2>
			<div className="row">
				{users.map((user) => (
					<UserCard user={user} />
				))}
			</div>
		</div>
	);
}

export default UsersCatalog;
