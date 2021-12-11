import "./Navbar.css";
import NavItem from "../NavItem/NavItem";
import { authLogout } from "../../services/authService";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar({ authHandler }) {
	const { isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const logoutUser = async (e) => {
		e.preventDefault();
		const result = await authLogout();

		if (result.ok) {
			logout();
			navigate("/");
		}
	};

	const userAuthenticationSection = () => {
		if (!isAuthenticated) {
			return (
				<>
					<NavItem link="/login">Login</NavItem>
					<NavItem link="/register">Register</NavItem>
				</>
			);
		} else {
			return (
				<li className="nav-item" onClick={logoutUser}>
					<a href="/" className="nav-link" aria-current="page">
						Logout
					</a>
				</li>
			);
		}
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-danger px-5">
			<div className="container-fluid">
				<Link className="navbar-brand mr-md-5 text-light" to="/">
					RecipeBook
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<NavItem link="/recipes">Recipes</NavItem>
						{isAuthenticated ? (
							<NavItem link="/recipes/create">
								Create recipe
							</NavItem>
						) : (
							""
						)}

						<NavItem link="/users">Users</NavItem>
					</ul>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
						{userAuthenticationSection()}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
