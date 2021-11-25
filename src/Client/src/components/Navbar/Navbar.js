import "./Navbar.css";
import NavItem from "../NavItem/NavItem";

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-danger px-5">
			<div className="container-fluid">
				<a className="navbar-brand mr-md-5 text-light" href="#">
					RecipeBook
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<NavItem link="/">Recipes</NavItem>
						<NavItem link="/users">Users</NavItem>
					</ul>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
						<NavItem link="/login">Login</NavItem>
						<NavItem link="/register">Register</NavItem>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
