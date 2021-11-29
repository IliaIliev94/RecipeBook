import "./App.css";
import Header from "./components/Header/Header";
import RecipesListSection from "./components/RecipesListSection/RecipesListSection";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "./services/authService";

function App() {
	const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
	useEffect(async () => {
		const result = await isAuthenticated();
		setUserIsAuthenticated(result);
	}, []);

	const authHandler = async () => {
		const result = await isAuthenticated();
		setUserIsAuthenticated(result);
	};
	return (
		<div className="App">
			<Header
				isAuthenticated={userIsAuthenticated}
				authHandler={authHandler}
			/>
			<main>
				<Routes>
					<Route path="/" element={<RecipesListSection />} />
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
						element={<CreateRecipe />}
					></Route>
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
