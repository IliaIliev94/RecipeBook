import { Link } from "react-router-dom";
import "./Error.css";

function Error({ title, children }) {
	return (
		<div class="container error-container">
			<div class="row">
				<div class="col-md-12">
					<div class="error-template">
						<h1>Oops!</h1>
						<h2>{title}</h2>
						<div class="error-details">{children}</div>
						<div class="error-actions">
							<Link to="/" class="btn btn-primary btn-lg">
								<span class="glyphicon glyphicon-home"></span>
								Take Me Home{" "}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Error;
