import { errorColor, primary, secondary } from "@/constants/Colors";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Menu } from "react-native-paper";

type Option = { label: string; value: string };

type Props = {
  label: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export default function FormDropdown({
  label,
  value,
  options,
  onChange,
  error,
  disabled,
}: Props) {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentStyle={{ backgroundColor: secondary.dark }}
        anchor={
          <Pressable
            onPress={() => !disabled && setVisible(true)}
            style={[styles.anchor, error && styles.inputError]}
          >
            <Text style={styles.dropdownText}>
              {options.find((o) => o.value === value)?.label || "Select..."}
            </Text>
            <Text style={styles.dropdownIcon}>▾</Text>
          </Pressable>
        }
      >
        {options.map((opt) => (
          <Menu.Item
            key={opt.value}
            onPress={() => {
              onChange(opt.value);
              setVisible(false);
            }}
            title={opt.label}
            titleStyle={{ color: primary.contrastText }}
          />
        ))}
      </Menu>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: Platform.select({ default: 15, android: 13 }) as number,
    marginBottom: 6,
    color: "#222",
  },
  anchor: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    color: "black",
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
  },
  dropdownIcon: {
    color: secondary.dark,
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    paddingLeft: 8,
  },
  inputError: { borderColor: errorColor },
  error: { color: errorColor, fontSize: 14, marginTop: 6 },
});
