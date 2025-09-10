import { useAuth } from "@/contexts/AuthContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import AppBarWithIcon from "./AppBarWithIcon";

// Mock react-native-paper Appbar with simple primitives
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, TouchableOpacity } = require("react-native");
  const Appbar: any = {};
  Appbar.Header = ({ children, ...p }: any) =>
    React.createElement(View, p, children);
  Appbar.Action = ({ icon, onPress, ...p }: any) =>
    React.createElement(TouchableOpacity, {
      accessibilityLabel: String(icon),
      onPress,
      ...p,
    });
  Appbar.Content = ({ title, ...p }: any) =>
    React.createElement(View, p, title);
  return { Appbar };
});

// Mock expo-router with an internal mockPush exposed via the module
jest.mock("expo-router", () => {
  const mockPush = jest.fn();
  return {
    __esModule: true,
    useRouter: () => ({ push: mockPush }),
    mockPush,
  };
});

// Mock AuthContext with switchable return
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("AppBarWithIcon", () => {
  const toggleMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // default: logged out, not validating
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: false,
        userInfo: undefined,
      },
    });
  });

  it("matches snapshot (logged out)", () => {
    const { toJSON } = render(<AppBarWithIcon toggleMenu={toggleMenu} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("triggers toggleMenu when menu icon is pressed", () => {
    const { getByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    fireEvent.press(getByLabelText("menu"));
    expect(toggleMenu).toHaveBeenCalled();
  });

  it("shows login icon when logged out and navigates to /login on press", () => {
    const { getByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    fireEvent.press(getByLabelText("login"));
    const { mockPush } = require("expo-router");
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("shows spinner when validating and hides login/logout", () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: true,
        userInfo: undefined,
      },
    });
    const { queryByLabelText, toJSON } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    expect(queryByLabelText("login")).toBeNull();
    expect(queryByLabelText("logout")).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it("shows user name and logout icon when authenticated, and logs out on press", () => {
    const logout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      logout,
      authState: {
        isAuthenticated: true,
        isValidating: false,
        userInfo: { user: { name: "John Doe", email: "john@example.com" } },
      },
    });

    const { getByText, getByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );

    expect(getByText("John Doe")).toBeTruthy();
    fireEvent.press(getByLabelText("logout"));
    expect(logout).toHaveBeenCalled();
  });

  it("falls back to email when name is not provided", () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      authState: {
        isAuthenticated: true,
        isValidating: false,
        userInfo: { user: { email: "john@example.com" } },
      },
    });

    const { getByText } = render(<AppBarWithIcon toggleMenu={toggleMenu} />);
    expect(getByText("john@example.com")).toBeTruthy();
  });
});
