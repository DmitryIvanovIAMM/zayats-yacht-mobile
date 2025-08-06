import { secondary } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function GetQuoteForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get a Quote</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: secondary.dark,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: secondary.dark,
  },
});
