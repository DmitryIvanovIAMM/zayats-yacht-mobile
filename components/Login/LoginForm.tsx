import { errorColor, secondary } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { PATHS } from "@/helpers/paths";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as yup from "yup";
import FormInput from "../FormComponents/FormInput";
import { FormContainer } from "../FormContainer/FormContainer";

export interface LoginCredentials {
  email: string;
  password: string;
}

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  //   password: yup.string().required("Password is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(passwordRules, { message: "Please create a stronger password" })
});

export default function LoginForm() {
  const { login, authState, setAuthState } = useAuth();

  const methods = useForm<LoginCredentials>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    setAuthState((prev) => ({
      ...prev,
      isValidating: false,
      error: undefined
    }));
  }, [setAuthState]);

  const onSubmit = (data: LoginCredentials) => {
    login(data, PATHS.quoteRequest);
  };

  const formDisabled = isSubmitting || authState.isValidating;

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <FormContainer>
          <Text style={styles.title}>Sign in to your account</Text>

          <FormInput
            name="email"
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            disabled={formDisabled}
            // autoCapitalize is set to "none" to prevent automatic capitalization in email input
          />

          <View style={{ position: "relative" }}>
            <FormInput
              name="password"
              label="Password"
              placeholder="••••••••"
              disabled={formDisabled}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            {/* Toggle password visibility */}
            <TouchableOpacity
              onPress={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 8,
                top: Platform.select({ default: 34, android: 34 })
              }}
              disabled={formDisabled}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={secondary.dark}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (formDisabled || !isValid) && { opacity: 0.6 }
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={formDisabled || !isValid}
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
      </FormProvider>
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
    elevation: 2
  },
  title: Platform.select({
    android: {
      fontSize: 16,
      fontWeight: "500",
      color: secondary.dark,
      marginBottom: 20,
      textAlign: "center"
    },
    default: {
      fontSize: 22,
      fontWeight: "600",
      color: secondary.dark,
      marginBottom: 24,
      paddingTop: 40,
      textAlign: "center"
    }
  }),
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
      alignItems: "center"
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
      alignItems: "center"
    }
  }),
  buttonText: Platform.select({
    default: { color: "#fff", fontWeight: "600", fontSize: 16 },
    android: { color: "#fff", fontWeight: "500", fontSize: 12 }
  }),
  spinnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16
  },
  errorText: {
    color: errorColor,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    justifyContent: "center"
  }
});
