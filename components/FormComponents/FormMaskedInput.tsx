import { errorColor, secondary } from "@/constants/Colors";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

type Props = {
  label: string;
  value?: string;
  onChangeText?: (masked: string, raw: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  mask: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

export const FormMaskedInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  disabled,
  mask,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.paperLikeInput, error && styles.inputError]}>
        <MaskedTextInput
          mask={mask}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          editable={!disabled}
          onChangeText={onChangeText || (() => {})}
          style={styles.maskedInputText}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
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
  paperLikeInput: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 4,
    backgroundColor: "#fafafa",
    height: 40,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  maskedInputText: {
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    color: "black",
    padding: 0,
    height: 40,
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

export default FormMaskedInput;
