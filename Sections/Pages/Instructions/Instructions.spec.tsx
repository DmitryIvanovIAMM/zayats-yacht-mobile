import { render } from "@testing-library/react-native";
import React from "react";
import Instructions from "./Instructions";

// Mock Collapsible to simple title + children to avoid animations/native deps
jest.mock("@/components/Collapsible", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  const Collapsible = ({ title, children }: any) => (
    <View>
      <Text>{title}</Text>
      <View>{children}</View>
    </View>
  );
  return { __esModule: true, Collapsible, default: Collapsible };
});

// Mock ContactUs to a simple View
jest.mock("@/components/ContactUs/ContactUs", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: (props: any) => <View testID="contact-us" {...props} />
  };
});

// Mock ThemedText to plain Text
jest.mock("@/components/ThemedText", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    __esModule: true,
    ThemedText: ({ children, style }: any) => (
      <Text style={style}>{children}</Text>
    )
  };
});

// Mock SectionTitle to plain Text
jest.mock("@/components/SectionTitle/SectionTitle", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ children }: any) => <Text>{children}</Text>
  };
});

describe("Instructions", () => {
  it("renders without crashing", () => {
    render(<Instructions />);
  });

  it("renders the page title", () => {
    const { getByText } = render(<Instructions />);
    expect(getByText("Yacht Transport Instructions")).toBeTruthy();
  });

  it("renders all key collapsible sections", () => {
    const { getByText } = render(<Instructions />);
    [
      "INSURANCE",
      "DOCUMENTATION, PASSPORTS & VISAS",
      "PRIOR TO TRANSPORT, SECURE THE VESSEL",
      "STRICTLY PROHIBITED AND SUBJECT TO HEAVY FINES OR ARREST",
      "TIPS FOR VESSEL TRANSPORT RIDERS"
    ].forEach((section) => {
      expect(getByText(section)).toBeTruthy();
    });
  });

  it("renders ContactUs section", () => {
    const { getByTestId } = render(<Instructions />);
    expect(getByTestId("contact-us")).toBeTruthy();
  });
});
