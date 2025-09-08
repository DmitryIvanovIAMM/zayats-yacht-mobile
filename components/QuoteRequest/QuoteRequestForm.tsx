import { secondary } from "@/constants/Colors";
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
import FormDropdown from "../FormComponents/FormDropdown";
import FormInput, { FormInputRef } from "../FormComponents/FormInput";
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
  const scrollRef = React.useRef<ScrollView>(null);
  const contentRef = React.useRef<View>(null);

  // capture refs to focus fields programmatically
  const inputRefs = React.useRef<Record<string, FormInputRef | null>>({});
  // capture on-screen Y positions to scroll without measureLayout
  const inputPositions = React.useRef<Record<string, number>>({});

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
    setError,
    control,
  } = useForm<QuoteRequestForm>({
    //sdefaultValues: defaultNonEmptyQuoteRequest,
    defaultValues: defaultQuoteRequest,
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(quoteRequestSchema),
  });

  // dropdown-driven fields
  const purpose = watch("purpose");
  const lengthUnit = watch("lengthUnit");
  const beamUnit = watch("beamUnit");
  const weightUnit = watch("weightUnit");

  // make sure all fields are registered for RHF
  React.useEffect(() => {
    register("firstName");
    register("lastName");
    register("phoneNumber");
    register("email");
    register("insuredValue");
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

  React.useEffect(() => {
    inputRefs.current.firstName?.focus?.();
  }, []);

  const onSubmit = async (data: QuoteRequestForm) => {
    try {
      const res = await postQuoteRequest({ ...data, email: "la-la" });
      if (res.success) {
        showSnackbar(Messages.QuoteRequestSent, "green");
      } else {
        if (res.data && typeof res.data === "object") {
          const fields = Object.keys(res.data) as (keyof QuoteRequestForm)[];
          fields.forEach((field) => {
            const message = Array.isArray(res.data[field])
              ? res.data[field][0]
              : String(res.data[field]);
            setError(field, { message });
          });

          // scroll to first error field
          const firstErrorField = fields[0];
          const y = inputPositions.current[String(firstErrorField)];
          if (typeof y === "number") {
            scrollRef.current?.scrollTo({
              y: Math.max(y - 30, 0),
              animated: true,
            });
          }
          inputRefs.current[firstErrorField as string]?.focus?.();

          return;
        }
        showSnackbar(Messages.QuoteRequestFailed, "red");
      }
    } catch (err) {
      console.error(err);
      showSnackbar(Messages.QuoteRequestFailed, "red");
    }
  };

  const formDisabled = isSubmitting;

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
      <View ref={contentRef}>
        <Text style={styles.title}>Get Quote</Text>

        {/* Contact */}
        <FormInput
          name="firstName"
          control={control}
          label="First Name *"
          placeholder="Enter your first name"
          rules={{ required: "First name is required" }}
          error={errors.firstName}
          ref={(el) => (inputRefs.current.firstName = el)}
          onLayoutY={(y) => (inputPositions.current.firstName = y)}
        />
        <FormInput
          name="lastName"
          control={control}
          label="Last Name *"
          placeholder="Enter your last name"
          rules={{ required: "Last name is required" }}
          error={errors.lastName}
          ref={(el) => (inputRefs.current.lastName = el)}
          onLayoutY={(y) => (inputPositions.current.lastName = y)}
        />
        <FormMaskedInput
          name="phoneNumber"
          control={control}
          label="Phone Number *"
          placeholder="+1 111 111 1111"
          keyboardType="phone-pad"
          mask="+1 (999) 999 9999"
          rules={{ required: "Phone number is required" }}
          error={errors.phoneNumber?.message}
          ref={(el) => (inputRefs.current.phoneNumber = el)}
          onLayoutY={(y) => (inputPositions.current.phoneNumber = y)}
        />
        <FormInput
          name="email"
          control={control}
          label="Email *"
          placeholder="Enter your email"
          keyboardType="email-address"
          rules={{ required: "Email is required" }}
          error={errors.email}
          ref={(el) => (inputRefs.current.email = el)}
          onLayoutY={(y) => (inputPositions.current.email = y)}
        />
        <FormInput
          name="bestTimeToContact"
          control={control}
          label="Best Time to Contact"
          placeholder="e.g. Weekdays after 5pm"
          error={errors.bestTimeToContact}
          ref={(el) => (inputRefs.current.bestTimeToContact = el)}
          onLayoutY={(y) => (inputPositions.current.bestTimeToContact = y)}
        />

        {/* Yacht */}
        <FormInput
          name="yachtName"
          control={control}
          label="Yacht Name"
          placeholder="Enter yacht name"
          error={errors.yachtName}
          ref={(el) => (inputRefs.current.yachtName = el)}
          onLayoutY={(y) => (inputPositions.current.yachtName = y)}
        />
        <FormInput
          name="yachtModel"
          control={control}
          label="Yacht Model"
          placeholder="Enter yacht model"
          error={errors.yachtModel}
          ref={(el) => (inputRefs.current.yachtModel = el)}
          onLayoutY={(y) => (inputPositions.current.yachtModel = y)}
        />

        {/* Purpose */}
        <FormDropdown
          ref={(el) => (inputRefs.current.purpose = el)}
          label="Purpose of Transport"
          value={String(purpose || "")}
          options={Object.keys(PURPOSE_OF_TRANSPORT).map((key) => ({
            label:
              PURPOSE_OF_TRANSPORT[key as keyof typeof PURPOSE_OF_TRANSPORT] ||
              "",
            value: key,
          }))}
          onChange={(val) =>
            setValue("purpose", val as QuoteRequestForm["purpose"], {
              shouldValidate: true,
            })
          }
          error={errors.purpose?.message}
          onLayoutY={(y) => (inputPositions.current.purpose = y)}
          placeholder="Select..."
          disabled={formDisabled}
        />

        {/* Measurements */}
        <View style={styles.row}>
          <View style={styles.col}>
            <FormInput
              name="length"
              control={control}
              label={`Length (${lengthUnit || "unit"})`}
              placeholder="Enter length"
              keyboardType="numeric"
              error={errors.length}
              ref={(el) => (inputRefs.current.length = el)}
              onLayoutY={(y) => (inputPositions.current.length = y)}
              onChangeText={(text: string) =>
                setValue("length", Number(text) || 0, { shouldValidate: true })
              }
            />
          </View>
          <View style={styles.colUnit}>
            <FormDropdown
              ref={(el) => (inputRefs.current.lengthUnit = el)}
              label="Length Unit"
              value={String(lengthUnit || "")}
              options={Object.keys(LENGTH_METRIC).map((key) => ({
                label:
                  lengthMetricViewConnector[
                    key as keyof typeof LENGTH_METRIC
                  ] || "",
                value: key,
              }))}
              onChange={(val) =>
                setValue("lengthUnit", val as any, { shouldValidate: true })
              }
              error={errors.lengthUnit?.message}
              onLayoutY={(y) => (inputPositions.current.lengthUnit = y)}
              disabled={formDisabled}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <FormInput
              name="beam"
              control={control}
              label={`Beam (${beamUnit || "unit"})`}
              placeholder="Enter beam"
              keyboardType="numeric"
              error={errors.beam}
              ref={(el) => (inputRefs.current.beam = el)}
              onLayoutY={(y) => (inputPositions.current.beam = y)}
              onChangeText={(text: string) =>
                setValue("beam", Number(text) || 0, { shouldValidate: true })
              }
            />
          </View>
          <View style={styles.colUnit}>
            <FormDropdown
              ref={(el) => (inputRefs.current.beamUnit = el)}
              label="Beam Unit"
              value={String(beamUnit || "")}
              options={Object.keys(LENGTH_METRIC).map((key) => ({
                label:
                  lengthMetricViewConnector[
                    key as keyof typeof LENGTH_METRIC
                  ] || "",
                value: key,
              }))}
              onChange={(val) =>
                setValue("beamUnit", val as any, { shouldValidate: true })
              }
              error={errors.beamUnit?.message}
              onLayoutY={(y) => (inputPositions.current.beamUnit = y)}
              disabled={formDisabled}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <FormInput
              name="weight"
              control={control}
              label={`Weight (${weightUnit || "unit"})`}
              placeholder="Enter weight"
              keyboardType="numeric"
              error={errors.weight}
              ref={(el) => (inputRefs.current.weight = el)}
              onLayoutY={(y) => (inputPositions.current.weight = y)}
              onChangeText={(text: string) =>
                setValue("weight", Number(text) || 0, { shouldValidate: true })
              }
            />
          </View>
          <View style={styles.colUnit}>
            <FormDropdown
              ref={(el) => (inputRefs.current.weightUnit = el)}
              label="Weight Unit"
              value={String(weightUnit || "")}
              options={Object.keys(WEIGHT_METRIC).map((key) => ({
                label:
                  weightMetricViewConnector[
                    key as keyof typeof WEIGHT_METRIC
                  ] || "",
                value: key,
              }))}
              onChange={(val) =>
                setValue("weightUnit", val as any, { shouldValidate: true })
              }
              error={errors.weightUnit?.message}
              onLayoutY={(y) => (inputPositions.current.weightUnit = y)}
              disabled={formDisabled}
            />
          </View>
        </View>

        <FormInput
          name="insuredValue"
          control={control}
          label="Insured Value (USD)"
          placeholder="Enter insured value"
          keyboardType="numeric"
          error={errors.insuredValue}
          ref={(el) => (inputRefs.current.insuredValue = el)}
          onLayoutY={(y) => (inputPositions.current.insuredValue = y)}
          onChangeText={(text: string) =>
            setValue("insuredValue", Number(text) || 0, {
              shouldValidate: true,
            })
          }
        />

        {/* Routing */}
        <FormInput
          name="fromWhere"
          control={control}
          label="From Where"
          placeholder="Enter departure location"
          error={errors.fromWhere}
          ref={(el) => (inputRefs.current.fromWhere = el)}
          onLayoutY={(y) => (inputPositions.current.fromWhere = y)}
        />
        <FormInput
          name="toWhere"
          control={control}
          label="To Where"
          placeholder="Enter destination location"
          error={errors.toWhere}
          ref={(el) => (inputRefs.current.toWhere = el)}
          onLayoutY={(y) => (inputPositions.current.toWhere = y)}
        />
        <FormInput
          name="when"
          control={control}
          label="When"
          placeholder="Enter preferred transport date"
          error={errors.when}
          ref={(el) => (inputRefs.current.when = el)}
          onLayoutY={(y) => (inputPositions.current.when = y)}
        />

        {/* Notes */}
        <FormInput
          name="notes"
          control={control}
          label="Notes"
          placeholder="Additional details"
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top" }}
          error={errors.notes}
          ref={(el) => (inputRefs.current.notes = el)}
          onLayoutY={(y) => (inputPositions.current.notes = y)}
        />

        <TouchableOpacity
          style={[
            styles.button,
            (formDisabled || !isValid) && { opacity: 0.6 },
          ]}
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 30,
    paddingRight: 30,
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
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  col: {
    flex: 1,
  },
  colUnit: {
    width: 160,
    marginLeft: 12,
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
});
