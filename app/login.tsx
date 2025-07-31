import ContactUs from "@/components/ContactUs/ContactUs";
import LoginForm from "@/components/Login/LoginForm";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
      <View style={styles.fullWidth}>
        <ContactUs />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    backgroundColor: "white",
  },
  formContainer: {
    ///padding: 20,
  },
  fullWidth: {
    width: "100%",
  },
});
