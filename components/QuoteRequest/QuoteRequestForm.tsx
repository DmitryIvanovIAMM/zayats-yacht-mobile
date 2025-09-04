import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

interface QuoteFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  yachtName?: string;
  yachtModel?: string;
  insuredValue: string;
  length: string;
  lengthUnit: string;
  beam: string;
  beamUnit: string;
  weight: string;
  weightUnit: string;
  purpose?: string;
  fromWhere?: string;
  toWhere?: string;
  when?: string;
  notes?: string;
}

export default function QuoteForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>();
  const [lengthUnit, setLengthUnit] = useState("meters");
  const [beamUnit, setBeamUnit] = useState("meters");
  const [weightUnit, setWeightUnit] = useState("kg");

  React.useEffect(() => {
    register("firstName", { required: "First name is required" });
    register("lastName", { required: "Last name is required" });
    register("phone", { required: "Phone is required" });
    register("email", { required: "Email is required" });
    register("insuredValue", { required: "Insured value is required" });
    register("length");
    register("beam");
    register("weight");
    register("yachtName");
    register("yachtModel");
    register("purpose");
    register("fromWhere");
    register("toWhere");
    register("when");
    register("notes");
  }, [register]);

  const onSubmit = (data: QuoteFormData) => {
    console.log("Form submitted:", data);
    // Тут можешь сделать fetch/post на API
  };

  const formDisabled = isSubmitting;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get Quote</Text>

      {/** Имя и Фамилия */}
      <View style={styles.inputGroup}>
        <TextInput
          label="First Name *"
          mode="outlined"
          onChangeText={(text) =>
            setValue("firstName", text, { shouldValidate: true })
          }
          editable={!formDisabled}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Last Name *"
          mode="outlined"
          onChangeText={(text) =>
            setValue("lastName", text, { shouldValidate: true })
          }
          editable={!formDisabled}
        />
        {errors.lastName && (
          <Text style={styles.error}>{errors.lastName.message}</Text>
        )}
      </View>

      {/** Телефон и Email */}
      <View style={styles.inputGroup}>
        <TextInput
          label="Phone *"
          mode="outlined"
          keyboardType="phone-pad"
          onChangeText={(text) =>
            setValue("phone", text, { shouldValidate: true })
          }
          editable={!formDisabled}
        />
        {errors.phone && (
          <Text style={styles.error}>{errors.phone.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Email *"
          mode="outlined"
          keyboardType="email-address"
          onChangeText={(text) =>
            setValue("email", text, { shouldValidate: true })
          }
          editable={!formDisabled}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      {/** Яхта */}
      <View style={styles.inputGroup}>
        <TextInput
          label="Yacht Name"
          mode="outlined"
          onChangeText={(text) => setValue("yachtName", text)}
          editable={!formDisabled}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Yacht Model"
          mode="outlined"
          onChangeText={(text) => setValue("yachtModel", text)}
          editable={!formDisabled}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Insured Value in USD *"
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) =>
            setValue("insuredValue", text, { shouldValidate: true })
          }
          editable={!formDisabled}
        />
        {errors.insuredValue && (
          <Text style={styles.error}>{errors.insuredValue.message}</Text>
        )}
      </View>

      {/** Длина, ширина, вес */}
      <View style={styles.inputGroup}>
        <TextInput
          label={`Length (${lengthUnit})`}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => setValue("length", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label={`Beam (${beamUnit})`}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => setValue("beam", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label={`Weight (${weightUnit})`}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => setValue("weight", text)}
        />
      </View>

      {/** Дополнительно */}
      <View style={styles.inputGroup}>
        <TextInput
          label="Purpose of Transport"
          mode="outlined"
          onChangeText={(text) => setValue("purpose", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="From Where"
          mode="outlined"
          onChangeText={(text) => setValue("fromWhere", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="To Where"
          mode="outlined"
          onChangeText={(text) => setValue("toWhere", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="When"
          mode="outlined"
          onChangeText={(text) => setValue("when", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Notes"
          mode="outlined"
          multiline
          onChangeText={(text) => setValue("notes", text)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={formDisabled}
      >
        {formDisabled && (
          <ActivityIndicator color="white" style={{ marginRight: 10 }} />
        )}
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#339966",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

// import { secondary } from "@/constants/Colors";
// import { ActionResult } from "@/helpers/API/apiTypes";
// import { useFocusEffect } from "@react-navigation/native";
// import { useCallback, useState } from "react";
// import { ScrollView, StyleSheet, Text } from "react-native";
// import { postQuoteRequest } from "./postQuoteRequest";
// import { defaultNonEmptyQuoteRequest } from "./quoteRequestTypes";

// export default function GetQuoteForm() {
//   const [requestResult, setQuoteRequest] = useState<ActionResult | null>(null);

//   useFocusEffect(
//     useCallback(() => {
//       const postQuote = async () => {
//         const requestResultData = await postQuoteRequest(
//           defaultNonEmptyQuoteRequest,
//           "/quote-request"
//         );
//         setQuoteRequest(requestResultData);
//         console.log("Quote request result: ", requestResultData);
//       };

//       postQuote();
//     }, []) // Empty dependency array ensures it runs only on focus/unfocus
//   );

//   return (
//     <ScrollView style={styles.scheduleContainer}>
//       <Text>{JSON.stringify(requestResult)}</Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   spinnerContainer: {
//     color: secondary.dark,
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 40,
//     fontSize: 16,
//   },
//   scheduleContainer: {
//     padding: 20,
//   },
// });
