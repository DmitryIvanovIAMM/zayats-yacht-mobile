import { errorColor, secondary } from "@/constants/Colors";
import { useAuth } from "@/cotnexts/AuthContext";
import { PATHS } from "@/helpers/paths";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login, authState, setAuthState } = useAuth();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  React.useEffect(() => {
    setAuthState((prev) => ({
      ...prev,
      isValidating: false,
      error: undefined,
    }));
  }, [setValue]);

  React.useEffect(() => {
    register("email", { required: "Email is required" });
    register("password", { required: "Password is required" });
  }, [register]);

  const onSubmit = (data: LoginCredentials) => {
    console.log(data);
    login(data, PATHS.quoteRequest);
  };

  const formDisabled = isSubmitting || authState.isValidating;

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
          editable={!formDisabled}
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
          editable={!formDisabled}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={formDisabled}
      >
        {formDisabled && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      {authState.error && (
        <Text style={styles.errorText}>{authState.error}</Text>
      )}
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
    borderColor: errorColor,
  },
  error: {
    color: errorColor,
    fontSize: 14,
    marginTop: 8,
    justifyContent: "center",
  },
  button: {
    backgroundColor: secondary.dark,
    paddingVertical: 14,
    borderRadius: 2,
    marginTop: 8,
    height: 50,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  spinnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
  },
  hint: {
    marginTop: 18,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  errorText: {
    color: errorColor,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    justifyContent: "center",
  },
});
