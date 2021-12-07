import "./HomeCard.css";

function HomeCard({ title, icon, children }) {
	return (
		<div className="col-md-4">
			<div className="card home-card card-custom bg-white">
				<div
					className="card-custom-img"
					style={{
						background:
							"url(http://res.cloudinary.com/d3/image/upload/c_scale,q_auto:good,w_1110/trianglify-v1-cs85g_cc5d2i.jpg)",
					}}
				></div>
				<div class="card-custom-avatar">{icon}</div>
				<div className="card-body" style={{ overflowY: "auto" }}>
					<h4 className="card-title">{title}</h4>
					<p className="card-text">{children}</p>
				</div>
			</div>
		</div>
	);
}

export default HomeCard;
