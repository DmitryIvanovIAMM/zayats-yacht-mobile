import { render } from "@testing-library/react-native";
import React from "react";
import AboutUs from "./AboutUs";

// Mock SectionTitle to simple Text to avoid style/native deps
jest.mock("@/components/SectionTitle/SectionTitle", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ children }: any) => <Text>{children}</Text>,
  };
});

describe("AboutUs", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<AboutUs {...({} as any)} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders page title and brand header", () => {
    const { getByText } = render(<AboutUs {...({} as any)} />);
    expect(getByText("About Us")).toBeTruthy();
    expect(getByText("Zayats Yacht Transport")).toBeTruthy();
  });
});
