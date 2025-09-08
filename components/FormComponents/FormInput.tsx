import { errorColor, secondary } from "@/constants/Colors";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

export type FormInputRef = {
  focus: () => void;
};

type Props = {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  rules?: object;
  error?: FieldError;
  multiline?: boolean;
  numberOfLines?: number;
  onLayoutY?: (y: number) => void; // NEW
};

const FormInput = forwardRef<FormInputRef, Props>(
  (
    {
      onLayoutY,
      name,
      control,
      label,
      placeholder,
      keyboardType,
      rules,
      error,
      multiline,
      numberOfLines,
    },
    ref
  ) => {
    const inputRef = useRef<TextInput | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    return (
      <View
        style={styles.inputGroup}
        onLayout={(e) => onLayoutY?.(e.nativeEvent.layout.y)} // report Y
      >
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.paperLikeInput, error && styles.inputError]}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={secondary.dark}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType={keyboardType}
                editable
                multiline={multiline}
                numberOfLines={numberOfLines}
              />
            )}
          />
        </View>
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: Platform.select({ default: 15, android: 13 }) as number,
    marginBottom: Platform.select({ default: 6, android: 4 }) as number,
    color: secondary.dark,
  },
  paperLikeInput: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 4,
    backgroundColor: "white",
    height: 40,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  input: {
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    color: secondary.dark,
    padding: 0,
  },
  inputError: {
    borderColor: errorColor,
  },
  error: {
    color: errorColor,
    fontSize: 14,
    marginTop: 6,
  },
});

export default FormInput;
