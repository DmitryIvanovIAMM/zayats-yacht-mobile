import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { LeftNavigation, LeftNavigationProps } from "./LeftNavigation";

// Mock expo-router
jest.mock("expo-router", () => {
  const mockPush = jest.fn();
  return {
    __esModule: true,
    useRouter: () => ({ push: mockPush }),
    mockPush,
  };
});

// Mock react-native-paper Menu and Divider
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, TouchableOpacity, Text } = require("react-native");

  const Menu = ({
    children,
    visible,
    onDismiss,
    contentStyle,
    anchor,
  }: any) => {
    if (!visible) return null;

    return React.createElement(
      View,
      {
        testID: "menu",
        style: contentStyle,
        onPress: onDismiss,
      },
      children
    );
  };

  Menu.Item = ({ onPress, title, titleStyle, ...props }: any) =>
    React.createElement(
      TouchableOpacity,
      {
        testID: `menu-item-${title.toLowerCase().replace(/\s+/g, "-")}`,
        onPress,
        ...props,
      },
      React.createElement(Text, { style: titleStyle }, title)
    );

  const Divider = () => React.createElement(View, { testID: "menu-divider" });

  return { Menu, Divider };
});

// Mock menuLinks helper
jest.mock("@/helpers/menuLinks", () => ({
  getMenuLinks: jest.fn(() => [
    {
      label: "Schedule",
      link: "/",
      section: "schedule",
    },
    {
      label: "Get a Quote",
      link: "/quote-request",
    },
    {
      label: "Gallery",
      link: "/gallery",
    },
    {
      label: "Services",
      link: "/services",
    },
    {
      label: "Instructions",
      link: "/instructions",
    },
    {
      label: "Testimonials",
      link: "/",
      section: "testimonials",
    },
    {
      label: "About Us",
      link: "/",
      section: "about-us",
    },
    {
      label: "Contact Us",
      link: "/",
      section: "contact-us",
    },
  ]),
}));

describe("LeftNavigation", () => {
  const mockSetMenuIsOpen = jest.fn();
  const defaultProps: LeftNavigationProps = {
    setMenuIsOpen: mockSetMenuIsOpen,
    visible: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot when visible", () => {
    const { toJSON } = render(<LeftNavigation {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("matches snapshot when not visible", () => {
    const { toJSON } = render(
      <LeftNavigation {...defaultProps} visible={false} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders menu when visible is true", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    expect(getByTestId("menu")).toBeTruthy();
  });

  it("does not render menu when visible is false", () => {
    const { queryByTestId } = render(
      <LeftNavigation {...defaultProps} visible={false} />
    );
    expect(queryByTestId("menu")).toBeNull();
  });

  it("renders all menu items", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);

    expect(getByTestId("menu-item-schedule")).toBeTruthy();
    expect(getByTestId("menu-item-get-a-quote")).toBeTruthy();
    expect(getByTestId("menu-item-gallery")).toBeTruthy();
    expect(getByTestId("menu-item-services")).toBeTruthy();
    expect(getByTestId("menu-item-instructions")).toBeTruthy();
    expect(getByTestId("menu-item-testimonials")).toBeTruthy();
    expect(getByTestId("menu-item-about-us")).toBeTruthy();
    expect(getByTestId("menu-item-contact-us")).toBeTruthy();
  });

  it("renders divider at the end", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    expect(getByTestId("menu-divider")).toBeTruthy();
  });

  it("calls setMenuIsOpen with false when menu item is pressed", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);

    fireEvent.press(getByTestId("menu-item-schedule"));

    expect(mockSetMenuIsOpen).toHaveBeenCalledWith(false);
  });

  it("navigates to correct route when menu item is pressed", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    const { mockPush } = require("expo-router");

    fireEvent.press(getByTestId("menu-item-get-a-quote"));

    expect(mockPush).toHaveBeenCalledWith("/quote-request");
  });

  it("navigates to route with section when menu item has section", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    const { mockPush } = require("expo-router");

    fireEvent.press(getByTestId("menu-item-schedule"));

    expect(mockPush).toHaveBeenCalledWith("/?section=schedule");
  });

  it("handles empty link gracefully", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    const { mockPush } = require("expo-router");

    // Mock a menu item with empty link
    const { getMenuLinks } = require("@/helpers/menuLinks");
    getMenuLinks.mockReturnValueOnce([
      { label: "Empty Link", link: "", section: "" },
    ]);

    const { getByTestId: getByTestIdEmpty } = render(
      <LeftNavigation {...defaultProps} />
    );

    fireEvent.press(getByTestIdEmpty("menu-item-empty-link"));

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("adds leading slash to link if not present", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    const { mockPush } = require("expo-router");

    // Mock a menu item without leading slash
    const { getMenuLinks } = require("@/helpers/menuLinks");
    getMenuLinks.mockReturnValueOnce([
      { label: "No Slash", link: "test-route", section: "" },
    ]);

    const { getByTestId: getByTestIdNoSlash } = render(
      <LeftNavigation {...defaultProps} />
    );

    fireEvent.press(getByTestIdNoSlash("menu-item-no-slash"));

    expect(mockPush).toHaveBeenCalledWith("/test-route");
  });

  it("calls setMenuIsOpen with false when menu is dismissed", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);

    fireEvent.press(getByTestId("menu"));

    expect(mockSetMenuIsOpen).toHaveBeenCalledWith(false);
  });

  it("logs navigation message to console", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);

    fireEvent.press(getByTestId("menu-item-schedule"));

    expect(consoleSpy).toHaveBeenCalledWith("Navigating to /");

    consoleSpy.mockRestore();
  });

  it("applies correct styling to menu", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    const menu = getByTestId("menu");

    expect(menu.props.style).toEqual({
      backgroundColor: "#006666", // secondary.dark
    });
  });

  it("applies correct styling to menu items", () => {
    const { getByTestId } = render(<LeftNavigation {...defaultProps} />);
    const menuItem = getByTestId("menu-item-schedule");
    const textElement = menuItem.children[0] as any;

    expect(textElement.props.style).toEqual({
      color: "#fff", // primary.contrastText
    });
  });
});
