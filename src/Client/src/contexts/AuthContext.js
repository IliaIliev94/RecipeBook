import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authIsAuthenticated } from "../services/authService";

const avatarUrl = "/images/Avatars";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const initialState = { username: "", avatar: "" };
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [user, setUser] = useState(initialState);

	useEffect(async () => {
		try {
			const result = await authIsAuthenticated();
			console.log("auth");
			if (result !== false) {
				login(result.username, result.userImage);
			} else {
				logout();
			}
		} catch {
			navigate("/500");
		}
	}, []);

	const login = (username, avatar) => {
		setUser({ username: username, avatar: `${avatarUrl}/${avatar}` });
		setIsAuthenticated(true);
	};

	const logout = () => {
		setUser({});
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const authState = useContext(AuthContext);

	return authState;
};
