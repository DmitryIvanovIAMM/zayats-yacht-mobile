import GetQuoteForm from "@/components/GetQuote/GetQuoteForm";
import { useAuth } from "@/cotnexts/AuthContext";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function GetQuotePage() {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <GetQuoteForm />
    </View>
  );
}
