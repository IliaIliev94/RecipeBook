function NavItem(props) {
	return (
		<li className="nav-item">
			<a className="nav-link" aria-current="page" href="#">
				{props.children}
			</a>
		</li>
	);
}

export default NavItem;
