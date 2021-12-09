import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "./services/authService";
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
import GuestPage from "./components/GuestPage/GuestPage";
import UsersCatalog from "./components/UsersCatalog/UsersCatalog";
import AuthContext from "./contexts/AuthContext";
import Loader from "./components/Loader/Loader";

function App() {
	const navigate = useNavigate();
	const [userIsAuthenticated, setUserIsAuthenticated] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
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

			setIsLoading(false);
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
				{!isLoading ? (
					<>
						<Header authHandler={authHandler} />
						<main>
							<Routes>
								<Route
									path="/"
									element={
										!userIsAuthenticated ? (
											<GuestPage />
										) : (
											<UserProfile
												isInUserProfile={true}
												authHandler={authHandler}
											/>
										)
									}
								/>
								<Route
									path="/recipes"
									element={<RecipesListSection />}
								/>
								<Route
									path="/register"
									element={
										userIsAuthenticated ? (
											<Navigate to="/" />
										) : (
											<Register
												authHandler={authHandler}
											/>
										)
									}
								></Route>
								<Route
									path="/login"
									element={
										userIsAuthenticated ? (
											<Navigate to="/" />
										) : (
											<Login authHandler={authHandler} />
										)
									}
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
											<Navigate to="/login" />
										)
									}
								></Route>
								<Route
									path="/recipes/edit/:id"
									element={
										userIsAuthenticated ? (
											<EditRecipe />
										) : (
											<Error title="401">
												Unauthorized
											</Error>
										)
									}
								></Route>
								<Route
									path="/users"
									element={<UsersCatalog />}
								></Route>
								<Route
									path="/users/:username"
									element={<UserProfile />}
								></Route>
								<Route path="/400">
									Bad request! There was an error with the
									request!
								</Route>
								<Route
									path="/500"
									element={
										<Error title="500">
											Either the server is down or there
											is an error with the request!
										</Error>
									}
								></Route>
								<Route
									path="*"
									element={
										<Error title="404">Not Found!</Error>
									}
								></Route>
							</Routes>
						</main>
						<Footer />
					</>
				) : (
					<Loader />
				)}
			</div>
		</AuthContext.Provider>
	);
}

export default App;
