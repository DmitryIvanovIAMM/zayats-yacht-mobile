import { errorColor, primary, secondary } from "@/constants/Colors";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu, TextInput } from "react-native-paper";
import { postQuoteRequest } from "./postQuoteRequest";
import {
  defaultQuoteRequest,
  LENGTH_METRIC,
  lengthMetricViewConnector,
  PURPOSE_OF_TRANSPORT,
  QuoteRequestForm,
  WEIGHT_METRIC,
} from "./quoteRequestTypes";

export default function QuoteForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<QuoteRequestForm>({
    defaultValues: defaultQuoteRequest,
  });

  React.useEffect(() => {
    register("firstName", { required: "First name is required" });
    register("lastName", { required: "Last name is required" });
    register("phoneNumber", { required: "Phone is required" });
    register("email", { required: "Email is required" });
    register("insuredValue", { required: "Insured value is required" });
    register("length");
    register("beam");
    register("weight");
    register("lengthUnit");
    register("beamUnit");
    register("weightUnit");
    register("bestTimeToContact");
    register("yachtName");
    register("yachtModel");
    register("purpose");
    register("fromWhere");
    register("toWhere");
    register("when");
    register("notes");
  }, [register]);

  const purpose = watch("purpose");
  const lengthUnit = watch("lengthUnit");
  const beamUnit = watch("beamUnit");
  const weightUnit = watch("weightUnit");

  const [purposeMenuVisible, setPurposeMenuVisible] = React.useState(false);
  const [lengthMenuVisible, setLengthMenuVisible] = React.useState(false);
  const [beamMenuVisible, setBeamMenuVisible] = React.useState(false);
  const [weightMenuVisible, setWeightMenuVisible] = React.useState(false);

  const onSubmit = async (data: QuoteRequestForm) => {
    await postQuoteRequest(data, "");
  };

  const formDisabled = isSubmitting;

  const onKeyOpen = (openFn: () => void) => (e: any) => {
    const key = e?.nativeEvent?.key;
    if (key === "Enter" || key === " ") openFn();
  };

  const DropdownAnchor = ({
    value,
    onPress,
    hasError,
    tabIndex = 0,
  }: {
    value: string;
    onPress: () => void;
    hasError?: boolean;
    tabIndex?: number;
  }) => (
    <Pressable
      onPress={onPress}
      onKeyDown={onKeyOpen(onPress)}
      accessible
      accessibilityRole="button"
      focusable
      // важно для web
      // @ts-ignore
      tabIndex={tabIndex}
      importantForAccessibility="yes"
      style={[
        styles.dropdownAnchor,
        hasError ? styles.inputError : styles.inputBorder,
      ]}
    >
      <Text style={styles.dropdownText}>{value || "Select..."}</Text>
      <Text style={styles.dropdownIcon}>▾</Text>
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get Quote</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[
            styles.inputBorder,
            errors.firstName && styles.inputError,
          ]}
          textColor="black"
          cursorColor="black"
          placeholder="John"
          onChangeText={(text) =>
            setValue("firstName", text, { shouldValidate: true })
          }
          editable={!formDisabled}
          mode="outlined"
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[
            styles.inputBorder,
            errors.lastName && styles.inputError,
          ]}
          textColor="black"
          cursorColor="black"
          placeholder="Doe"
          onChangeText={(text) =>
            setValue("lastName", text, { shouldValidate: true })
          }
          editable={!formDisabled}
          mode="outlined"
        />
        {errors.lastName && (
          <Text style={styles.error}>{errors.lastName.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[
            styles.inputBorder,
            errors.phoneNumber && styles.inputError,
          ]}
          textColor="black"
          cursorColor="black"
          keyboardType="phone-pad"
          placeholder="+1 555 123 4567"
          onChangeText={(text) =>
            setValue("phoneNumber", text, { shouldValidate: true })
          }
          editable={!formDisabled}
          mode="outlined"
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>{errors.phoneNumber.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder, errors.email && styles.inputError]}
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
        <Text style={styles.label}>Best Time to Contact</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          placeholder="Anytime"
          onChangeText={(text) => setValue("bestTimeToContact", text)}
          editable={!formDisabled}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Purpose of Transport</Text>
        <Menu
          visible={purposeMenuVisible}
          onDismiss={() => setPurposeMenuVisible(false)}
          contentStyle={{ backgroundColor: secondary.dark }}
          anchor={
            <DropdownAnchor
              value={PURPOSE_OF_TRANSPORT[purpose || ""] || ""}
              onPress={() => setPurposeMenuVisible(true)}
              hasError={false}
              tabIndex={5}
            />
          }
        >
          {Object.keys(PURPOSE_OF_TRANSPORT)
            .filter((k) => k !== "")
            .map((key) => (
              <Menu.Item
                key={key}
                onPress={() => {
                  setValue("purpose", key as any, { shouldValidate: true });
                  setPurposeMenuVisible(false);
                }}
                title={
                  PURPOSE_OF_TRANSPORT[key as keyof typeof PURPOSE_OF_TRANSPORT]
                }
                titleStyle={{ color: primary.contrastText }}
              />
            ))}
        </Menu>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Yacht Name</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          placeholder="My Yacht"
          onChangeText={(text) => setValue("yachtName", text)}
          editable={!formDisabled}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Yacht Model</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          placeholder="Model X"
          onChangeText={(text) => setValue("yachtModel", text)}
          editable={!formDisabled}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Insured Value in USD</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[
            styles.inputBorder,
            errors.insuredValue && styles.inputError,
          ]}
          textColor="black"
          cursorColor="black"
          keyboardType="numeric"
          placeholder="100000"
          onChangeText={(text) =>
            setValue("insuredValue", Number(text) || 0, {
              shouldValidate: true,
            })
          }
          editable={!formDisabled}
          mode="outlined"
        />
        {errors.insuredValue && (
          <Text style={styles.error}>{errors.insuredValue.message}</Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>
            Length (
            {
              lengthMetricViewConnector[
                lengthUnit as keyof typeof LENGTH_METRIC
              ]
            }
            )
          </Text>
          <TextInput
            style={styles.input}
            outlineStyle={[styles.inputBorder]}
            textColor="black"
            cursorColor="black"
            keyboardType="numeric"
            placeholder="30"
            onChangeText={(text) => setValue("length", Number(text) || 0)}
            editable={!formDisabled}
            mode="outlined"
          />
        </View>
        <View style={styles.colUnit}>
          <Text style={styles.label}>Length Unit</Text>
          <Menu
            visible={lengthMenuVisible}
            onDismiss={() => setLengthMenuVisible(false)}
            contentStyle={{ backgroundColor: secondary.dark }}
            anchor={
              <DropdownAnchor
                value={
                  lengthMetricViewConnector[
                    lengthUnit as keyof typeof LENGTH_METRIC
                  ] || ""
                }
                onPress={() => setLengthMenuVisible(true)}
                hasError={false}
                tabIndex={7}
              />
            }
          >
            {Object.keys(LENGTH_METRIC).map((key) => (
              <Menu.Item
                key={key}
                onPress={() => {
                  setValue("lengthUnit", key as keyof typeof LENGTH_METRIC, {
                    shouldValidate: true,
                  });
                  setLengthMenuVisible(false);
                }}
                title={
                  lengthMetricViewConnector[key as keyof typeof LENGTH_METRIC]
                }
                titleStyle={{ color: primary.contrastText }}
              />
            ))}
          </Menu>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>
            Beam (
            {lengthMetricViewConnector[beamUnit as keyof typeof LENGTH_METRIC]})
          </Text>
          <TextInput
            style={styles.input}
            outlineStyle={[styles.inputBorder]}
            textColor="black"
            cursorColor="black"
            keyboardType="numeric"
            placeholder="10"
            onChangeText={(text) => setValue("beam", Number(text) || 0)}
            editable={!formDisabled}
            mode="outlined"
          />
        </View>
        <View style={styles.colUnit}>
          <Text style={styles.label}>Beam Unit</Text>
          <Menu
            visible={beamMenuVisible}
            onDismiss={() => setBeamMenuVisible(false)}
            contentStyle={{ backgroundColor: secondary.dark }}
            anchor={
              <DropdownAnchor
                value={
                  lengthMetricViewConnector[
                    beamUnit as keyof typeof LENGTH_METRIC
                  ] || ""
                }
                onPress={() => setBeamMenuVisible(true)}
                hasError={false}
                tabIndex={8}
              />
            }
          >
            {Object.keys(LENGTH_METRIC).map((key) => (
              <Menu.Item
                key={key}
                onPress={() => {
                  setValue("beamUnit", key as keyof typeof LENGTH_METRIC, {
                    shouldValidate: true,
                  });
                  setBeamMenuVisible(false);
                }}
                title={
                  lengthMetricViewConnector[key as keyof typeof LENGTH_METRIC]
                }
                titleStyle={{ color: primary.contrastText }}
              />
            ))}
          </Menu>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>
            Weight ({WEIGHT_METRIC[weightUnit as keyof typeof WEIGHT_METRIC]})
          </Text>
          <TextInput
            style={styles.input}
            outlineStyle={[styles.inputBorder]}
            textColor="black"
            cursorColor="black"
            keyboardType="numeric"
            placeholder="50"
            onChangeText={(text) => setValue("weight", Number(text) || 0)}
            editable={!formDisabled}
            mode="outlined"
          />
        </View>
        <View style={styles.colUnit}>
          <Text style={styles.label}>Weight Unit</Text>
          <Menu
            visible={weightMenuVisible}
            onDismiss={() => setWeightMenuVisible(false)}
            contentStyle={{ backgroundColor: secondary.dark }}
            anchor={
              <DropdownAnchor
                value={
                  WEIGHT_METRIC[weightUnit as keyof typeof WEIGHT_METRIC] || ""
                }
                onPress={() => setWeightMenuVisible(true)}
                hasError={false}
                tabIndex={0}
              />
            }
          >
            {Object.keys(WEIGHT_METRIC).map((key) => (
              <Menu.Item
                key={key}
                onPress={() => {
                  setValue("weightUnit", key as keyof typeof WEIGHT_METRIC, {
                    shouldValidate: true,
                  });
                  setWeightMenuVisible(false);
                }}
                title={WEIGHT_METRIC[key as keyof typeof WEIGHT_METRIC]}
                titleStyle={{ color: primary.contrastText }}
              />
            ))}
          </Menu>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>From Where</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          placeholder="Miami"
          onChangeText={(text) => setValue("fromWhere", text)}
          editable={!formDisabled}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>To Where</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          placeholder="Bahamas"
          onChangeText={(text) => setValue("toWhere", text)}
          editable={!formDisabled}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>When</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          placeholder="2025-01-20"
          onChangeText={(text) => setValue("when", text)}
          editable={!formDisabled}
          mode="outlined"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          outlineStyle={[styles.inputBorder]}
          textColor="black"
          cursorColor="black"
          multiline
          placeholder="Additional details"
          onChangeText={(text) => setValue("notes", text)}
          editable={!formDisabled}
          mode="outlined"
        />
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
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: "#fff",
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
  dropdownAnchor: Platform.select({
    default: {
      backgroundColor: "#fafafa",
      borderWidth: 1,
      borderRadius: 0,
      padding: 8,
      height: 40,
      width: "100%",
      borderColor: secondary.dark,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    android: {
      backgroundColor: "#fafafa",
      borderWidth: 1,
      borderRadius: 0,
      padding: 8,
      height: 36,
      width: "100%",
      borderColor: secondary.dark,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  }),
  dropdownText: {
    color: "black",
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
  },
  dropdownIcon: {
    color: secondary.dark,
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    paddingLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  col: {
    flex: 1,
  },
  colUnit: {
    width: 160,
    marginLeft: 12,
  },
});
