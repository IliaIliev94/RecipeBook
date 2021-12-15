import React, { useContext } from "react";
import {
	render,
	cleanup,
	findByTestId,
	waitFor,
	getByTestId,
	fireEvent,
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

	test("cta render correctly and redirect to correct pages", () => {
		const deleteHandler = jest.fn(() => console.log("delete"));
		const { getByTestId } = render(
			<MemoryRouter>
				<RecipeCard
					recipe={recipe}
					isInUserProfile={true}
					deleteHandler={deleteHandler}
				/>
			</MemoryRouter>
		);

		const detailsCta = getByTestId("recipes-card-details-cta");
		const editCta = getByTestId("recipes-card-edit-cta");
		const deleteCta = getByTestId("recipes-card-delete-cta");

		expect(detailsCta).toHaveTextContent("Details");
		expect(detailsCta).toHaveAttribute("href", "/recipes/" + recipe.id);
		expect(editCta).toHaveTextContent("Edit");
		expect(editCta).toHaveAttribute("href", "/recipes/edit/" + recipe.id);
		expect(deleteCta).toHaveTextContent("Delete");
		fireEvent.click(deleteCta);
		expect(deleteHandler).toHaveBeenCalledTimes(1);
	});

	test("edit and delete cta don't render if not in user profile", () => {
		const { getByTestId, queryByTestId } = render(
			<MemoryRouter>
				<RecipeCard
					recipe={recipe}
					deleteHandler={() => {
						return;
					}}
				/>
			</MemoryRouter>
		);

		expect(queryByTestId("recipes-card-edit-cta")).not.toBeInTheDocument();
		expect(
			queryByTestId("recipes-card-delete-cta")
		).not.toBeInTheDocument();
	});
});
