import React from "react";
import {
	render,
	cleanup,
	waitFor,
	fireEvent,
	wait,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import { AuthProvider, AuthContext } from "../../contexts/AuthContext";
import * as recipesService from "../../services/recipesService";
import * as commentsService from "../../services/commentsService";

jest.mock("../../services/recipesService");
jest.mock("../../services/commentsService");

const recipe = {
	id: "1",
	title: "Test",
	imageURI:
		"https://www.rabbitandwolves.com/wp-content/uploads/2020/01/Vegan-Harissa-White-Bean-Stew0464.jpg",
	description: "Example description",
	minMinutes: 80,
	maxMinutes: 120,
	isOwner: false,
	username: "TestCook",
	userImage: "default-avatar.png",
	usersLiked: [],
};

describe("RecipeDetails", () => {
	let component;
	beforeEach(() => {
		recipesService.getOne.mockResolvedValue({
			...recipe,
			status: 200,
		});
		component = render(
			<MemoryRouter>
				<AuthProvider>
					<RecipeDetails />
				</AuthProvider>
			</MemoryRouter>
		);
	});
	afterEach(() => {
		cleanup();
	});

	test("component renders successfully", () => {
		expect(component).toBeTruthy();
	});

	test("component renders correct recipe and user info", async () => {
		await waitFor(() => {
			const { getByTestId } = component;
			expect(
				getByTestId("recipe-details-banner-title")
			).toHaveTextContent(recipe.title);

			expect(getByTestId("recipe-details-banner-time")).toHaveTextContent(
				`${recipe.minMinutes} - ${recipe.maxMinutes} minutes`
			);

			expect(getByTestId("recipe-details-title")).toHaveTextContent(
				recipe.title
			);

			expect(getByTestId("recipe-details-description")).toHaveTextContent(
				recipe.description
			);

			expect(
				getByTestId("recipe-details-user-profile-cta")
			).toHaveAttribute("href", "/users/" + recipe.username);

			expect(getByTestId("recipe-details-user-avatar")).toHaveAttribute(
				"src",
				"/images/Avatars/" + recipe.userImage
			);

			expect(getByTestId("recipe-details-username")).toHaveTextContent(
				recipe.username
			);
		});
	});

	test("404 page is displayed if recipe isn't existing", async () => {
		recipesService.getOne.mockResolvedValue({ status: 404 });
		const { getByText } = render(
			<MemoryRouter>
				<AuthProvider>
					<RecipeDetails />
				</AuthProvider>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				getByText("Please try with another recipe id.")
			).toBeInTheDocument();
		});
	});

	test("if user is owner edit and delete recipe buttons are rendered", async () => {
		recipesService.getOne.mockResolvedValue({
			status: 200,
			...recipe,
			isOwner: true,
		});
		const { getByTestId } = render(
			<MemoryRouter>
				<AuthContext.Provider
					value={{
						isAuthenticated: true,
						user: {
							username: "Test",
							avatar: "/images/Avatars/default-avatar.png",
						},
					}}
				>
					<RecipeDetails />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(getByTestId("recipe-details-edit-cta")).toHaveTextContent(
				"Edit"
			);
			expect(getByTestId("recipe-details-delete-cta")).toHaveTextContent(
				"Delete"
			);
		});
	});

	test("if user is authenticated like and add comments are displayed", async () => {
		const { getByTestId, queryByTestId } = render(
			<MemoryRouter>
				<AuthContext.Provider
					value={{
						isAuthenticated: true,
						user: {
							username: "Test",
							avatar: "/images/Avatars/default-avatar.png",
						},
					}}
				>
					<RecipeDetails />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				queryByTestId("recipe-details-edit-cta")
			).not.toBeInTheDocument();
			expect(
				queryByTestId("recipe-details-delete-cta")
			).not.toBeInTheDocument();
			expect(getByTestId("recipe-details-like-cta")).toHaveTextContent(
				"Like"
			);
			expect(
				getByTestId("recipe-details-add-comment-container")
			).toBeInTheDocument();
		});
	});

	test("like functionality works correctly", async () => {
		recipesService.likeRecipe.mockResolvedValue({ ok: true });

		const { findByTestId } = render(
			<MemoryRouter>
				<AuthContext.Provider
					value={{
						isAuthenticated: true,
						user: {
							username: "Test",
							avatar: "/images/Avatars/default-avatar.png",
						},
					}}
				>
					<RecipeDetails />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		await waitFor(async () => {
			const likeCta = await findByTestId("recipe-details-like-cta");
			fireEvent.click(likeCta);
			expect(
				await findByTestId("recipe-details-unlike-cta")
			).toHaveTextContent("Unlike 1");
		});
	});

	test("unlike functionality works correctly", async () => {
		recipesService.unlikeRecipe.mockResolvedValue({ ok: true });
		recipesService.getOne.mockResolvedValue({
			...recipe,
			usersLiked: ["Test"],
		});

		const { findByTestId } = render(
			<MemoryRouter>
				<AuthContext.Provider
					value={{
						isAuthenticated: true,
						user: {
							username: "Test",
							avatar: "/images/Avatars/default-avatar.png",
						},
					}}
				>
					<RecipeDetails />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		await waitFor(async () => {
			const unlikeCta = await findByTestId("recipe-details-unlike-cta");
			expect(unlikeCta).toHaveTextContent("Unlike 1");
			fireEvent.click(unlikeCta);
			expect(
				await findByTestId("recipe-details-like-cta")
			).toHaveTextContent("Like 0");
		});
	});

	test("comment functionality works correctly", async () => {
		commentsService.addComment.mockReturnValue(
			JSON.stringify({
				ok: true,

				username: "Test",
				message: "Test comment",
				date: "16 Dec 2021",
				userImage: "default-avatar.png",
			})
		);

		const { findByTestId } = render(
			<MemoryRouter>
				<AuthContext.Provider
					value={{
						isAuthenticated: true,
						user: {
							username: "Test",
							avatar: "/images/Avatars/default-avatar.png",
						},
					}}
				>
					<RecipeDetails />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		await waitFor(async () => {
			const commentsContainer = await findByTestId(
				"recipe-details-comments-container"
			);

			expect(commentsContainer.childElementCount).toBe(1);
			const text = await findByTestId("submit-comment-form-text");
			fireEvent.change(text, { target: { value: "My comment" } });
			const commentSubmitForm = await findByTestId("comment-submit-form");
			fireEvent.submit(commentSubmitForm);
			expect(commentsService.addComment).toHaveBeenCalled();
		});
	});
});
