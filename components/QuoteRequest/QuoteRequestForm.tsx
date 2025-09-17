import { secondary } from "@/constants/Colors";
import { Messages } from "@/helpers/messages";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Snackbar } from "react-native-paper";
import FormDropdown from "../FormComponents/FormDropdown";
import FormInput, { FormInputRef } from "../FormComponents/FormInput";
import FormMaskedInput from "../FormComponents/FormMaskedInput";
import { handleServerValidationErrors } from "../FormComponents/handleServerValidationErrors";
import { postQuoteRequest } from "./postQuoteRequest";
import {
  defaultNonEmptyQuoteRequest,
  LENGTH_METRIC,
  lengthMetricViewConnector,
  PURPOSE_OF_TRANSPORT,
  QuoteRequestForm,
  WEIGHT_METRIC,
  weightMetricViewConnector
} from "./quoteRequestTypes";

export default function QuoteForm() {
  const scrollRef = React.useRef<ScrollView>(null);

  // capture refs to focus fields programmatically
  const inputRefs = React.useRef<Record<string, FormInputRef | null>>({});
  // capture on-screen Y positions to scroll without measureLayout
  const inputPositions = React.useRef<Record<string, number>>({});
  // when submission returns errors, we want to focus the first errored field
  // but it is still disabled, so we queue it here
  // and focus it when submission state is cleared
  // we use a ref to avoid triggering useEffect on every render with state
  const pendingFocusRef = React.useRef<keyof QuoteRequestForm | null>(null);

  const [snackbar, setSnackbar] = React.useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({ visible: false, message: "", color: "green" });

  const showSnackbar = (message: string, color: string) => {
    setSnackbar({ visible: true, message, color });
  };

  const methods = useForm<QuoteRequestForm>({
    // defaultValues: defaultQuoteRequest,
    defaultValues: defaultNonEmptyQuoteRequest,
    mode: "onBlur",
    reValidateMode: "onChange"
    // resolver: yupResolver(quoteRequestSchema) as any
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    watch,
    setError
  } = methods;

  // dropdown-driven fields
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
      // const res = await postQuoteRequest({ ...data, phoneNumber: "" });
      const res = await postQuoteRequest({ ...data, email: "la-la" });

      if (res.success) {
        showSnackbar(Messages.QuoteRequestSent, "green");
      } else {
        const { handled, firstErrorField } =
          handleServerValidationErrors<QuoteRequestForm>({
            response: res,
            setError,
            scrollRef: scrollRef as React.RefObject<ScrollView>,
            inputPositions: inputPositions.current
          });

        if (handled && firstErrorField) {
          // queue focus until submit finishes (inputs are disabled while submitting)
          pendingFocusRef.current = firstErrorField as keyof QuoteRequestForm;
          return;
        }

        showSnackbar(Messages.QuoteRequestFailed, "red");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("QuoteRequestForm onSubmit error: ", err);
      showSnackbar(Messages.QuoteRequestFailed, "red");
    }
  };

  React.useEffect(() => {
    if (!isSubmitting && pendingFocusRef.current) {
      const field = pendingFocusRef.current;
      pendingFocusRef.current = null;
      // next frame to ensure editable is applied
      requestAnimationFrame(() => {
        inputRefs.current[field as string]?.focus?.();
      });
    }
  }, [isSubmitting]);

  const formDisabled = isSubmitting;

  return (
    <FormProvider {...methods}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Get Quote</Text>

          {/* Contact */}
          <FormInput
            name="firstName"
            label="First Name *"
            placeholder="Enter your first name"
            ref={(el) => {
              inputRefs.current.firstName = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.firstName = y;
            }}
            disabled={formDisabled}
          />
          <FormInput
            name="lastName"
            label="Last Name *"
            placeholder="Enter your last name"
            ref={(el) => {
              inputRefs.current.lastName = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.lastName = y;
            }}
            disabled={formDisabled}
          />
          <FormInput
            name="email"
            label="Email *"
            placeholder="Enter your email"
            keyboardType="email-address"
            ref={(el) => {
              inputRefs.current.email = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.email = y;
            }}
            disabled={formDisabled}
          />
          <FormMaskedInput
            name="phoneNumber"
            label="Phone Number *"
            placeholder="+1 111 111 1111"
            keyboardType="phone-pad"
            mask="+1 999 999 9999"
            ref={(el) => {
              inputRefs.current.phoneNumber = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.phoneNumber = y;
            }}
            disabled={formDisabled}
          />

          <FormInput
            name="bestTimeToContact"
            label="Best Time to Contact"
            placeholder="e.g. Weekdays after 5pm"
            ref={(el) => {
              inputRefs.current.bestTimeToContact = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.bestTimeToContact = y;
            }}
            disabled={formDisabled}
          />

          {/* Yacht */}
          <FormInput
            name="yachtName"
            label="Yacht Name"
            placeholder="Enter yacht name"
            ref={(el) => {
              inputRefs.current.yachtName = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.yachtName = y;
            }}
            disabled={formDisabled}
          />
          <FormInput
            name="yachtModel"
            label="Yacht Model"
            placeholder="Enter yacht model"
            ref={(el) => {
              inputRefs.current.yachtModel = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.yachtModel = y;
            }}
            disabled={formDisabled}
          />

          {/* Purpose */}
          <FormDropdown
            ref={(el) => {
              inputRefs.current.purpose = el;
            }}
            name="purpose"
            label="Purpose of Transport *"
            options={Object.keys(PURPOSE_OF_TRANSPORT).map((key) => ({
              label:
                PURPOSE_OF_TRANSPORT[
                  key as keyof typeof PURPOSE_OF_TRANSPORT
                ] || "",
              value: key
            }))}
            onLayoutY={(y) => {
              inputPositions.current.purpose = y;
            }}
            placeholder="Select..."
            disabled={formDisabled}
          />

          {/* Measurements */}
          <View style={styles.row}>
            <View style={styles.col}>
              <FormInput
                name="length"
                label={`Length (${lengthUnit || "unit"})`}
                placeholder="Enter length"
                keyboardType="numeric"
                ref={(el) => {
                  inputRefs.current.length = el;
                }}
                onLayoutY={(y) => {
                  inputPositions.current.length = y;
                }}
                disabled={formDisabled}
              />
            </View>
            <View style={styles.colUnit}>
              <FormDropdown
                ref={(el) => {
                  inputRefs.current.lengthUnit = el;
                }}
                name="lengthUnit"
                label="Length Unit"
                options={Object.keys(LENGTH_METRIC).map((key) => ({
                  label:
                    lengthMetricViewConnector[
                      key as keyof typeof lengthMetricViewConnector
                    ] || String(key),
                  value: key
                }))}
                onLayoutY={(y) => {
                  inputPositions.current.lengthUnit = y;
                }}
                disabled={formDisabled}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <FormInput
                name="beam"
                label={`Beam (${beamUnit || "unit"})`}
                placeholder="Enter beam"
                keyboardType="numeric"
                ref={(el) => {
                  inputRefs.current.beam = el;
                }}
                onLayoutY={(y) => {
                  inputPositions.current.beam = y;
                }}
                disabled={formDisabled}
              />
            </View>
            <View style={styles.colUnit}>
              <FormDropdown
                ref={(el) => {
                  inputRefs.current.beamUnit = el;
                }}
                name="beamUnit"
                label="Beam Unit"
                options={Object.keys(LENGTH_METRIC).map((key) => ({
                  label:
                    lengthMetricViewConnector[
                      key as keyof typeof lengthMetricViewConnector
                    ] || String(key),
                  value: key
                }))}
                onLayoutY={(y) => {
                  inputPositions.current.beamUnit = y;
                }}
                disabled={formDisabled}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <FormInput
                name="weight"
                label={`Weight (${weightUnit || "unit"})`}
                placeholder="Enter weight"
                keyboardType="numeric"
                ref={(el) => {
                  inputRefs.current.weight = el;
                }}
                onLayoutY={(y) => {
                  inputPositions.current.weight = y;
                }}
                disabled={formDisabled}
              />
            </View>
            <View style={styles.colUnit}>
              <FormDropdown
                ref={(el) => {
                  inputRefs.current.weightUnit = el;
                }}
                name="weightUnit"
                label="Weight Unit"
                options={Object.keys(WEIGHT_METRIC).map((key) => ({
                  label:
                    weightMetricViewConnector[
                      key as keyof typeof weightMetricViewConnector
                    ] || String(key),
                  value: key
                }))}
                onLayoutY={(y) => {
                  inputPositions.current.weightUnit = y;
                }}
                disabled={formDisabled}
              />
            </View>
          </View>

          <FormInput
            name="insuredValue"
            label="Insured Value (USD)"
            placeholder="Enter insured value"
            keyboardType="numeric"
            ref={(el) => {
              inputRefs.current.insuredValue = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.insuredValue = y;
            }}
            disabled={formDisabled}
          />

          {/* Routing */}
          <FormInput
            name="fromWhere"
            label="From Where"
            placeholder="Enter departure location"
            ref={(el) => {
              inputRefs.current.fromWhere = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.fromWhere = y;
            }}
            disabled={formDisabled}
          />
          <FormInput
            name="toWhere"
            label="To Where"
            placeholder="Enter destination location"
            ref={(el) => {
              inputRefs.current.toWhere = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.toWhere = y;
            }}
            disabled={formDisabled}
          />
          <FormInput
            name="when"
            label="When"
            placeholder="Enter preferred transport date"
            ref={(el) => {
              inputRefs.current.when = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.when = y;
            }}
            disabled={formDisabled}
          />

          {/* Notes */}
          <FormInput
            name="notes"
            label="Notes"
            placeholder="Additional details"
            multiline
            numberOfLines={4}
            ref={(el) => {
              inputRefs.current.notes = el;
            }}
            onLayoutY={(y) => {
              inputPositions.current.notes = y;
            }}
            disabled={formDisabled}
          />

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
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Snackbar */}
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
          duration={3000}
          style={{
            backgroundColor: snackbar.color,
            height: 50,
            marginBottom: 80
          }}
        >
          {snackbar.message}
        </Snackbar>
      </ScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#fff",
    paddingBottom: 100
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
      paddingTop: 20,
      textAlign: "center"
    }
  }),
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  col: {
    flex: 1
  },
  colUnit: {
    width: 160,
    marginLeft: 12
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
    default: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16
    },
    android: {
      color: "#fff",
      fontWeight: "500",
      fontSize: 12
    }
  }),
  spinnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16
  }
});
