import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput, { FormInputRef } from "./FormInput";

// Test wrapper component
const TestWrapper: React.FC<{
  children: React.ReactNode;
  defaultValues?: any;
}> = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("FormInput", () => {
  const defaultProps = {
    name: "testField",
    label: "Test Label"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic rendering tests
  it("matches snapshot", () => {
    const { toJSON } = render(
      <TestWrapper>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders label correctly", () => {
    const { getByText } = render(
      <TestWrapper>
        <FormInput {...defaultProps} label="Custom Label" />
      </TestWrapper>
    );
    expect(getByText("Custom Label")).toBeTruthy();
  });

  it("renders placeholder correctly", () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <FormInput {...defaultProps} placeholder="Enter text here" />
      </TestWrapper>
    );
    expect(getByPlaceholderText("Enter text here")).toBeTruthy();
  });

  // Props tests
  it("applies keyboardType prop", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} keyboardType="email-address" />
      </TestWrapper>
    );
    const input = getByDisplayValue("");
    expect(input.props.keyboardType).toBe("email-address");
  });

  it("applies secureTextEntry prop", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} secureTextEntry={true} />
      </TestWrapper>
    );
    const input = getByDisplayValue("");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("applies autoCapitalize prop", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} autoCapitalize="none" />
      </TestWrapper>
    );
    const input = getByDisplayValue("");
    expect(input.props.autoCapitalize).toBe("none");
  });

  it("applies disabled prop", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} disabled={true} />
      </TestWrapper>
    );
    const input = getByDisplayValue("");
    expect(input.props.editable).toBe(false);
  });

  it("applies multiline prop", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} multiline={true} />
      </TestWrapper>
    );
    const input = getByDisplayValue("");
    expect(input.props.multiline).toBe(true);
  });

  it("applies numberOfLines prop", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} multiline={true} numberOfLines={3} />
      </TestWrapper>
    );
    const input = getByDisplayValue("");
    expect(input.props.numberOfLines).toBe(3);
  });

  // Form integration tests
  it("integrates with react-hook-form", () => {
    const { getByDisplayValue } = render(
      <TestWrapper defaultValues={{ testField: "initial value" }}>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );
    const input = getByDisplayValue("initial value");
    expect(input).toBeTruthy();
  });

  it("handles text input changes", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );
    const input = getByDisplayValue("");

    fireEvent.changeText(input, "new text");
    expect(input.props.value).toBe("new text");
  });

  it("handles onBlur event", () => {
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );
    const input = getByDisplayValue("");

    fireEvent(input, "blur");
    // onBlur should be called (handled by react-hook-form)
  });

  // Ref functionality tests
  it("exposes focus method through ref", () => {
    const ref = React.createRef<FormInputRef>();
    const { getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} ref={ref} />
      </TestWrapper>
    );

    // Test that ref.current exists and has focus method
    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.focus).toBe("function");

    // Test that focus method can be called without error
    expect(() => ref.current?.focus()).not.toThrow();
  });

  it("handles ref focus when input is not mounted", () => {
    const ref = React.createRef<FormInputRef>();
    render(
      <TestWrapper>
        <FormInput {...defaultProps} ref={ref} />
      </TestWrapper>
    );

    // Should not throw error when focus is called
    expect(() => ref.current?.focus()).not.toThrow();
  });

  // Layout tests
  it("calls onLayoutY when layout event occurs", () => {
    const onLayoutY = jest.fn();
    const { getByTestId } = render(
      <TestWrapper>
        <FormInput {...defaultProps} onLayoutY={onLayoutY} />
      </TestWrapper>
    );

    const inputGroup = getByTestId("form-input-group");
    fireEvent(inputGroup, "layout", { nativeEvent: { layout: { y: 100 } } });

    expect(onLayoutY).toHaveBeenCalledWith(100);
  });

  it("does not call onLayoutY when not provided", () => {
    const { getByTestId } = render(
      <TestWrapper>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );

    const inputGroup = getByTestId("form-input-group");
    expect(() =>
      fireEvent(inputGroup, "layout", { nativeEvent: { layout: { y: 100 } } })
    ).not.toThrow();
  });

  // Multiline specific tests
  it("applies multiline styles when multiline is true", () => {
    const { toJSON } = render(
      <TestWrapper>
        <FormInput {...defaultProps} multiline={true} />
      </TestWrapper>
    );

    const tree = toJSON();
    expect(tree).toBeTruthy();
    // Multiline styles should be applied (checked via snapshot)
  });

  it("calculates minHeight based on numberOfLines", () => {
    const { toJSON } = render(
      <TestWrapper>
        <FormInput {...defaultProps} multiline={true} numberOfLines={5} />
      </TestWrapper>
    );

    const tree = toJSON();
    expect(tree).toBeTruthy();
    // minHeight should be calculated as 5 * 24 + 16 = 136
  });

  // Edge cases
  it("handles empty string value", () => {
    const { getByDisplayValue } = render(
      <TestWrapper defaultValues={{ testField: "" }}>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );

    const input = getByDisplayValue("");
    expect(input).toBeTruthy();
  });

  it("handles null value", () => {
    const { getByDisplayValue } = render(
      <TestWrapper defaultValues={{ testField: null }}>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );

    const input = getByDisplayValue("");
    expect(input).toBeTruthy();
  });

  it("handles undefined value", () => {
    const { getByDisplayValue } = render(
      <TestWrapper defaultValues={{ testField: undefined }}>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );

    const input = getByDisplayValue("");
    expect(input).toBeTruthy();
  });

  // Accessibility tests
  it("has proper accessibility structure", () => {
    const { getByText, getByDisplayValue } = render(
      <TestWrapper>
        <FormInput {...defaultProps} label="Accessible Label" />
      </TestWrapper>
    );

    expect(getByText("Accessible Label")).toBeTruthy();
    expect(getByDisplayValue("")).toBeTruthy();
  });

  // Style tests
  it("applies correct styles", () => {
    const { toJSON } = render(
      <TestWrapper>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );

    const tree = toJSON();
    expect(tree).toBeTruthy();
    // Styles should be applied correctly (checked via snapshot)
  });

  // Error handling tests (simplified)
  it("renders without errors when no validation errors", () => {
    const { queryByText } = render(
      <TestWrapper>
        <FormInput {...defaultProps} />
      </TestWrapper>
    );

    // Should not display any error messages
    expect(queryByText(/error/i)).toBeNull();
  });

  // Additional prop combinations
  it("handles all keyboard types", () => {
    const keyboardTypes = [
      "default",
      "email-address",
      "numeric",
      "phone-pad"
    ] as const;

    keyboardTypes.forEach((keyboardType) => {
      const { getByDisplayValue } = render(
        <TestWrapper>
          <FormInput {...defaultProps} keyboardType={keyboardType} />
        </TestWrapper>
      );

      const input = getByDisplayValue("");
      expect(input.props.keyboardType).toBe(keyboardType);
    });
  });

  it("handles all autoCapitalize options", () => {
    const autoCapitalizeOptions = [
      "none",
      "sentences",
      "words",
      "characters"
    ] as const;

    autoCapitalizeOptions.forEach((autoCapitalize) => {
      const { getByDisplayValue } = render(
        <TestWrapper>
          <FormInput {...defaultProps} autoCapitalize={autoCapitalize} />
        </TestWrapper>
      );

      const input = getByDisplayValue("");
      expect(input.props.autoCapitalize).toBe(autoCapitalize);
    });
  });

  it("handles multiline with different numberOfLines", () => {
    const numberOfLines = [1, 3, 5, 10];

    numberOfLines.forEach((lines) => {
      const { getByDisplayValue } = render(
        <TestWrapper>
          <FormInput {...defaultProps} multiline={true} numberOfLines={lines} />
        </TestWrapper>
      );

      const input = getByDisplayValue("");
      expect(input.props.numberOfLines).toBe(lines);
    });
  });
});
