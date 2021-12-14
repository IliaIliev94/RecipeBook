import React from "react";
import { render, cleanup } from "@testing-library/react";
import FeatureImage from "./FeatureImage";

describe("FeatureImage", () => {
	let component;
	const backgoundImage = "../../assets/cereal-g1778f911a_1920.jpg";
	afterEach(() => {
		cleanup();
	});

	beforeEach(() => {
		component = render(
			<FeatureImage background={backgoundImage}>Test</FeatureImage>
		);
	});

	test("component renders successfully", () => {
		expect(component).toBeTruthy();
	});

	test("component renders correctly", () => {
		const background = component.getByTestId("feature-image-background");
		expect(background).toHaveAttribute(
			"style",
			`background: url(${backgoundImage}) no-repeat fixed center;`
		);
		expect(background).toHaveTextContent("Test");
	});
});
