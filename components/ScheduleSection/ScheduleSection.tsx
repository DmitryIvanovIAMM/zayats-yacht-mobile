import { secondary } from "@/constants/Colors";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SailingCard } from "./SailingCard";
import { SailingsState } from "./useSchedule";

interface ScheduleSectionProps {
  scheduleState: SailingsState;
}

const ScheduleSection = ({ scheduleState }: ScheduleSectionProps) => {
  return scheduleState.isLoading ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color={secondary.dark} />
    </View>
  ) : scheduleState.error ? (
    <Text style={styles.errorText}>{scheduleState.error}</Text>
  ) : (
    <FlatList
      data={scheduleState.schedule}
      renderItem={({ item }) => <SailingCard route={item} />}
      nestedScrollEnabled={true}
      scrollEnabled={false}
    />
  );
};

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

export default ScheduleSection;
