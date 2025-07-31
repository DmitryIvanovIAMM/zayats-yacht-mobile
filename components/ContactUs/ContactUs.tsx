import { secondary } from "@/constants/Colors";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionTitle from "../SectionTitle/SectionTitle";
import { ThemedText } from "../ThemedText";

const PHONE_NUMBER = "+13051234567";

const ContactUs = () => {
  const handleEmailPress = () => {
    Linking.openURL("mailto:info@zayats-yacht.com");
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${PHONE_NUMBER}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.title}>
          <SectionTitle>Contact Us</SectionTitle>
        </View>
        <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <MaterialIcons
              name="location-on"
              size={32}
              color={secondary.dark}
            />
          </View>
          <Text style={styles.text}>
            <ThemedText style={styles.bold}>Address</ThemedText>
            {"\n"}
            Allied Yacht Transport, LLC
            {"\n"}
            12555 Orange Drive, Suite 107
            {"\n"}Fort Lauderdale, FL, 33330, USA
          </Text>
        </View>
        <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="email" size={32} color={secondary.dark} />
          </View>
          <Text style={styles.text}>
            <ThemedText style={styles.bold}>Email</ThemedText>
            {"\n"}
            <TouchableOpacity
              onPress={handleEmailPress}
              accessibilityRole="button"
              accessibilityLabel="Send email to info@zayats-yacht.com"
            >
              <Text style={[styles.link]}>info@zayats-yacht.com</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="phone" size={32} color={secondary.dark} />
          </View>
          <Text style={styles.text}>
            <ThemedText style={styles.bold}>Phone</ThemedText>
            {"\n"}
            <TouchableOpacity
              onPress={handlePhonePress}
              accessibilityRole="button"
              accessibilityLabel="Call phone number +1 (305) 123-4567"
            >
              <Text style={styles.link}>{formatPhoneNumber(PHONE_NUMBER)}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F8F9",
    flexDirection: "column",
    marginBottom: 50,
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#F7F8F9",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    margin: 10,
    boxShadow: "0px 2px 20px rgba(51, 101, 167, 0.18)",
  },
  text: {
    fontSize: 16,
    color: secondary.dark,
    marginLeft: 12,
  },
  bold: {
    fontWeight: "bold",
    color: secondary.dark,
  },
  link: {
    textDecorationLine: "none",
    color: secondary.dark,
  },
});

export default ContactUs;
