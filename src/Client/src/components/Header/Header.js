import "./Header.css";
import Navbar from "../Navbar/Navbar";

function Header({ authHandler }) {
	return (
		<header>
			<Navbar authHandler={authHandler} />
		</header>
	);
}

export default Header;
