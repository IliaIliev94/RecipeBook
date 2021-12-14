import React from "react";
import HomeCard from "./HomeCard";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("HomeCard", () => {
	afterEach(() => {
		cleanup();
	});

	test("home card renders successfully", () => {
		const component = render(
			<MemoryRouter>
				<HomeCard />
			</MemoryRouter>
		);

		expect(component).toBeTruthy();
	});

	test("home card renders correctly according to the given props", () => {
		const title = "Example title";
		const icon = <i className="fas fa-utensils"></i>;
		const description = "Example description";

		const { getByTestId } = render(
			<HomeCard title={title} icon={icon}>
				{description}
			</HomeCard>
		);
		const titleElement = getByTestId("homeCard-title");
		const descriptionElement = getByTestId("homeCard-description");

		expect(titleElement).toHaveTextContent(title);
		expect(descriptionElement).toHaveTextContent(description);
	});
});
