import ContactUs from "@/components/ContactUs/ContactUs";
import LoginForm from "@/components/Login/LoginForm";
import { ThemedView } from "@/components/ThemedView";
import { useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const fakeContactUsRef = useRef(null);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.restrictWodth}>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
        <View style={styles.fullWidth}>
          <ContactUs ref={fakeContactUsRef} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    minHeight: "100%",
    justifyContent: "space-between"
  },
  restrictWodth: {
    flex: 1,
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
    marginHorizontal: "auto",
    justifyContent: "space-between"
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    minHeight: "100%",
    justifyContent: "space-between",
    ...Platform.select({
      web: {
        width: "100%"
      },
      default: {
        width: "100%"
      }
    })
  },
  formContainer: {
    width: "100%"
  },
  fullWidth: {
    width: "100%"
  }
});
