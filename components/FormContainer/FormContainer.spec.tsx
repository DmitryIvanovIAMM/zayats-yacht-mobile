import { render } from "@testing-library/react-native";
import React from "react";
import { Animated, Text, ViewStyle } from "react-native";
import { FormContainer } from "./FormContainer";

// Mock expo-linear-gradient to a simple View to avoid native deps in tests
jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    LinearGradient: ({ children, ...rest }: any) => (
      <View {...rest}>{children}</View>
    ),
  };
});

describe("FormContainer", () => {
  // Prevent animated warnings/act noise by stubbing loop/timing
  let loopSpy: jest.SpyInstance;
  let timingSpy: jest.SpyInstance;

  beforeAll(() => {
    timingSpy = jest
      .spyOn(Animated as any, "timing")
      .mockReturnValue({ start: jest.fn(), stop: jest.fn() });
    loopSpy = jest
      .spyOn(Animated as any, "loop")
      .mockReturnValue({ start: jest.fn(), stop: jest.fn() });
  });

  afterAll(() => {
    loopSpy.mockRestore();
    timingSpy.mockRestore();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(
      <FormContainer>
        <Text>Snapshot content</Text>
      </FormContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders children", () => {
    const { getByText } = render(
      <FormContainer>
        <Text>Inner content</Text>
      </FormContainer>
    );
    expect(getByText("Inner content")).toBeTruthy();
  });

  it("applies borderWidth as container margin", () => {
    const { toJSON } = render(
      <FormContainer borderWidth={8}>
        <Text>Margin check</Text>
      </FormContainer>
    );
    const tree = toJSON();
    expect(tree).toBeTruthy();

    const hasMargin = (
      style: ViewStyle | ViewStyle[] | undefined,
      value: number
    ) => {
      if (!style) return false;
      if (Array.isArray(style)) {
        return style.some((s) => !!s && (s as ViewStyle).margin === value);
      }
      return (style as ViewStyle).margin === value;
    };

    const findNodeWithMargin = (node: any, value: number): boolean => {
      if (!node) return false;
      if (hasMargin(node.props?.style, value)) return true;
      const children = node.children || [];
      for (const child of children) {
        if (
          typeof child === "object" &&
          child &&
          findNodeWithMargin(child, value)
        ) {
          return true;
        }
      }
      return false;
    };

    expect(findNodeWithMargin(tree, 8)).toBe(true);
  });
});
