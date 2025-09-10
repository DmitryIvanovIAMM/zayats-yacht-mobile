import { render } from "@testing-library/react-native";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

describe("ThemedText", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<ThemedText>Snapshot test!</ThemedText>);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders children text", () => {
    const { getByText } = render(<ThemedText>Hello</ThemedText>);
    expect(getByText("Hello")).toBeTruthy();
  });

  it("applies custom style prop", () => {
    const { getByText } = render(
      <ThemedText style={{ color: "red" }}>Styled</ThemedText>
    );
    const text = getByText("Styled");
    const flattened = StyleSheet.flatten(text.props.style);
    expect(flattened.color).toBe("red");
  });
});
