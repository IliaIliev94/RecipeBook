import { useAuth } from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function PrivateOutlet() {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
