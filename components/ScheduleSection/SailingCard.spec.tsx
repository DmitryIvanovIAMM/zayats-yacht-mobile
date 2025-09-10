import { render } from "@testing-library/react-native";
import React from "react";
import { SailingCard } from "./SailingCard"; // changed to named import

// Mock helpers used inside the component
jest.mock("@/helpers/dateTime", () => {
  return {
    getInternationalDateFormat: (date: any) => `DATE:${String(date)}`,
  };
});

jest.mock("@/helpers/routesCalculators", () => {
  return {
    calculateMilesForRoute: () => 1234,
    calculateDaysInTransit: () => 7,
  };
});

// Mock react-native-paper to simple primitives (avoid Provider/native deps)
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Text, Image } = require("react-native");

  const Card = ({ children, ...props }: any) => (
    <View {...props}>{children}</View>
  );
  (Card as any).Cover = ({ source, ...props }: any) =>
    React.createElement(Image, { source, ...props });
  (Card as any).Content = ({ children, ...props }: any) =>
    React.createElement(View, { ...props }, children);
  (Card as any).Actions = ({ children, ...props }: any) =>
    React.createElement(View, { ...props }, children);

  const Button = ({ children, ...props }: any) =>
    React.createElement(
      View,
      { accessibilityRole: "button", ...props },
      children
    );
  const Divider = (props: any) => React.createElement(View, props);

  return { Card, Button, Divider, Text };
});

describe("SailingCard", () => {
  const route = [
    {
      arrivalOn: "2025-01-01",
      departurePort: { portName: "Port A" },
    },
    {
      arrivalOn: "2025-02-02",
      departurePort: { portName: "Port B", imageFileName: "Golfito.jpg" },
      sailing: { name: "Trans-Atlantic" },
    },
  ] as any;

  it("renders core info (title, ports, dates, metrics, button)", () => {
    const { getByText } = render(<SailingCard route={route} />);

    // Title (sailing name)
    expect(getByText("Trans-Atlantic")).toBeTruthy();

    // Ports
    expect(getByText("Loading Port")).toBeTruthy();
    expect(getByText("Port A")).toBeTruthy();
    expect(getByText("Destination Port")).toBeTruthy();
    expect(getByText("Port B")).toBeTruthy();

    // Dates (formatted by mocked formatter)
    expect(getByText("Loading Date")).toBeTruthy();
    expect(getByText("DATE:2025-01-01")).toBeTruthy();
    expect(getByText("Arrival Date")).toBeTruthy();
    expect(getByText("DATE:2025-02-02")).toBeTruthy();

    // Metrics (from mocked calculators)
    expect(getByText("Miles:")).toBeTruthy();
    expect(getByText("1234")).toBeTruthy();
    expect(getByText("Days:")).toBeTruthy();
    expect(getByText("7 days")).toBeTruthy();

    // Button text
    expect(getByText("Get Quote")).toBeTruthy();
  });

  it("uses last port image in Card.Cover URI", () => {
    const { toJSON } = render(<SailingCard route={route} />);
    const tree = toJSON();

    // Walk the rendered tree to find Image node with 'source.uri'
    const findImageWithUri = (node: any): string | null => {
      if (!node) return null;
      if (node.type === "Image" && node.props?.source?.uri) {
        return node.props.source.uri as string;
      }
      const children = node.children || [];
      for (const child of children) {
        if (typeof child === "object" && child) {
          const res = findImageWithUri(child);
          if (res) return res;
        }
      }
      return null;
    };

    const uri = findImageWithUri(tree);
    expect(uri).toBeTruthy();

    // Support both raw path and Next.js optimized URL with encoded query param
    let decoded = uri as string;
    try {
      const u = new URL(decoded);
      const qp = u.searchParams.get("url");
      if (qp) decoded = decodeURIComponent(qp);
    } catch {
      // not a full URL; keep original
    }

    expect(decoded).toContain("/images/Golfito.jpg");
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<SailingCard route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
