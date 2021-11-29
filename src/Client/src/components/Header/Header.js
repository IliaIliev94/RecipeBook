import "./Header.css";
import Navbar from "../Navbar/Navbar";

function Header({ isAuthenticated, authHandler }) {
	return (
		<header>
			<Navbar
				isAuthenticated={isAuthenticated}
				authHandler={authHandler}
			/>
		</header>
	);
}

export default Header;
