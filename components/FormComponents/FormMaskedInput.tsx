import { errorColor, secondary } from "@/constants/Colors";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Control, Controller } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";
import { FormInputRef } from "./FormInput";

interface FormMaskedInputProps extends MaskedTextInputProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: string;
  onLayoutY?: (y: number) => void; // report Y position like FormInput
}

const FormMaskedInput = forwardRef<FormInputRef, FormMaskedInputProps>(
  ({ name, label, control, error, style, onLayoutY, ...props }, ref) => {
    const inputRef = useRef<TextInput | null>(null);
    const containerRef = useRef<View | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <View
        style={styles.inputGroup}
        ref={containerRef}
        onLayout={(e) => onLayoutY?.(e.nativeEvent.layout.y)}
      >
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.paperLikeInput,
            error ? styles.inputError : styles.inputBorder,
          ]}
        >
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <MaskedTextInput
                ref={inputRef as any}
                style={[styles.input, style]}
                placeholderTextColor={secondary.dark}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value as any}
                {...props}
              />
            )}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

export default FormMaskedInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 18,
  },
  label: Platform.select({
    default: { fontSize: 15, marginBottom: 6, color: "#222" },
    android: { fontSize: 13, marginBottom: 4, color: "#222" },
  }),
  paperLikeInput: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 4,
    backgroundColor: "#fafafa",
    height: 40,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  input: {
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    color: secondary.dark,
    padding: 0,
    margin: 0,
  },
  inputBorder: {
    borderColor: secondary.dark,
  },
  inputError: {
    borderColor: errorColor,
  },
  error: {
    color: errorColor,
    fontSize: 14,
    marginTop: 8,
  },
});
