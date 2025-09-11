import { useAuth } from "@/contexts/AuthContext";
import { fireEvent, render } from "@testing-library/react-native";
// mockPush is accessed from the mocked module via requireMock to avoid TS export errors
import React from "react";
import AppBarWithIcon from "./AppBarWithIcon";

// Mock react-native-paper (без require(), с displayName)
jest.mock("react-native-paper", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const RN = jest.requireActual<typeof import("react-native")>("react-native");

  const Appbar: any = {};

  Appbar.Header = ({ children, ...p }: any) =>
    React.createElement(RN.View, p, children);
  Appbar.Header.displayName = "MockAppbarHeader";

  Appbar.Action = ({ icon, onPress, ...p }: any) =>
    React.createElement(RN.TouchableOpacity, {
      accessibilityLabel: String(icon),
      onPress,
      ...p
    });
  Appbar.Action.displayName = "MockAppbarAction";

  Appbar.Content = ({ title, ...p }: any) =>
    React.createElement(RN.View, p, title);
  Appbar.Content.displayName = "MockAppbarContent";

  return { Appbar };
});

// Mock expo-router (экспортируем mockPush чтобы импортировать сверху)
jest.mock("expo-router", () => {
  const mockPush = jest.fn();
  return {
    __esModule: true,
    useRouter: () => ({ push: mockPush }),
    mockPush
  };
});

// Access mockPush from the mocked module with proper typing
const { mockPush } = jest.requireMock("expo-router") as { mockPush: jest.Mock };

// Mock AuthContext
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("AppBarWithIcon", () => {
  const toggleMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: false,
        userInfo: undefined
      }
    });
  });

  it("matches snapshot (logged out)", () => {
    const { toJSON } = render(<AppBarWithIcon toggleMenu={toggleMenu} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls toggleMenu on menu press", () => {
    const { getByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    fireEvent.press(getByLabelText("menu"));
    expect(toggleMenu).toHaveBeenCalled();
  });

  it("navigates to /login when login icon pressed (logged out)", () => {
    const { getByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    fireEvent.press(getByLabelText("login"));
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("shows spinner when validating", () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: true,
        userInfo: undefined
      }
    });
    const { toJSON, queryByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    expect(queryByLabelText("login")).toBeNull();
    expect(queryByLabelText("logout")).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it("shows user name and logs out", () => {
    const logout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      logout,
      authState: {
        isAuthenticated: true,
        isValidating: false,
        userInfo: { user: { name: "John Doe", email: "john@example.com" } }
      }
    });
    const { getByText, getByLabelText } = render(
      <AppBarWithIcon toggleMenu={toggleMenu} />
    );
    expect(getByText("John Doe")).toBeTruthy();
    fireEvent.press(getByLabelText("logout"));
    expect(logout).toHaveBeenCalled();
  });

  it("falls back to email when no name", () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      authState: {
        isAuthenticated: true,
        isValidating: false,
        userInfo: { user: { email: "john@example.com" } }
      }
    });
    const { getByText } = render(<AppBarWithIcon toggleMenu={toggleMenu} />);
    expect(getByText("john@example.com")).toBeTruthy();
  });
});
