import { secondary } from "@/constants/Colors";
import React from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  React.useEffect(() => {
    register("email", { required: "Email is required" });
    register("password", { required: "Password is required" });
  }, [register]);

  const onSubmit = (data: FormData) => {
    // Handle login logic here
    // e.g., call API or authentication function
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          onChangeText={(text) =>
            setValue("email", text, { shouldValidate: true })
          }
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          secureTextEntry
          placeholder="••••••••"
          onChangeText={(text) =>
            setValue("password", text, { shouldValidate: true })
          }
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.hint}>
        Don't have an account? <Text style={styles.link}>Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    margin: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: secondary.dark,
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  inputError: {
    borderColor: "#e53935",
  },
  error: {
    color: "#e53935",
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: secondary.dark,
    paddingVertical: 14,
    borderRadius: 2,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  hint: {
    marginTop: 18,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  link: {
    color: "#1e88e5",
    fontWeight: "500",
  },
});
