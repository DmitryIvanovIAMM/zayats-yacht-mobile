import { getMenuLinks } from "@/helpers/menuLinks";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { LeftNavigation, LeftNavigationProps } from "./LeftNavigation";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  __esModule: true,
  useRouter: () => ({ push: mockPush })
}));

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

  it("renders nothing when not visible", () => {
    const { queryByText } = render(
      <LeftNavigation {...baseProps} visible={false} />
    );
    // Should not render any menu item
    expect(queryByText("Schedule")).toBeNull();
  });

  it("renders all menu items when visible", () => {
    const { getByText } = render(<LeftNavigation {...baseProps} />);
    [
      "Schedule",
      "Get a Quote",
      "Gallery",
      "Services",
      "Instructions",
      "Testimonials",
      "About Us",
      "Contact Us"
    ].forEach((label) => {
      expect(getByText(label)).toBeTruthy();
    });
  });

  it("closes menu and navigates to correct route on item press", () => {
    const { getByText } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByText("Get a Quote"));
    expect(mockSetMenuIsOpen).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith("/quote-request");
  });

  it("navigates with section query if section is present", () => {
    const { getByText } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByText("Schedule"));
    expect(mockPush).toHaveBeenCalledWith("/?section=schedule");
  });

  it("does not navigate if link is empty", () => {
    (getMenuLinks as jest.Mock).mockReturnValueOnce([
      { label: "Empty", link: "", section: "" }
    ]);
    const { getByText } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByText("Empty"));
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockSetMenuIsOpen).toHaveBeenCalledWith(false);
  });

  it("adds leading slash if missing", () => {
    (getMenuLinks as jest.Mock).mockReturnValueOnce([
      { label: "No Slash", link: "x", section: "" }
    ]);
    const { getByText } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByText("No Slash"));
    expect(mockPush).toHaveBeenCalledWith("/x");
  });

  it("closes menu when overlay is pressed", () => {
    const { getByTestId } = render(<LeftNavigation {...baseProps} />);
    fireEvent.press(getByTestId("overlay"));
    expect(mockSetMenuIsOpen).toHaveBeenCalledWith(false);
  });
});
