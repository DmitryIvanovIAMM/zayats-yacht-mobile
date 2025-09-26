import { render } from "@testing-library/react-native";
import React from "react";
import AboutUs from "./AboutUs";

// Mock SectionTitle to simple Text to avoid style/native deps
jest.mock("@/components/SectionTitle/SectionTitle", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ children }: any) => <Text>{children}</Text>
  };
});

describe("AboutUs", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<AboutUs {...({} as any)} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders all key sections and services (native)", () => {
    jest
      .spyOn(require("react-native"), "Platform", "get")
      .mockReturnValue({ OS: "ios" });
    const { getByText } = render(<AboutUs {...({} as any)} />);
    expect(getByText("About Us")).toBeTruthy();
    expect(getByText("Zayats Yacht Transport")).toBeTruthy();
    expect(getByText("Our Heritage")).toBeTruthy();
    expect(getByText("Our Services")).toBeTruthy();
    expect(getByText("Our Commitment")).toBeTruthy();
    expect(getByText("Join Us")).toBeTruthy();
    expect(
      getByText(/International Yacht Shipping/, { exact: false })
    ).toBeTruthy();
    expect(getByText(/Customs Clearance/, { exact: false })).toBeTruthy();
    expect(
      getByText(/Cradling and Shrink Wrapping/, { exact: false })
    ).toBeTruthy();
    expect(getByText(/Load Master Supervision/, { exact: false })).toBeTruthy();
    expect(getByText(/Insurance/, { exact: false })).toBeTruthy();
    expect(
      getByText("Explore. Transport. Discover. With Zayats Yacht Transport.")
    ).toBeTruthy();
  });

  it("renders all key sections and services (web)", () => {
    jest
      .spyOn(require("react-native"), "Platform", "get")
      .mockReturnValue({ OS: "web" });
    const { getByText } = render(<AboutUs {...({} as any)} />);
    expect(getByText("About Us")).toBeTruthy();
    // Минимальный smoke-тест для web: только заголовок
  });
});
