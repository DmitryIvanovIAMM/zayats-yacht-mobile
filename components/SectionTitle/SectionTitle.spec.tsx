import { render } from "@testing-library/react-native";
import * as React from "react";
import { StyleSheet } from "react-native";
import SectionTitle from "./SectionTitle";

describe("SectionTitle", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<SectionTitle>Snapshot Title</SectionTitle>);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders children text", () => {
    const { getByText } = render(<SectionTitle>Testimonials</SectionTitle>);
    expect(getByText("Testimonials")).toBeTruthy();
  });

  it("applies custom style", () => {
    const { getByText } = render(
      <SectionTitle style={{ color: "red" }}>Styled</SectionTitle>
    );
    const text = getByText("Styled");
    const flattened = StyleSheet.flatten(text.props.style);
    expect(flattened.color).toBe("red");
  });
});
