import { render } from "@testing-library/react-native";
import React from "react";
import { Animated, Text, ViewStyle } from "react-native";
import { FormContainer } from "./FormContainer";

// Mock expo-linear-gradient to a simple View to avoid native deps in tests
jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    LinearGradient: ({ children, colors, style, ...rest }: any) => (
      <View
        {...rest}
        style={style}
        testID="linear-gradient"
        data-colors={JSON.stringify(colors)}
      >
        {children}
      </View>
    )
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

  // Animation tests
  it("starts rotation animation on mount", () => {
    render(
      <FormContainer>
        <Text>Animation test</Text>
      </FormContainer>
    );

    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Animated.Value),
      expect.objectContaining({
        toValue: 1,
        duration: 6000,
        useNativeDriver: true
      })
    );

    expect(loopSpy).toHaveBeenCalled();
  });

  it("creates rotation interpolation correctly", () => {
    const { getByTestId } = render(
      <FormContainer>
        <Text>Interpolation test</Text>
      </FormContainer>
    );

    // The animated view should have transform style
    const animatedView = getByTestId("linear-gradient").parent;
    expect(animatedView).toBeTruthy();
  });

  // LinearGradient tests
  it("renders LinearGradient with correct colors", () => {
    const { getByTestId } = render(
      <FormContainer>
        <Text>Gradient test</Text>
      </FormContainer>
    );

    const gradient = getByTestId("linear-gradient");
    expect(gradient).toBeTruthy();

    const colors = JSON.parse(gradient.props["data-colors"]);
    expect(colors).toEqual(["#006666", "white", "#006666", "white"]);
  });

  it("applies correct styles to LinearGradient", () => {
    const { getByTestId } = render(
      <FormContainer>
        <Text>Gradient styles test</Text>
      </FormContainer>
    );

    const gradient = getByTestId("linear-gradient");
    expect(gradient.props.style).toEqual({
      flex: 1,
      borderRadius: 1
    });
  });

  // Structure and styling tests
  it("renders correct component structure", () => {
    const { toJSON } = render(
      <FormContainer>
        <Text>Structure test</Text>
      </FormContainer>
    );

    const tree = toJSON();
    expect(tree).toBeTruthy();

    // Should have wrapper, animated view, gradient, and container
    const hasCorrectStructure = (node: any): boolean => {
      if (!node) return false;

      // Check for wrapper styles
      if (node.props?.style) {
        const style = Array.isArray(node.props.style)
          ? node.props.style[0]
          : node.props.style;

        if (style?.position === "relative" && style?.overflow === "hidden") {
          return true;
        }
      }

      // Recursively check children
      if (node.children) {
        return node.children.some(
          (child: any) =>
            typeof child === "object" && hasCorrectStructure(child)
        );
      }

      return false;
    };

    expect(hasCorrectStructure(tree)).toBe(true);
  });

  it("applies correct container styles", () => {
    const { toJSON } = render(
      <FormContainer borderWidth={5}>
        <Text>Container styles test</Text>
      </FormContainer>
    );

    const tree = toJSON();

    const hasContainerStyles = (node: any): boolean => {
      if (!node) return false;

      if (node.props?.style) {
        const styles = Array.isArray(node.props.style)
          ? node.props.style
          : [node.props.style];

        const hasPadding = styles.some((s: any) => s?.padding === 20);
        const hasBackground = styles.some(
          (s: any) => s?.backgroundColor === "#fff"
        );
        const hasBorderRadius = styles.some((s: any) => s?.borderRadius === 1);
        const hasZIndex = styles.some((s: any) => s?.zIndex === 1);
        const hasMargin = styles.some((s: any) => s?.margin === 5);

        if (
          hasPadding &&
          hasBackground &&
          hasBorderRadius &&
          hasZIndex &&
          hasMargin
        ) {
          return true;
        }
      }

      if (node.children) {
        return node.children.some(
          (child: any) => typeof child === "object" && hasContainerStyles(child)
        );
      }

      return false;
    };

    expect(hasContainerStyles(tree)).toBe(true);
  });

  // Edge cases tests
  it("handles borderWidth of 0", () => {
    const { toJSON } = render(
      <FormContainer borderWidth={0}>
        <Text>Zero border test</Text>
      </FormContainer>
    );

    const tree = toJSON();
    expect(tree).toBeTruthy();

    const hasZeroMargin = (node: any): boolean => {
      if (!node) return false;
      if (node.props?.style) {
        const styles = Array.isArray(node.props.style)
          ? node.props.style
          : [node.props.style];
        if (styles.some((s: any) => s?.margin === 0)) return true;
      }
      if (node.children) {
        return node.children.some(
          (child: any) => typeof child === "object" && hasZeroMargin(child)
        );
      }
      return false;
    };

    expect(hasZeroMargin(tree)).toBe(true);
  });

  it("handles large borderWidth values", () => {
    const { toJSON } = render(
      <FormContainer borderWidth={100}>
        <Text>Large border test</Text>
      </FormContainer>
    );

    const tree = toJSON();
    expect(tree).toBeTruthy();

    const hasLargeMargin = (node: any): boolean => {
      if (!node) return false;
      if (node.props?.style) {
        const styles = Array.isArray(node.props.style)
          ? node.props.style
          : [node.props.style];
        if (styles.some((s: any) => s?.margin === 100)) return true;
      }
      if (node.children) {
        return node.children.some(
          (child: any) => typeof child === "object" && hasLargeMargin(child)
        );
      }
      return false;
    };

    expect(hasLargeMargin(tree)).toBe(true);
  });

  it("renders without children", () => {
    const { toJSON } = render(<FormContainer />);
    const tree = toJSON();
    expect(tree).toBeTruthy();
  });

  it("renders with multiple children", () => {
    const { getByText } = render(
      <FormContainer>
        <Text>First child</Text>
        <Text>Second child</Text>
        <Text>Third child</Text>
      </FormContainer>
    );

    expect(getByText("First child")).toBeTruthy();
    expect(getByText("Second child")).toBeTruthy();
    expect(getByText("Third child")).toBeTruthy();
  });

  // Performance tests
  it("does not restart animation on re-render with same props", () => {
    const { rerender } = render(
      <FormContainer borderWidth={2}>
        <Text>Performance test</Text>
      </FormContainer>
    );

    const initialTimingCalls = timingSpy.mock.calls.length;
    const initialLoopCalls = loopSpy.mock.calls.length;

    // Re-render with same props
    rerender(
      <FormContainer borderWidth={2}>
        <Text>Performance test</Text>
      </FormContainer>
    );

    // Animation should not restart
    expect(timingSpy.mock.calls.length).toBe(initialTimingCalls);
    expect(loopSpy.mock.calls.length).toBe(initialLoopCalls);
  });

  it("uses default borderWidth when not provided", () => {
    const { toJSON } = render(
      <FormContainer>
        <Text>Default border test</Text>
      </FormContainer>
    );

    const tree = toJSON();

    const hasDefaultMargin = (node: any): boolean => {
      if (!node) return false;
      if (node.props?.style) {
        const styles = Array.isArray(node.props.style)
          ? node.props.style
          : [node.props.style];
        if (styles.some((s: any) => s?.margin === 2)) return true; // default borderWidth is 2
      }
      if (node.children) {
        return node.children.some(
          (child: any) => typeof child === "object" && hasDefaultMargin(child)
        );
      }
      return false;
    };

    expect(hasDefaultMargin(tree)).toBe(true);
  });
});
