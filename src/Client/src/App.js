import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import UsersCatalog from "./components/UsersCatalog/UsersCatalog";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateOutlet from "./components/Outlet/PrivateOutlet";
import VisitorOnlyOutlet from "./components/Outlet/VisitorOnlyOutlet";
import HomePage from "./components/HomePage/HomePage";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/recipes"
							element={<RecipesListSection />}
						/>

						<Route
							path="/recipes/:id"
							element={<RecipeDetails />}
						></Route>

						<Route path="/users" element={<UsersCatalog />}></Route>
						<Route
							path="/users/:username"
							element={<UserProfile />}
						></Route>

						<Route element={<VisitorOnlyOutlet />}>
							<Route
								path="/register"
								element={<Register />}
							></Route>
							<Route path="/login" element={<Login />}></Route>
						</Route>

						<Route element={<PrivateOutlet />}>
							<Route
								path="/recipes/create"
								element={<CreateRecipe />}
							></Route>
							<Route
								path="/recipes/edit/:id"
								element={<EditRecipe />}
							></Route>
						</Route>

						<Route
							path="/400"
							element={
								<Error title="400">
									There was an error with the request!
								</Error>
							}
						>
							Bad request! There was an error with the request!
						</Route>
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
			</AuthProvider>
		</div>
	);
}

export default App;
