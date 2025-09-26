import * as AuthContext from "@/contexts/AuthContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import WebAppBarWithIcon from "./WebAppBarWithIcon";

// Mock dependencies
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() })
}));

describe("WebAppBarWithIcon", () => {
  const baseUserInfo = {
    user: {
      name: "Test User",
      email: "test@example.com",
      id: "user-1",
      image: null
    },
    expires: "2099-01-01T00:00:00Z"
  };
  let useAuthSpy: jest.SpyInstance;

  afterEach(() => {
    if (useAuthSpy) useAuthSpy.mockRestore();
  });

  it("renders logo and login button", () => {
    useAuthSpy = jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      logout: jest.fn(),
      login: jest.fn(),
      setAuthState: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: false,
        userInfo: baseUserInfo
      }
    });
    const toggleMenu = jest.fn();
    const { getByLabelText, getByText } = render(
      <WebAppBarWithIcon toggleMenu={toggleMenu} />
    );
    expect(getByLabelText("Go to home page")).toBeTruthy();
    expect(getByLabelText("Login")).toBeTruthy();
    expect(getByText("☰")).toBeTruthy();
  });

  it("calls toggleMenu when menu button is pressed", () => {
    useAuthSpy = jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      logout: jest.fn(),
      login: jest.fn(),
      setAuthState: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: false,
        userInfo: baseUserInfo
      }
    });
    const toggleMenu = jest.fn();
    const { getByLabelText } = render(
      <WebAppBarWithIcon toggleMenu={toggleMenu} />
    );
    fireEvent.press(getByLabelText("Toggle menu"));
    expect(toggleMenu).toHaveBeenCalled();
  });

  it("shows user name and logout when authenticated", () => {
    useAuthSpy = jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      logout: jest.fn(),
      login: jest.fn(),
      setAuthState: jest.fn(),
      authState: {
        isAuthenticated: true,
        isValidating: false,
        userInfo: baseUserInfo
      }
    });
    const { getByLabelText, getByText } = render(
      <WebAppBarWithIcon toggleMenu={jest.fn()} />
    );
    expect(getByText("Test User")).toBeTruthy();
    expect(getByLabelText("Logout")).toBeTruthy();
  });

  it("shows spinner when validating", () => {
    useAuthSpy = jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      logout: jest.fn(),
      login: jest.fn(),
      setAuthState: jest.fn(),
      authState: {
        isAuthenticated: false,
        isValidating: true,
        userInfo: baseUserInfo
      }
    });
    const { UNSAFE_getByType } = render(
      <WebAppBarWithIcon toggleMenu={jest.fn()} />
    );
    // ActivityIndicator is rendered
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
