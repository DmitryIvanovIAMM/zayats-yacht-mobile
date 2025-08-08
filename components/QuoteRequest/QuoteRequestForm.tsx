import { secondary } from "@/constants/Colors";
import { ActionResult } from "@/helpers/API/apiTypes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { postQuoteRequest } from "./postQuoteRequest";
import { defaultNonEmptyQuoteRequest } from "./quoteRequestTypes";

export default function GetQuoteForm() {
  const [requestResult, setQuoteRequest] = useState<ActionResult | null>(null);

  useFocusEffect(
    useCallback(() => {
      const postQuote = async () => {
        const requestResultData = await postQuoteRequest(
          defaultNonEmptyQuoteRequest,
          "/quote-request"
        );
        setQuoteRequest(requestResultData);
        console.log("Quote request result: ", requestResultData);
      };

      postQuote();
    }, []) // Empty dependency array ensures it runs only on focus/unfocus
  );

  return (
    <ScrollView style={styles.scheduleContainer}>
      <Text>{JSON.stringify(requestResult)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    color: secondary.dark,
    justifyContent: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  scheduleContainer: {
    padding: 20,
  },
});
