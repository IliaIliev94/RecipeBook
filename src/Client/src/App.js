import "./App.css";
import Header from "./components/Header/Header";
import RecipesListSection from "./components/RecipesListSection/RecipesListSection";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<RecipesListSection />} />
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/recipes/:id"></Route>
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
