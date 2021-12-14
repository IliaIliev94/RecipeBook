import React, { useContext } from "react";
import { render, cleanup } from "@testing-library/react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import UserProfile from "./UserProfile";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, AuthContext } from "../../contexts/AuthContext";

Enzyme.configure({ adapter: new Adapter() });

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

	test("component renders correct username and avatar when in user profile", () => {
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

		const welcomeHeading = getByTestId("user-profile-welcome-heading");
		expect(welcomeHeading).toHaveTextContent(`Welcome, ${username}`);
		const userAvatar = getByTestId("user-profile-avatar");
		expect(userAvatar).toHaveAttribute("src", avatar);
	});

	test("component renders user recipes", () => {
		const username = "Test";
		const avatar = "/images/Avatars/default-avatar.png";
		const wrapper = mount(
			<MemoryRouter>
				<AuthProvider
					value={{
						isAuthenticated: true,
						user: { username: username, avatar: avatar },
					}}
				>
					<UserProfile isInUserProfile={true} />
				</AuthProvider>
			</MemoryRouter>
		);

		console.debug(wrapper.state("recipes"));
	});
});
