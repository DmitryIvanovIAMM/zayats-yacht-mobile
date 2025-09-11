import { errorColor, secondary } from "@/constants/Colors";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import {
  MaskedTextInput,
  type MaskedTextInputProps,
} from "react-native-mask-text";
import { FormInputRef } from "./FormInput";

type FormMaskedInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onLayoutY?: (y: number) => void;
} & Omit<MaskedTextInputProps, "onChangeText" | "value" | "defaultValue">;

const FormMaskedInput = forwardRef<FormInputRef, FormMaskedInputProps>(
  ({ name, label, style, onLayoutY, disabled, ...rest }, ref) => {
    const inputRef = useRef<TextInput | null>(null);
    const containerRef = useRef<View | null>(null);
    const { control } = useFormContext();

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
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <View
                style={[
                  styles.paperLikeInput,
                  error ? styles.inputError : styles.inputBorder,
                ]}
              >
                <MaskedTextInput
                  ref={inputRef as any}
                  style={[styles.input, style]}
                  placeholderTextColor={secondary.dark}
                  onBlur={onBlur}
                  // always drive form value with rawText; no need for external onChangeText
                  onChangeText={(masked, raw) => onChange(raw)}
                  value={(value as any) ?? ""}
                  editable={!disabled}
                  {...rest}
                />
              </View>

              <View style={styles.errorContainer}>
                {error ? (
                  <Text
                    style={styles.error}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {error.message}
                  </Text>
                ) : null}
              </View>
            </>
          )}
        />
      </View>
    );
  }
);

export default FormMaskedInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 8, // same as in FormInput
  },
  label: Platform.select({
    default: { fontSize: 15, marginBottom: 6, color: secondary.dark },
    android: { fontSize: 13, marginBottom: 4, color: secondary.dark },
  }),
  paperLikeInput: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 0,
    backgroundColor: "#fafafa",
    minHeight: 40, // use minHeight instead of fixed height
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
  errorContainer: {
    minHeight: 18,
    marginTop: 2,
    justifyContent: "center",
  },
  error: {
    color: errorColor,
    fontSize: 14,
  },
});
