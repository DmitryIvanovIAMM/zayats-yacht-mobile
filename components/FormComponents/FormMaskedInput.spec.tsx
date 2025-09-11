import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormMaskedInput from "./FormMaskedInput";

// Mock react-native-mask-text to a simple stub component (lint-safe)
jest.mock("react-native-mask-text", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { View, Text, TouchableOpacity } =
    jest.requireActual<typeof import("react-native")>("react-native");

  const MaskedTextInput = React.forwardRef<any, any>(
    function MockMaskedTextInput(props, ref) {
      React.useEffect(() => {
        const target = { focus: () => {} };
        if (typeof ref === "function") ref(target);
        else if (ref) (ref as any).current = target;
      }, [ref]);

      return (
        <View accessibilityLabel="mock-masked-input" {...props}>
          {props.placeholder ? <Text>{props.placeholder}</Text> : null}
          {props.editable === false ? <Text>DISABLED</Text> : null}
          <TouchableOpacity
            accessibilityLabel="enter-masked"
            onPress={() => props.onChangeText?.("12-34", "1234")}
          />
        </View>
      );
    }
  );
  MaskedTextInput.displayName = "MockMaskedTextInput";

  return { __esModule: true, MaskedTextInput };
});

type FormValues = { phone: string };

function TestFormProvider({
  children,
  defaultValues,
  onReady
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
  onReady?: (methods: any) => void;
}) {
  const methods = useForm<FormValues>({
    defaultValues: { phone: "", ...(defaultValues || {}) }
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

describe("FormMaskedInput", () => {
  it("matches snapshot", () => {
    const { toJSON } = renderWithForm(
      <FormMaskedInput
        name="phone"
        label="Phone"
        placeholder="(123) 456-7890"
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders label and placeholder, respects disabled state", () => {
    const { getByText } = renderWithForm(
      <FormMaskedInput
        name="phone"
        label="Phone"
        placeholder="(123) 456-7890"
        disabled
      />
    );
    expect(getByText("Phone")).toBeTruthy();
    expect(getByText("(123) 456-7890")).toBeTruthy();
    expect(getByText("DISABLED")).toBeTruthy();
  });

  it("stores raw value from onChangeText into form state", async () => {
    const { getByLabelText, methods } = renderWithForm(
      <FormMaskedInput
        name="phone"
        label="Phone"
        placeholder="(123) 456-7890"
      />
    );

    await act(async () => {
      fireEvent.press(getByLabelText("enter-masked"));
    });

    await waitFor(() => expect(methods.getValues("phone")).toBe("1234"));
  });

  it("shows error message when react-hook-form sets an error", async () => {
    const { getByText, methods } = renderWithForm(
      <FormMaskedInput
        name="phone"
        label="Phone"
        placeholder="(123) 456-7890"
      />
    );

    await act(async () => {
      methods.setError("phone", { message: "Phone is required" });
    });

    await waitFor(() => expect(getByText("Phone is required")).toBeTruthy());
  });
});
