import { render } from "@testing-library/react-native";
import React from "react";
import Testimonials from "./Testimonials";

// Mock SectionTitle without out-of-scope vars inside the factory
jest.mock("@/components/SectionTitle/SectionTitle", () => {
  const React = require("react");
  const RN = require("react-native");
  const SectionTitle = ({ children }: any) =>
    React.createElement(RN.Text, null, children);
  return { __esModule: true, default: SectionTitle };
});

describe("Testimonials", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<Testimonials {...({} as any)} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders title and all testimonials content", () => {
    const { getByText } = render(<Testimonials {...({} as any)} />);

    // Title
    expect(getByText("Testimonials")).toBeTruthy();

    // Authors
    expect(getByText("Walter Johnson")).toBeTruthy();
    expect(getByText("Richard")).toBeTruthy();
    expect(getByText("Mike Karty")).toBeTruthy();
    expect(getByText("Nic Arnsby")).toBeTruthy();

    // Company/position details where present
    expect(getByText("ENGEL & VÖLKERS YACHTING")).toBeTruthy();
    expect(getByText("Vessel: Adventurer")).toBeTruthy();

    // A quote snippet to ensure quotes are rendered
    expect(getByText(/Thank you for the fine work/i)).toBeTruthy();
  });
});
