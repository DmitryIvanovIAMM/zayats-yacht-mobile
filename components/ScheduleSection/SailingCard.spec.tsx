import { render } from "@testing-library/react-native";
import React from "react";
import { SailingCard } from "./SailingCard";

// Mock helpers used inside the component
jest.mock("@/helpers/dateTime", () => {
  return {
    getInternationalDateFormat: (date: any) => `DATE:${String(date)}`
  };
});

jest.mock("@/helpers/routesCalculators", () => {
  return {
    calculateMilesForRoute: () => 1234,
    calculateDaysInTransit: () => 7
  };
});

// Mock react-native-paper to simple primitives (avoid Provider/native deps)
jest.mock("react-native-paper", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const RN = jest.requireActual<typeof import("react-native")>("react-native");

  const Card: any = ({ children, ...props }: any) =>
    React.createElement(RN.View, props, children);
  Card.displayName = "MockCard";

  Card.Cover = ({ source, ...props }: any) =>
    React.createElement(RN.Image, { source, ...props });
  Card.Cover.displayName = "MockCard.Cover";

  Card.Content = ({ children, ...props }: any) =>
    React.createElement(RN.View, { ...props }, children);
  Card.Content.displayName = "MockCard.Content";

  Card.Actions = ({ children, ...props }: any) =>
    React.createElement(RN.View, { ...props }, children);
  Card.Actions.displayName = "MockCard.Actions";

  const Button = ({ children, ...props }: any) =>
    React.createElement(
      RN.View,
      { accessibilityRole: "button", ...props },
      children
    );
  Button.displayName = "MockButton";

  const Divider = (props: any) => React.createElement(RN.View, props);
  Divider.displayName = "MockDivider";

  return { Card, Button, Divider, Text: RN.Text };
});

describe("SailingCard", () => {
  const route = [
    {
      arrivalOn: "2025-01-01",
      departurePort: { portName: "Port A" }
    },
    {
      arrivalOn: "2025-02-02",
      departurePort: { portName: "Port B", imageFileName: "Golfito.jpg" },
      sailing: { name: "Trans-Atlantic" }
    }
  ] as any;

  it("matches snapshot", () => {
    const { toJSON } = render(<SailingCard route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders core info (title, ports, dates, metrics, button)", () => {
    const { getByText } = render(<SailingCard route={route} />);

    expect(getByText("Trans-Atlantic")).toBeTruthy();
    expect(getByText("Loading Port")).toBeTruthy();
    expect(getByText("Port A")).toBeTruthy();
    expect(getByText("Destination Port")).toBeTruthy();
    expect(getByText("Port B")).toBeTruthy();

    expect(getByText("Loading Date")).toBeTruthy();
    expect(getByText("DATE:2025-01-01")).toBeTruthy();
    expect(getByText("Arrival Date")).toBeTruthy();
    expect(getByText("DATE:2025-02-02")).toBeTruthy();

    expect(getByText("Miles:")).toBeTruthy();
    expect(getByText("1234")).toBeTruthy();
    expect(getByText("Days:")).toBeTruthy();
    expect(getByText("7 days")).toBeTruthy();

    expect(getByText("Get Quote")).toBeTruthy();
  });

  it("uses last port image in Card.Cover URI", () => {
    const { toJSON } = render(<SailingCard route={route} />);
    const tree = toJSON();

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

    // Decode Next.js optimized src if present
    let decoded = uri as string;
    try {
      const u = new URL(decoded);
      const qp = u.searchParams.get("url");
      if (qp) decoded = decodeURIComponent(qp);
    } catch {
      // keep as-is
    }

    expect(decoded).toContain("/images/Golfito.jpg");
  });
});
