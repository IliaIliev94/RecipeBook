import React from "react";
import {
	render,
	cleanup,
	findByTestId,
	waitFor,
	getByTestId,
	fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipesCatalog from "./RecipesCatalog";
import * as recipesService from "../../services/recipesService";
import { AuthProvider } from "../../contexts/AuthContext";

jest.mock("../../services/recipesService");
const likeHandler = jest.fn();
const unlikeHandler = jest.fn();

const recipes = [
	{
		id: "1",
		title: "Test1",
		description: "Example description",
		imageURI: "example URI",
		minMinutes: 60,
		maxMinutes: 80,
	},
	{
		id: "2",
		title: "Test2",
		description: "Example description",
		imageURI: "example URI",
		minMinutes: 60,
		maxMinutes: 80,
	},
];

describe("RecipeCatalog", () => {
	beforeEach(() => {
		recipesService.getRecipes.mockResolvedValue(recipes);
	});
	afterEach(() => {
		cleanup();
	});

	test("component renders successfully", () => {
		let component = render(
			<MemoryRouter>
				<AuthProvider>
					<RecipesCatalog searchParams={""} />
				</AuthProvider>
			</MemoryRouter>
		);
		expect(component).toBeTruthy();
	});

	test("component renders correctly", async () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<RecipesCatalog searchParams={""} />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				getByTestId("recipes-catalog-container").childElementCount
			).toBe(2);
		});
	});

	test("search works correctly", async () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<RecipesCatalog searchParams={"Test1"} />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				getByTestId("recipes-catalog-container").childElementCount
			).toBe(1);
		});
	});

	test("displays no recipes message if there are no recipes currently", async () => {
		recipesService.getRecipes.mockResolvedValue([]);
		const { getByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<RecipesCatalog searchParams={"Test1"} />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(getByTestId("recipes-catalog-no-recipes")).toHaveTextContent(
				"No recipes yet! You can add some!"
			);
		});
	});
});
