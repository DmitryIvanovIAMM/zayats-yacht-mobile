import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default function Instructions() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <SectionTitle>Yacht Transport Instructions</SectionTitle>
    </ScrollView>
  );
}
