import React, { useContext } from "react";
import {
	render,
	cleanup,
	findByTestId,
	waitFor,
	getByTestId,
	fireEvent,
	getAllByTestId,
} from "@testing-library/react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import UserProfile from "./UserProfile";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, AuthContext } from "../../contexts/AuthContext";
import * as recipesService from "../../services/recipesService";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../services/recipesService");

beforeEach(() => {
	recipesService.getUserRecipes.mockResolvedValue({
		status: 200,
		recipes: [
			{
				id: "1",
				title: "Test1",
				imageURI: "exampleURI",
				description: "Example",
				minMinutes: 40,
				maxMinutes: 60,
			},
			{
				id: "2",
				title: "Test2",
				imageURI: "exampleURI",
				description: "Example",
				minMinutes: 40,
				maxMinutes: 60,
			},
		],
	});
});

describe("UserProfile", () => {
	afterEach(() => {
		cleanup();
	});
	test("component renders successfully", () => {
		const component = render(
			<MemoryRouter>
				<AuthProvider>
					<UserProfile />
				</AuthProvider>
			</MemoryRouter>
		);
		expect(component).toBeTruthy();
	});

	test("component renders correct username and avatar when in user profile", async () => {
		const username = "Test";
		const avatar = "/images/Avatars/default-avatar.png";
		const { getByTestId } = render(
			<MemoryRouter>
				<AuthContext.Provider
					value={{
						isAuthenticated: true,
						user: { username: username, avatar: avatar },
					}}
				>
					<UserProfile isInUserProfile={true} />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		await waitFor(() => {
			const welcomeHeading = getByTestId("user-profile-welcome-heading");
			expect(welcomeHeading).toHaveTextContent(`Welcome, ${username}`);
			const userAvatar = getByTestId("user-profile-avatar");
			expect(userAvatar).toHaveAttribute("src", avatar);
		});
	});

	test("component renders user recipes", async () => {
		const component = render(
			<MemoryRouter>
				<AuthProvider>
					<UserProfile isInUserProfile={true} />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			const recipeContainer = component.getByTestId(
				"user-recipes-container"
			);
			expect(recipeContainer).toBeTruthy();
			expect(recipeContainer.childElementCount).toBe(2);
		});
	});

	test("add recipe cta is displayed if user has no recipes", async () => {
		recipesService.getUserRecipes.mockResolvedValue({
			status: 200,
			recipes: [],
		});

		const { getByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<UserProfile isInUserProfile={true} />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			const profileHeading = getByTestId("profile-heading");
			const addRecipeCta = getByTestId("add-recipe-cta");

			expect(profileHeading).toHaveTextContent("No recipes yet!");
			expect(addRecipeCta).toHaveTextContent("Add recipes!");
			expect(addRecipeCta).toHaveAttribute("href", "/recipes/create");
		});
	});

	test("delete recipe works correctly", async () => {
		recipesService.deleteRecipe.mockResolvedValue({ ok: true });

		const { getByTestId, getAllByTestId, getByText, queryByText } = render(
			<MemoryRouter>
				<AuthProvider>
					<UserProfile isInUserProfile={true} />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			fireEvent.click(getAllByTestId("recipes-card-delete-cta")[0]);
			expect(
				getByTestId("user-recipes-container").childElementCount
			).toBe(1);
			expect(getByText("Test2")).toBeInTheDocument();
			expect(queryByText("Test1")).not.toBeInTheDocument();
		});
	});
});
