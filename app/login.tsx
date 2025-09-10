import ContactUs from "@/components/ContactUs/ContactUs";
import LoginForm from "@/components/Login/LoginForm";
import { ThemedView } from "@/components/ThemedView";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const fakeContactUsRef = useRef(null);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
      <View style={styles.fullWidth}>
        <ContactUs ref={fakeContactUsRef} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    minHeight: "100%",
    justifyContent: "space-between",
  },
  formContainer: {
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
});
