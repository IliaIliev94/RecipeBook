import "./Navbar.css";
import NavItem from "../NavItem/NavItem";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, authHandler }) {
	const navigate = useNavigate();
	const logoutUser = async () => {
		const result = await logout();
		await authHandler();
		navigate("/");
		console.log(result);
	};

	const userAuthenticationSection = () => {
		console.log(isAuthenticated);
		if (!isAuthenticated) {
			return (
				<>
					<NavItem link="/login">Login</NavItem>
					<NavItem link="/register">Register</NavItem>
				</>
			);
		} else {
			return (
				<li href="#" className="nav-item" onClick={logoutUser}>
					<a className="nav-link" aria-current="page">
						Logout
					</a>
				</li>
			);
		}
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-danger px-5">
			<div className="container-fluid">
				<a className="navbar-brand mr-md-5 text-light" href="#">
					RecipeBook
				</a>
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
						<NavItem link="/">Recipes</NavItem>
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
