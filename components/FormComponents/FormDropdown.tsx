import { errorColor, secondary } from "@/constants/Colors";
import React, { useImperativeHandle, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import type { FormInputRef } from "./FormInput";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  onLayoutY?: (y: number) => void; // report Y like other inputs
};

const FormDropdown = React.forwardRef<FormInputRef, Props>(
  (
    {
      label,
      value,
      options,
      onChange,
      error,
      placeholder = "Select...",
      disabled,
      onLayoutY,
    },
    ref
  ) => {
    const dropdownRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (dropdownRef.current?.focus) dropdownRef.current.focus();
        else if (dropdownRef.current?.open) dropdownRef.current.open();
      },
    }));

    return (
      <View
        style={styles.inputGroup}
        onLayout={(e) => onLayoutY?.(e.nativeEvent.layout.y)}
      >
        <Text style={styles.label}>{label}</Text>
        <Dropdown
          ref={dropdownRef as any}
          style={[
            styles.dropdown,
            error ? styles.inputError : styles.inputBorder,
          ]}
          placeholderStyle={styles.placeholderText}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.dropdownText}
          iconStyle={styles.dropdownIcon}
          containerStyle={styles.dropdownMenu}
          itemContainerStyle={styles.itemContainer}
          activeColor={secondary.dark}
          data={options}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={(item) => onChange(item.value)}
          disable={disabled}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 18,
  },
  label: Platform.select({
    default: { fontSize: 15, marginBottom: 6, color: secondary.dark },
    android: { fontSize: 13, marginBottom: 4, color: secondary.dark },
  }),
  dropdown: Platform.select({
    default: {
      backgroundColor: "white",
      borderWidth: 1,
      borderRadius: 0,
      padding: 8,
      height: 40,
      width: "100%",
      borderColor: secondary.dark,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    android: {
      backgroundColor: "white",
      borderWidth: 1,
      borderRadius: 0,
      padding: 8,
      height: 36,
      width: "100%",
      borderColor: secondary.dark,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  }),
  placeholderText: {
    color: secondary.dark,
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
  },
  selectedText: {
    color: secondary.dark,
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    backgroundColor: "white",
  },
  dropdownText: {
    color: "white",
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    backgroundColor: secondary.dark,
    borderWidth: 0,
    padding: 0,
  },
  itemContainer: {
    backgroundColor: secondary.dark,
    borderWidth: 0,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    color: "white",
    opacity: 1,
  },
  dropdownIcon: {
    color: secondary.dark,
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    paddingLeft: 8,
    borderWidth: 0,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 0,
    backgroundColor: secondary.dark,
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

export default FormDropdown;
