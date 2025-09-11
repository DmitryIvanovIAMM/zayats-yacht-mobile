import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Linking } from "react-native";
import ContactUs from "./ContactUs";

// SectionTitle mock (no require())
jest.mock("@/components/SectionTitle/SectionTitle", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const SectionTitle = ({ children }: any) => <Text>{children}</Text>;
  SectionTitle.displayName = "MockSectionTitle";
  return { __esModule: true, default: SectionTitle };
});

// ThemedText mock (if used inside ContactUs)
jest.mock("../ThemedText", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const ThemedText = ({ children, style }: any) => (
    <Text style={style}>{children}</Text>
  );
  ThemedText.displayName = "MockThemedText";
  return { __esModule: true, ThemedText };
});

// Icons mock
jest.mock("@expo/vector-icons", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { View } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const MaterialIcons = (props: any) => (
    <View accessibilityRole="image" {...props} />
  );
  MaterialIcons.displayName = "MockMaterialIcons";
  return { MaterialIcons };
});

describe("ContactUs", () => {
  beforeEach(() => {
    jest.spyOn(Linking, "openURL").mockResolvedValue(undefined as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    const ref = React.createRef<any>();
    const { toJSON } = render(<ContactUs ref={ref} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders title and contact details", () => {
    const ref = React.createRef<any>();
    const { getByText } = render(<ContactUs ref={ref} />);

    expect(getByText("Contact Us")).toBeTruthy();
    expect(getByText("Address")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Phone")).toBeTruthy();

    // Company and address lines
    expect(getByText(/Zayats Yacht Transport, LLC/i)).toBeTruthy();
    expect(getByText(/Fort Lauderdale/i)).toBeTruthy();

    // Email text
    expect(getByText(/info@zayats-yacht\.com/i)).toBeTruthy();
  });

  it("opens mail client when email is pressed", () => {
    const ref = React.createRef<any>();
    const { getByLabelText } = render(<ContactUs ref={ref} />);

    const emailButton = getByLabelText("Send email to info@zayats-yacht.com");
    fireEvent.press(emailButton);

    expect(Linking.openURL).toHaveBeenCalledWith(
      "mailto:info@zayats-yacht.com"
    );
  });

  it("opens dialer when phone is pressed", () => {
    const ref = React.createRef<any>();
    const { getByLabelText } = render(<ContactUs ref={ref} />);

    const phoneButton = getByLabelText("Call phone number +1 (555) 555-5555");
    fireEvent.press(phoneButton);

    expect(Linking.openURL).toHaveBeenCalledWith("tel:+15555555555");
  });
});
