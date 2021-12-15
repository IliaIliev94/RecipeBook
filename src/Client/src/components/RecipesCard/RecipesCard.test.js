import React, { useContext } from "react";
import {
	render,
	cleanup,
	findByTestId,
	waitFor,
	getByTestId,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipesCard";

const recipe = {
	id: "1",
	title: "Test1",
	imageURI:
		"https://www.rabbitandwolves.com/wp-content/uploads/2020/01/Vegan-Harissa-White-Bean-Stew0464.jpg",
	description: "Example description",
	minMinutes: 70,
	maxMinutes: 110,
};

describe("RecipesCard", () => {
	afterEach(() => {
		cleanup();
	});

	test("component renders successfully", () => {
		const component = render(
			<MemoryRouter>
				<RecipeCard
					recipe={recipe}
					deleteHandler={() => {
						return;
					}}
				/>
			</MemoryRouter>
		);
		expect(component).toBeTruthy();
	});

	test("component renders correctly", () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<RecipeCard
					recipe={recipe}
					deleteHandler={() => {
						return;
					}}
				/>
			</MemoryRouter>
		);

		const image = getByTestId("recipe-card-img");
		const title = getByTestId("recipe-card-title");
		const description = getByTestId("recipe-card-description");

		expect(image).toHaveAttribute("src", recipe.imageURI);
		expect(title).toHaveTextContent(recipe.title);
		expect(description).toHaveTextContent(recipe.description);
	});
});
