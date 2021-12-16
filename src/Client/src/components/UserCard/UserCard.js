import "./UserCard.css";
import { Link } from "react-router-dom";

function UserCard({ user: { imageName, username, recipesCount } }) {
	return (
		<div className="col-12 col-md-6 my-2">
			<div className="card">
				<div className="row no-gutters">
					<div className="col-sm-5 card-profile">
						<img
							className="avatar card-profile-img mt-auto"
							src={"/images/Avatars/" + imageName}
							alt="user avatar"
						/>
					</div>
					<div className="col-sm-7">
						<div className="card-body">
							<h5 className="card-title">{username}</h5>
							<p className="card-text">Recipes: {recipesCount}</p>
							<Link
								to={"/users/" + username}
								className="btn btn-primary"
							>
								View Profile
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserCard;
