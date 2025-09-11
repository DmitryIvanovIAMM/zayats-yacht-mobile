import { secondary } from "@/constants/Colors";
import { SECTIONS } from "@/helpers/paths";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SailingCard } from "./SailingCard";
import { SailingsState } from "./useSchedule";

interface ScheduleSectionProps {
  scheduleState: SailingsState;
  ref?: React.RefObject<ScrollView | null>;
}

const ScheduleSection = ({ scheduleState, ref }: ScheduleSectionProps) => {
  return (
    <ScrollView id={SECTIONS.schedule} ref={ref}>
      {scheduleState.isLoading ? (
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
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    color: secondary.dark,
    justifyContent: "center",
    marginTop: 20,
    minHeight: 400
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16
  },
  scheduleContainer: {
    padding: 20
  }
});

export default ScheduleSection;
