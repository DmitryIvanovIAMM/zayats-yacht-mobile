import { secondary } from "@/constants/Colors";
import { SECTIONS } from "@/helpers/paths";
import {
  ActivityIndicator,
  FlatList,
  Platform,
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

function ScheduleSectionDetails({
  scheduleState
}: {
  scheduleState: SailingsState;
}) {
  const scheduleList = Array.isArray(scheduleState.schedule)
    ? scheduleState.schedule
    : [];

  return (
    <>
      {scheduleState.isLoading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={secondary.dark} />
        </View>
      ) : scheduleState.error ? (
        <Text style={styles.errorText}>{scheduleState.error}</Text>
      ) : scheduleList.length === 0 ? (
        <Text style={styles.errorText}>No sailings found</Text>
      ) : (
        <FlatList
          data={scheduleList}
          renderItem={({ item }) => <SailingCard route={item} />}
          keyExtractor={(_, idx) => idx.toString()}
          nestedScrollEnabled={true}
          scrollEnabled={false}
        />
      )}
    </>
  );
}

const ScheduleSection = ({ scheduleState, ref }: ScheduleSectionProps) => {
  if ((Platform.OS as string) === "web") {
    // For web, use a div for DOM-based scrolling
    return (
      <div ref={ref as any} id={SECTIONS.schedule} style={{ width: "100%" }}>
        <ScheduleSectionDetails scheduleState={scheduleState} />
      </div>
    );
  }
  // Native platforms
  return (
    <ScrollView id={SECTIONS.schedule} ref={ref}>
      <ScheduleSectionDetails scheduleState={scheduleState} />
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
    display: "flex",
    justifyContent: "center",
    color: "red",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
    fontSize: 18
  },
  scheduleContainer: {
    padding: 0
  }
});

export default ScheduleSection;
