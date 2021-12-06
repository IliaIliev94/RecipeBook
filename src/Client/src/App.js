import "./App.css";
import Header from "./components/Header/Header";
import RecipesListSection from "./components/RecipesListSection/RecipesListSection";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import Error from "./components/Error/Error";
import UserProfile from "./components/UserProfile/UserProfile.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { isAuthenticated } from "./services/authService";
import AuthContext from "./contexts/AuthContext";

function App() {
	const navigate = useNavigate();
	const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
	const [user, setUser] = useState({ username: "", imageName: "" });

	useEffect(async () => {
		try {
			const result = await isAuthenticated();
			if (result !== false) {
				setUserIsAuthenticated(true);
				setUser({
					username: result.username,
					imageName: `/images/Avatars/${result.userImage}`,
				});
			} else {
				setUserIsAuthenticated(false);
			}
		} catch {
			navigate("/500");
		}
	}, []);

	const authHandler = async () => {
		const result = await isAuthenticated();
		if (result !== false) {
			setUserIsAuthenticated(true);
			setUser({
				username: result.username,
				imageName: `/images/Avatars/${result.userImage}`,
			});
		} else {
			setUserIsAuthenticated(false);
		}
	};
	return (
		<AuthContext.Provider
			value={{ isAuthenticated: userIsAuthenticated, user }}
		>
			<div className="App">
				<Header authHandler={authHandler} />
				<main>
					<Routes>
						<Route
							path="/"
							element={isAuthenticated ? <UserProfile /> : ""}
						/>
						<Route
							path="/recipes"
							element={<RecipesListSection />}
						/>
						<Route
							path="/register"
							element={<Register authHandler={authHandler} />}
						></Route>
						<Route
							path="/login"
							element={<Login authHandler={authHandler} />}
						></Route>
						<Route
							path="/recipes/:id"
							element={<RecipeDetails />}
						></Route>
						<Route
							path="/recipes/create"
							element={
								userIsAuthenticated ? (
									<CreateRecipe />
								) : (
									<Error title="401">Unauthorized!</Error>
								)
							}
						></Route>
						<Route
							path="/recipes/edit/:id"
							element={
								userIsAuthenticated ? (
									<EditRecipe />
								) : (
									<Error title="401">Unauthorized</Error>
								)
							}
						></Route>
						<Route
							path="/500"
							element={
								<Error title="500">
									Either the server is down or there is an
									error with the request!
								</Error>
							}
						></Route>
						<Route
							path="*"
							element={<Error title="404">Not Found!</Error>}
						></Route>
					</Routes>
				</main>
				<Footer />
			</div>
		</AuthContext.Provider>
	);
}

export default App;
