import { errorColor, secondary } from "@/constants/Colors";
import { Messages } from "@/helpers/messages";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import FormDropdown from "../FormComponents/FormDropdown";
import FormInput from "../FormComponents/FormInput";
import FormMaskedInput from "../FormComponents/FormMaskedInput";
import { postQuoteRequest } from "./postQuoteRequest";
import {
  defaultQuoteRequest,
  LENGTH_METRIC,
  lengthMetricViewConnector,
  PURPOSE_OF_TRANSPORT,
  QuoteRequestForm,
  quoteRequestSchema,
  WEIGHT_METRIC,
  weightMetricViewConnector,
} from "./quoteRequestTypes";

export default function QuoteForm() {
  const [snackbar, setSnackbar] = React.useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({ visible: false, message: "", color: "green" });

  const showSnackbar = (message: string, color: string) => {
    setSnackbar({ visible: true, message, color });
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<QuoteRequestForm>({
    defaultValues: defaultQuoteRequest,
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(quoteRequestSchema),
  });
  console.log("isFormValid: ", isValid);
  console.log("errors: ", errors);

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

  const onSubmit = async (data: QuoteRequestForm) => {
    try {
      // await postQuoteRequest(data, "");
      await postQuoteRequest({ ...data, email: "la-la" }, "");
      showSnackbar(Messages.QuoteRequestSent, "green");
    } catch (err) {
      console.error(err);
      showSnackbar(Messages.QuoteRequestFailed, "red");
    }
  };

  const formDisabled = isSubmitting;
  console.log("formDisabled: ", formDisabled);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get Quote</Text>

      <FormInput
        label="First Name *"
        value={watch("firstName")}
        onChangeText={(text) =>
          setValue("firstName", text, { shouldValidate: true })
        }
        error={errors.firstName?.message}
      />

      <FormInput
        label="Last Name *"
        value={watch("lastName")}
        onChangeText={(text) =>
          setValue("lastName", text, { shouldValidate: true })
        }
        error={errors.lastName?.message}
      />

      <FormMaskedInput
        label="Phone *"
        value={watch("phoneNumber") || undefined}
        onChangeText={(masked, raw) =>
          setValue("phoneNumber", raw, { shouldValidate: true })
        }
        error={errors.phoneNumber?.message}
        mask="+1 999 999 9999"
        keyboardType="phone-pad"
      />

      <FormInput
        label="Email *"
        value={watch("email")}
        onChangeText={(text) =>
          setValue("email", text, { shouldValidate: true })
        }
        error={errors.email?.message}
        keyboardType="email-address"
      />

      <FormInput
        label="Best Time to Contact"
        value={watch("bestTimeToContact") || ""}
        onChangeText={(text) => setValue("bestTimeToContact", text)}
        error={errors.bestTimeToContact?.message}
        placeholder="e.g. Weekdays after 5pm"
      />
      <FormDropdown
        label="Purpose of Transport"
        value={String(purpose || "")}
        options={Object.keys(PURPOSE_OF_TRANSPORT).map((key) => ({
          label:
            PURPOSE_OF_TRANSPORT[key as keyof typeof PURPOSE_OF_TRANSPORT] ||
            "",
          value: key,
        }))}
        onChange={(text) => setValue("purpose", text)}
        error={errors.purpose?.message}
      />

      <FormInput
        label="Yacht Name"
        value={watch("yachtName") || ""}
        onChangeText={(text) => setValue("yachtName", text)}
        error={errors.yachtName?.message}
      />

      <FormInput
        label="Yacht Model"
        value={watch("yachtModel") || ""}
        onChangeText={(text) => setValue("yachtModel", text)}
        error={errors.yachtModel?.message}
      />

      <FormInput
        label="Insured Value in USD"
        value={watch("insuredValue") ? String(watch("insuredValue")) : ""}
        onChangeText={(text) =>
          setValue("insuredValue", Number(text) || 0, {
            shouldValidate: true,
          })
        }
        error={errors.insuredValue?.message}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <FormInput
            label={`Length (${
              lengthMetricViewConnector[
                lengthUnit as keyof typeof LENGTH_METRIC
              ]
            })`}
            value={watch("length") ? String(watch("length")) : ""}
            onChangeText={(text) =>
              setValue("length", Number(text) || 0, { shouldValidate: true })
            }
            error={errors.length?.message}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.colUnit}>
          <FormDropdown
            label="Length Unit"
            value={String(lengthUnit || "")}
            options={Object.keys(LENGTH_METRIC).map((key) => ({
              label:
                lengthMetricViewConnector[key as keyof typeof LENGTH_METRIC] ||
                "",
              value: key,
            }))}
            onChange={(text) =>
              setValue("lengthUnit", text as keyof typeof LENGTH_METRIC, {
                shouldValidate: true,
              })
            }
            error={errors.lengthUnit?.message}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <FormInput
            label={`Beam (${
              lengthMetricViewConnector[beamUnit as keyof typeof LENGTH_METRIC]
            })`}
            value={watch("beam") ? String(watch("beam")) : ""}
            onChangeText={(text) =>
              setValue("beam", Number(text) || 0, { shouldValidate: true })
            }
            error={errors.beam?.message}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.colUnit}>
          <FormDropdown
            label="Beam Unit"
            value={String(beamUnit || "")}
            options={Object.keys(LENGTH_METRIC).map((key) => ({
              label:
                lengthMetricViewConnector[key as keyof typeof LENGTH_METRIC] ||
                "",
              value: key,
            }))}
            onChange={(text) =>
              setValue("beamUnit", text as keyof typeof LENGTH_METRIC, {
                shouldValidate: true,
              })
            }
            error={errors.beamUnit?.message}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <FormInput
            label={`Weight (${
              weightMetricViewConnector[
                weightUnit as keyof typeof WEIGHT_METRIC
              ]
            })`}
            value={watch("weight") ? String(watch("weight")) : ""}
            onChangeText={(text) =>
              setValue("weight", Number(text) || 0, { shouldValidate: true })
            }
            error={errors.weight?.message}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.colUnit}>
          <FormDropdown
            label="Weight Unit"
            value={String(weightUnit || "")}
            options={Object.keys(WEIGHT_METRIC).map((key) => ({
              label:
                weightMetricViewConnector[key as keyof typeof WEIGHT_METRIC] ||
                "",
              value: key,
            }))}
            onChange={(text) =>
              setValue("weightUnit", text as keyof typeof WEIGHT_METRIC, {
                shouldValidate: true,
              })
            }
            error={errors.weightUnit?.message}
          />
        </View>
      </View>

      <FormInput
        label="From Where"
        value={watch("fromWhere") || ""}
        onChangeText={(text) => setValue("fromWhere", text)}
        error={errors.fromWhere?.message}
      />

      <FormInput
        label="To Where"
        value={watch("toWhere") ? String(watch("toWhere")) : ""}
        onChangeText={(text) =>
          setValue("toWhere", text, { shouldValidate: true })
        }
        error={errors.toWhere?.message}
      />

      <FormInput
        label="When"
        value={watch("when") ? String(watch("when")) : ""}
        onChangeText={(text) =>
          setValue("when", text, { shouldValidate: true })
        }
        error={errors.when?.message}
      />

      <FormInput
        label="Notes"
        value={watch("notes") || ""}
        onChangeText={(text) => setValue("notes", text)}
        error={errors.notes?.message}
        placeholder="Additional details"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[styles.button, (formDisabled || !isValid) && { opacity: 0.6 }]}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPress={handleSubmit(onSubmit)}
        disabled={formDisabled || !isValid}
      >
        {formDisabled && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {/* Snackbar */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        style={{
          backgroundColor: snackbar.color,
          height: 50,
          marginBottom: 80,
        }}
      >
        {snackbar.message}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: "#fff",
    paddingBottom: 100,
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
      paddingTop: 20,
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
  paperLikeInput: {
    borderWidth: 1,
    borderColor: secondary.dark,
    borderRadius: 4,
    backgroundColor: "#fafafa",
    height: 40, // match react-native-paper input height
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  maskedInputText: {
    fontSize: Platform.select({ default: 16, android: 14 }) as number,
    color: "black",
    padding: 0,
  },
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
    //marginBottom: 18,
  },
  col: {
    flex: 1,
  },
  colUnit: {
    width: 160,
    marginLeft: 12,
  },
});
