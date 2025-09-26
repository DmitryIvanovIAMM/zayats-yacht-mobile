import { errorColor, secondary } from "@/constants/Colors";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

export type FormInputRef = {
  focus: () => void;
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  onLayoutY?: (y: number) => void;
  disabled?: boolean;
  onSubmitEditing?: (e: any) => void;
};

const FormInput = forwardRef<FormInputRef, Props>((props, ref) => {
  const {
    onLayoutY,
    name,
    label,
    placeholder,
    keyboardType,
    multiline,
    numberOfLines,
    disabled,
    secureTextEntry,
    autoCapitalize,
    onSubmitEditing
  } = props;
  const inputRef = useRef<TextInput | null>(null);
  const { control } = useFormContext();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }));

  return (
    <View
      style={styles.inputGroup}
      onLayout={(e) => onLayoutY?.(e.nativeEvent.layout.y)}
      testID="form-input-group"
    >
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error }
        }) => (
          <>
            <View
              style={[
                styles.paperLikeInput,
                error && styles.inputError,
                multiline && styles.paperLikeMultiline,
                multiline && numberOfLines
                  ? { minHeight: numberOfLines * 24 + 16 }
                  : undefined
              ]}
            >
              <TextInput
                ref={inputRef}
                style={[styles.input, multiline && styles.inputMultiline]}
                placeholder={placeholder}
                placeholderTextColor={secondary.dark}
                value={value as any}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                editable={!disabled}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onSubmitEditing={
                  typeof onSubmitEditing === "function"
                    ? onSubmitEditing
                    : undefined
                }
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
});

// ADD display name to satisfy react/display-name
FormInput.displayName = "FormInput";

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 8
  },
  label: {
    fontSize: Platform.select({ default: 15, android: 13 }) as number,
    marginBottom: Platform.select({ default: 6, android: 4 }) as number,
    color: secondary.dark
  },
  paperLikeInput: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 0,
    backgroundColor: "white",
    // height: 40,           // remove fixed height
    minHeight: 40, // allow multiline to grow
    paddingHorizontal: 8,
    justifyContent: "center"
  },
  paperLikeMultiline: {
    justifyContent: "flex-start",
    paddingTop: 8,
    paddingBottom: 8
  },
  input: {
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    color: secondary.dark,
    padding: 0
  },
  inputMultiline: {
    textAlignVertical: "top",
    paddingTop: 0,
    paddingBottom: 0
  },
  inputError: {
    borderColor: errorColor
  },
  errorContainer: {
    minHeight: 18, // reserve space for one line of error
    marginTop: 2,
    justifyContent: "center"
  },
  error: {
    color: errorColor,
    fontSize: 14
    // The error text is sized to fit within the reserved minHeight of errorContainer.
  }
});

export default FormInput;
