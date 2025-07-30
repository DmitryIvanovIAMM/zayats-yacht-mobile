import { secondary } from "@/constants/Colors"; // Adjust the import path as necessary
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

type SectionTitleProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ children, style }) => (
  <View style={styles.container}>
    <Text style={[styles.title, style]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24, // h2 equivalent
    fontWeight: "bold",
    textTransform: "uppercase",
    color: secondary.dark, // Use the color constant
    textAlign: "center",
    marginVertical: 16,
  },
  container: {
    width: "80%",
    alignSelf: "center",
  },
});

export default SectionTitle;
