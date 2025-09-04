import { errorColor, secondary } from "@/constants/Colors";
import { useAuth } from "@/cotnexts/AuthContext";
import { PATHS } from "@/helpers/paths";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { FormContainer } from "../FormContainer/FormContainer";

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

  const [showPassword, setShowPassword] = useState(false);

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
    login(data, PATHS.quoteRequest);
  };

  const formDisabled = isSubmitting || authState.isValidating;

  return (
    <View style={styles.container}>
      <FormContainer>
        <Text style={styles.title}>Sign in to your account</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            outlineStyle={[
              styles.inputBorder,
              errors.email && styles.inputError,
            ]}
            textColor="black"
            cursorColor="black"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            onChangeText={(text) =>
              setValue("email", text, { shouldValidate: true })
            }
            editable={!formDisabled}
            mode="outlined"
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            outlineStyle={[
              styles.inputBorder,
              errors.password && styles.inputError,
            ]}
            textColor="black"
            cursorColor="black"
            secureTextEntry={!showPassword}
            placeholder="••••••••"
            onChangeText={(text) =>
              setValue("password", text, { shouldValidate: true })
            }
            editable={!formDisabled}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                size={Platform.select({ default: 28, android: 22 })}
                color={secondary.dark}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.icon}
              />
            }
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
      </FormContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 2,
    elevation: 2,
  },
  title: Platform.select({
    android: {
      fontSize: 16,
      fontWeight: "500",
      color: secondary.dark,
      marginBottom: 20,
      textAlign: "center",
    },
    default: {
      fontSize: 22,
      fontWeight: "600",
      color: secondary.dark,
      marginBottom: 24,
      paddingTop: 40,
      textAlign: "center",
    },
  }),
  inputGroup: {
    marginBottom: 18,
  },
  label: Platform.select({
    default: {
      fontSize: 15,
      marginBottom: 6,
      color: "#222",
    },
    android: {
      fontSize: 13,
      marginBottom: 4,
      color: "#222",
    },
  }),
  input: Platform.select({
    default: {
      borderWidth: 0,
      borderColor: "#ddd",
      borderRadius: 0,
      padding: 8,
      fontSize: 16,
      color: secondary.dark,
      backgroundColor: "#fafafa",
      height: 24,
      width: "100%",
      paddingHorizontal: 0,
    },
    android: {
      borderWidth: 0,
      borderColor: "#ddd",
      borderRadius: 0,
      padding: 8,
      fontSize: 14,
      color: secondary.dark,
      backgroundColor: "#fafafa",
      height: 18,
      width: "100%",
      paddingHorizontal: 0,
    },
  }),
  inputBorder: {
    borderColor: secondary.dark,
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
  button: Platform.select({
    default: {
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
    android: {
      backgroundColor: secondary.dark,
      paddingVertical: 10,
      borderRadius: 2,
      marginTop: 8,
      height: 40,
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
  }),
  buttonText: Platform.select({
    default: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    android: {
      color: "#fff",
      fontWeight: "500",
      fontSize: 12,
    },
  }),
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
  icon: {
    paddingTop: 16,
  },
});
