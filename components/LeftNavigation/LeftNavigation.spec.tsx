import { getMenuLinks } from "@/helpers/menuLinks";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { LeftNavigation, LeftNavigationProps } from "./LeftNavigation";

const mockPush = jest.fn();
// Mock expo-router
jest.mock("expo-router", () => {
  return {
    __esModule: true,
    useRouter: () => ({ push: mockPush }),
    mockPush
  };
});

// Improved react-native-paper Menu mock (handle anchor coords object) with display names
jest.mock("react-native-paper", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const RN = jest.requireActual<typeof import("react-native")>("react-native");

  const Menu: any = ({ anchor, visible, children, contentStyle }: any) => {
    let anchorNode: React.ReactNode = null;
    const isCoords =
      anchor &&
      typeof anchor === "object" &&
      ("x" in anchor || "y" in anchor) &&
      typeof (anchor as any).x === "number";

    if (!isCoords) {
      anchorNode =
        typeof anchor === "function" ? (anchor as any)() : anchor || null;
    }

    return (
      <RN.View>
        <RN.View testID="menu-anchor">{anchorNode}</RN.View>
        {visible && (
          <RN.View testID="menu" style={contentStyle}>
            {children}
          </RN.View>
        )}
      </RN.View>
    );
  };
  Menu.displayName = "MockMenu";

  Menu.Item = ({ onPress, title, titleStyle }: any) => (
    <RN.TouchableOpacity
      testID={`menu-item-${String(title).toLowerCase().replace(/\s+/g, "-")}`}
      onPress={onPress}
    >
      <RN.Text style={titleStyle}>{title}</RN.Text>
    </RN.TouchableOpacity>
  );
  Menu.Item.displayName = "MockMenuItem";

  const Divider = () => <RN.View testID="menu-divider" />;
  Divider.displayName = "MockDivider";

  return { Menu, Divider };
});

// Mock menuLinks helper
jest.mock("@/helpers/menuLinks", () => ({
  getMenuLinks: jest.fn(() => [
    { label: "Schedule", link: "/", section: "schedule" },
    { label: "Get a Quote", link: "/quote-request" },
    { label: "Gallery", link: "/gallery" },
    { label: "Services", link: "/services" },
    { label: "Instructions", link: "/instructions" },
    { label: "Testimonials", link: "/", section: "testimonials" },
    { label: "About Us", link: "/", section: "about-us" },
    { label: "Contact Us", link: "/", section: "contact-us" }
  ])
}));

describe("LeftNavigation", () => {
  const mockSetMenuIsOpen = jest.fn();
  const baseProps: LeftNavigationProps = {
    setMenuIsOpen: mockSetMenuIsOpen,
    visible: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot when visible", () => {
    const { toJSON } = render(<LeftNavigation {...baseProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("matches snapshot when not visible", () => {
    const { toJSON } = render(
      <LeftNavigation {...baseProps} visible={false} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders menu only when visible", () => {
    const { queryByTestId, rerender } = render(
      <LeftNavigation {...baseProps} visible={false} />
    );
    expect(queryByTestId("menu")).toBeNull();
    rerender(<LeftNavigation {...baseProps} visible />);
    expect(queryByTestId("menu")).toBeTruthy();
  });

  it("renders all menu items", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    [
      "schedule",
      "get-a-quote",
      "gallery",
      "services",
      "instructions",
      "testimonials",
      "about-us",
      "contact-us"
    ].forEach((id) => expect(getByTestId(`menu-item-${id}`)).toBeTruthy());
  });

  it("renders divider", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    expect(getByTestId("menu-divider")).toBeTruthy();
  });

  it("closes menu on item press", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByTestId("menu-item-schedule"));
    expect(mockSetMenuIsOpen).toHaveBeenCalledWith(false);
  });

  it("navigates to plain route", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByTestId("menu-item-get-a-quote"));
    expect(mockPush).toHaveBeenCalledWith("/quote-request");
  });

  it("navigates with section query", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByTestId("menu-item-schedule"));
    expect(mockPush).toHaveBeenCalledWith("/?section=schedule");
  });

  it("ignores empty link", () => {
    (getMenuLinks as jest.Mock).mockReturnValueOnce([
      { label: "Empty", link: "", section: "" }
    ]);
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByTestId("menu-item-empty"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("adds leading slash if missing", () => {
    (getMenuLinks as jest.Mock).mockReturnValueOnce([
      { label: "No Slash", link: "x", section: "" }
    ]);
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByTestId("menu-item-no-slash"));
    expect(mockPush).toHaveBeenCalledWith("/x");
  });

  it("hides when prop toggled (simulated dismiss)", () => {
    const { rerender, queryByTestId } = render(
      <LeftNavigation {...baseProps} visible />
    );
    expect(queryByTestId("menu")).toBeTruthy();
    rerender(<LeftNavigation {...baseProps} visible={false} />);
    expect(queryByTestId("menu")).toBeNull();
  });

  it("applies menu styling", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    const menu = getByTestId("menu");
    expect(menu.props.style).toEqual({ backgroundColor: "#006666" });
  });

  it("applies menu item text styling (flatten style)", () => {
    const { getByText } = render(<LeftNavigation {...baseProps} />);
    const textNode = getByText("Schedule");
    const style = StyleSheet.flatten(textNode.props.style);
    expect(style).toEqual({ color: "#fff" });
  });
});
