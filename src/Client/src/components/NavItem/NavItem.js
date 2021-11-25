import { Link } from "react-router-dom";

function NavItem(props) {
	return (
		<li className="nav-item">
			<Link to={props.link} className="nav-link" aria-current="page">
				{props.children}
			</Link>
		</li>
	);
}

export default NavItem;
