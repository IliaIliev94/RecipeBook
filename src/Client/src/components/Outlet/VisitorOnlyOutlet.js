import { useAuth } from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function VisitorOnlyOutlet() {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default VisitorOnlyOutlet;
