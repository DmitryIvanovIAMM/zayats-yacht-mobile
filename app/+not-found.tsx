import ContactUs from "@/components/ContactUs/ContactUs";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  const fakeContactUsRef = useRef(null);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <SectionTitle>This screen doesn't exist.</SectionTitle>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" style={styles.link}>
            Go to home screen!
          </ThemedText>
        </Link>
        <View style={styles.fullWidth}>
          <ContactUs ref={fakeContactUsRef} />
        </View>
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
    flexDirection: "column"
  },
  link: {
    fontSize: 20,
    marginBottom: 20,
    paddingVertical: 20,
    justifyContent: "flex-start"
  },
  fullWidth: {
    width: "100%"
  }
});
