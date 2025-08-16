import ContactUs from "@/components/ContactUs/ContactUs";
import ScheduleSection from "@/components/ScheduleSection/ScheduleSection";
import { useSailings } from "@/components/ScheduleSection/useSchedule";
import { secondary } from "@/constants/Colors";
import { SECTIONS } from "@/helpers/paths";
import AboutUs from "@/Sections/Pages/AboutUs/AboutUs";
import Testimonials from "@/Sections/Pages/Testimonials/Testimonials";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Define the expected params type
type HomeScreenRouteParams = {
  section?: string;
};

export default function HomeScreen() {
  const route = useRoute();
  // Safely cast params to your type
  const { section } = (route?.params as HomeScreenRouteParams) || {
    section: undefined,
  };
  const { scheduleState, getNearestSailings } = useSailings();
  const [sectionToScroll, setSectionToScroll] = useState<string | undefined>(
    section
  );
  if (section) {
    setSectionToScroll(section);
    if (
      route &&
      route.params &&
      typeof route.params === "object" &&
      "section" in route.params
    ) {
      delete (route.params as HomeScreenRouteParams).section;
    }
  useEffect(() => {
    if (section) {
      setSectionToScroll(section);
      if (
        route &&
        route.params &&
        typeof route.params === "object" &&
        "section" in route.params
      ) {
        delete (route.params as HomeScreenRouteParams).section;
      }
    }
  }, [section, route]);

  const scrollViewRef = useRef(null);
  const aboutUsRef = useRef<ScrollView>(null);
  const testimonialsRef = useRef<ScrollView>(null);
  const scheduleRef = useRef<ScrollView>(null);
  const contactUsRef = useRef<ScrollView>(null);

  const [readyToScroll, setReadyToScroll] = useState(false);

  const scrollToSectionIfAny = (section: string | undefined) => {
    if (!section) return;

    const scrollToSectionRef = (
      sectionRef: React.RefObject<ScrollView | null>
    ) => {
      if (!sectionRef || !sectionRef.current) {
        return;
      }

      sectionRef.current?.measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          scrollViewRef?.current.scrollTo({ y, animated: true });
        }
      );
    };

    switch (section) {
      case SECTIONS.aboutUs:
        scrollToSectionRef(aboutUsRef);
        break;
      case SECTIONS.schedule:
        scrollToSectionRef(scheduleRef);
        break;
      case SECTIONS.testimonials:
        scrollToSectionRef(testimonialsRef);
        break;
      case SECTIONS.contactUs:
        scrollToSectionRef(contactUsRef);
        break;
      default:
        break;
    }

    // trick is here - do not forget to reset the section to be scrolled id
    setSectionToScroll(undefined);
  };

  const getNearestSailingsCallback = useCallback(() => {
    const getNearestCalll = async () => {
      setReadyToScroll(false);
      await getNearestSailings();
      setReadyToScroll(true);
    };
    getNearestCalll();
  }, [getNearestSailings]);

  useEffect(getNearestSailingsCallback, []);

  useEffect(() => {
    if (readyToScroll) {
      scrollToSectionIfAny(sectionToScroll);
    }
  }, [readyToScroll, sectionToScroll]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={getNearestSailingsCallback}
        />
      }
      ref={scrollViewRef}
    >
      <View style={styles.container}>
        <ScheduleSection scheduleState={scheduleState} ref={scheduleRef} />
        <Testimonials ref={testimonialsRef} />
        <AboutUs ref={aboutUsRef} />
        <ContactUs ref={contactUsRef} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: Platform.select({
    default: {
      backgroundColor: "#fff",
      color: secondary.dark,
      display: "flex",
      flexDirection: "column",
      flex: 1,
      marginBottom: 80,
    },
    android: {
      backgroundColor: "#fff",
      color: secondary.dark,
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
  }),
});

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12'
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
