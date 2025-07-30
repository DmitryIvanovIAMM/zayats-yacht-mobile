import ContactUs from "@/components/ContactUs/ContactUs";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <SectionTitle>This screen doesn't exist.</SectionTitle>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" style={styles.link}>
            Go to home screen!
          </ThemedText>
        </Link>
        <ContactUs />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
    minHeight: "100%",
    paddingTop: 40,
    flexGrow: 1,
    flexDirection: "column",
  },
  link: {
    fontSize: 20,
    marginBottom: 20,
    paddingVertical: 20,
    justifyContent: "flex-start",
  },
});
