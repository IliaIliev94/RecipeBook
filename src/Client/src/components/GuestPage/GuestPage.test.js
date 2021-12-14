import React from "react";
import GuestPage from "./GuestPage";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("GuestPage", () => {
	afterEach(() => {
		cleanup();
	});
	test("guest page renders successfully", () => {
		const component = render(
			<MemoryRouter>
				<GuestPage />
			</MemoryRouter>
		);
		expect(component).toBeTruthy();
	});

	test("header section renders correctly", () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<GuestPage />
			</MemoryRouter>
		);

		const title = getByTestId("title");
		expect(title).toBeTruthy();

		const heading = getByTestId("heading");
		expect(heading).toBeTruthy();
	});

	test("login and register cta render and work correctly", () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<GuestPage />
			</MemoryRouter>
		);

		const register = getByTestId("register");
		expect(register).toHaveTextContent("Sign up");
		expect(register).toHaveAttribute("href", "/register");

		const login = getByTestId("login");
		expect(login).toHaveTextContent("Log in");
		expect(login).toHaveAttribute("href", "/login");
	});

	test("cards load correctly", () => {
		const { getByTestId, container } = render(
			<MemoryRouter>
				<GuestPage />
			</MemoryRouter>
		);

		const cardsContainer = getByTestId("cards-container");
		expect(cardsContainer.childElementCount).toBe(3);
	});
});
