import "./CommentList.css";
import { useAuth } from "../../contexts/AuthContext";

function CommentList({ comment }) {
	const { user } = useAuth();
	return (
		<div class="container mt-5">
			<div class="d-flex justify-content-center row">
				<div class="col-md-8">
					<div class="d-flex flex-column comment-section">
						<div class="bg-white p-2">
							<div class="d-flex flex-row user-info">
								<img
									class="rounded-circle"
									src={"/images/Avatars/" + comment.userImage}
									width="40"
								/>
								<div class="d-flex flex-column justify-content-start ml-2">
									<span class="d-block font-weight-bold name">
										{comment.username}
									</span>
									<span class="date text-black-50">
										{comment.date}
									</span>
								</div>
							</div>
							<div class="mt-2">
								<p class="comment-text">{comment.message}</p>
							</div>
							{user.username == comment.username ? (
								<button className="btn btn-danger">
									Delete
								</button>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CommentList;
