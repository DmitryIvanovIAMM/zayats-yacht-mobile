import { errorColor, secondary } from "@/constants/Colors";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
};

const DEFAULT_LINE_HEIGHT = Platform.select({
  default: 20,
  android: 18,
}) as number;

export const FormInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  disabled,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 4,
}) => {
  const computedMinHeight = Math.max(40, numberOfLines * DEFAULT_LINE_HEIGHT);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        mode="outlined"
        style={[styles.input, !multiline && { height: 40 }]}
        contentStyle={{
          minHeight: multiline ? computedMinHeight : 40,
          paddingVertical: multiline ? 8 : 0,
        }}
        dense={!multiline}
        textColor="black"
        cursorColor="black"
        placeholder={placeholder}
        value={value}
        editable={!disabled}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        outlineStyle={[styles.inputBorder, error && styles.inputError]}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 18,
  },
  label: Platform.select({
    default: { fontSize: 15, marginBottom: 6, color: "#222" },
    android: { fontSize: 13, marginBottom: 4, color: "#222" },
  }),
  input: {
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    backgroundColor: "#fafafa",
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
    marginTop: 6,
  },
});

export default FormInput;
