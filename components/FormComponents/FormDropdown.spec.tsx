import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormDropdown from "./FormDropdown";

// Mock element dropdown to a simple selectable stub
jest.mock("react-native-element-dropdown", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");
  const Dropdown = (props: any) => (
    <View accessibilityLabel="mock-dropdown" {...props}>
      <Text>{props.placeholder}</Text>
      {props.disable ? <Text>DISABLED</Text> : null}
      <TouchableOpacity
        accessibilityLabel="select-first"
        onPress={() => props.onChange?.(props.data?.[0])}
      />
      <TouchableOpacity
        accessibilityLabel="select-second"
        onPress={() => props.onChange?.(props.data?.[1])}
      />
    </View>
  );
  return { __esModule: true, Dropdown };
});

type FormValues = { purpose: string };

function TestFormProvider({
  children,
  defaultValues,
  onReady,
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
  onReady?: (methods: any) => void;
}) {
  const methods = useForm<FormValues>({
    defaultValues: { purpose: "", ...(defaultValues || {}) },
  });
  React.useEffect(() => {
    onReady?.(methods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function renderWithForm(
  ui: React.ReactElement,
  defaultValues?: Partial<FormValues>
) {
  let methodsRef: any;
  const utils = render(
    <TestFormProvider
      defaultValues={defaultValues}
      onReady={(m) => (methodsRef = m)}
    >
      {ui}
    </TestFormProvider>
  );
  return { ...utils, methods: methodsRef as any };
}

describe("FormDropdown", () => {
  const options = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
  ];

  it("matches snapshot", () => {
    const { toJSON } = renderWithForm(
      <FormDropdown
        name="purpose"
        label="Purpose"
        options={options}
        placeholder="Select..."
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders label, placeholder, and shows disabled state", () => {
    const { getByText } = renderWithForm(
      <FormDropdown
        name="purpose"
        label="Purpose"
        options={options}
        placeholder="Select..."
        disabled
      />
    );

    expect(getByText("Purpose")).toBeTruthy();
    expect(getByText("Select...")).toBeTruthy();
    expect(getByText("DISABLED")).toBeTruthy();
  });

  it("updates form value when an option is selected", async () => {
    const { getByLabelText, methods } = renderWithForm(
      <FormDropdown
        name="purpose"
        label="Purpose"
        options={options}
        placeholder="Select..."
      />
    );

    await act(async () => {
      fireEvent.press(getByLabelText("select-first"));
    });
    await waitFor(() => expect(methods.getValues("purpose")).toBe("one"));

    await act(async () => {
      fireEvent.press(getByLabelText("select-second"));
    });
    await waitFor(() => expect(methods.getValues("purpose")).toBe("two"));
  });

  it("shows an error message from react-hook-form", async () => {
    const { getByText, methods } = renderWithForm(
      <FormDropdown
        name="purpose"
        label="Purpose"
        options={options}
        placeholder="Select..."
      />
    );

    await act(async () => {
      methods.setError("purpose", { message: "Please select a purpose" });
    });

    await waitFor(() =>
      expect(getByText("Please select a purpose")).toBeTruthy()
    );
  });
});
