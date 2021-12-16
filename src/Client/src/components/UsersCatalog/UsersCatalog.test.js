import {
	render,
	cleanup,
	waitFor,
	fireEvent,
	wait,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UsersCatalog from "./UsersCatalog";
import * as usersService from "../../services/usersService";

jest.mock("../../services/usersService");

const users = [
	{ username: "Test1", avatar: "default-avatar.png", recipesCount: 20 },
	{ username: "Test2", avatar: "default-avatar.png", recipesCount: 15 },
	{ username: "Test3", avatar: "default-avatar.png", recipesCount: 40 },
];

describe("UsersCatalog", () => {
	let component;

	beforeEach(() => {
		usersService.getUsers.mockResolvedValue(users);
		component = render(
			<MemoryRouter>
				<UsersCatalog />
			</MemoryRouter>
		);
	});

	afterEach(() => {
		cleanup();
	});

	test("component renders successfully", () => {
		expect(component).toBeTruthy();
	});

	test("no users message is rendered if there are currently no users registered", async () => {
		usersService.getUsers.mockResolvedValue([]);
		const { getByText } = render(
			<MemoryRouter>
				<UsersCatalog />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				getByText("No users were created at this moment!")
			).toBeInTheDocument();
		});
	});

	test("users are displayed correctly", () => {
		const { getByTestId } = component;

		expect(
			getByTestId("users-catalog-users-container").childElementCount
		).toBe(3);
	});
});
