import ContactUs from "@/components/ContactUs/ContactUs";
import ScheduleSection from "@/components/ScheduleSection/ScheduleSection";
import { useSailings } from "@/components/ScheduleSection/useSchedule";
import { secondary } from "@/constants/Colors";
import { SECTIONS } from "@/helpers/paths";
import AboutUs from "@/Sections/Pages/AboutUs/AboutUs";
import Testimonials from "@/Sections/Pages/Testimonials/Testimonials";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  findNodeHandle,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  UIManager,
  View
} from "react-native";

// Define the expected params type
type HomeScreenRouteParams = {
  section?: string;
};

export default function HomeScreen() {
  const route = useRoute();
  const { section } = (route?.params as HomeScreenRouteParams) || {
    section: undefined
  };
  const { scheduleState, getNearestSailings } = useSailings();
  const [readyToScroll, setReadyToScroll] = useState(false);
  // Section refs (still needed for native)
  const scrollViewRef = useRef<ScrollView | null>(null);
  const aboutUsRef = useRef<ScrollView | null>(null);
  const contactUsRef = useRef<View | null>(null);
  const scheduleRef = useRef<ScrollView | null>(null);
  const testimonialsRef = useRef<ScrollView | null>(null);

  const getNearestSailingsCallback = useCallback(async () => {
    setReadyToScroll(false);
    await getNearestSailings();
    setReadyToScroll(true);
  }, [getNearestSailings]);

  useEffect(() => {
    getNearestSailingsCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      readyToScroll &&
      section &&
      scheduleState.schedule &&
      scheduleState.schedule.length > 0
    ) {
      scrollToSectionIfAny(section);
      if (
        route &&
        route.params &&
        typeof route.params === "object" &&
        "section" in route.params
      ) {
        delete (route.params as HomeScreenRouteParams).section;
      }
    }
  }, [readyToScroll, section, scheduleState.schedule, route]);

  function scrollToSectionIfAny(section: string | undefined) {
    if (!section) return;
    switch (section) {
      case SECTIONS.aboutUs:
      case SECTIONS.schedule:
      case SECTIONS.testimonials:
        if (Platform.OS === "web") {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
              top: rect.top + scrollTop - 20,
              behavior: "smooth"
            });
          }
        } else {
          if (section === SECTIONS.aboutUs) scrollToSection(aboutUsRef);
          if (section === SECTIONS.schedule) scrollToSection(scheduleRef);
          if (section === SECTIONS.testimonials)
            scrollToSection(testimonialsRef);
        }
        break;
      case SECTIONS.contactUs:
        if (Platform.OS === "web") {
          const el = document.getElementById("contact-us-section");
          if (el) {
            const rect = el.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
              top: rect.top + scrollTop - 20,
              behavior: "smooth"
            });
          }
        } else {
          scrollToSection(contactUsRef);
        }
        break;
      default:
        break;
    }
  }

  function scrollToSection(
    sectionRef: React.RefObject<View | ScrollView | null>
  ) {
    // Native platforms only
    const scroll = scrollViewRef.current;
    const node = sectionRef.current;
    if (!scroll || !node) return;

    const scrollHandle = findNodeHandle(scroll);
    const nodeHandle = findNodeHandle(node);
    if (!scrollHandle || !nodeHandle) return;

    UIManager.measureLayout(
      nodeHandle,
      scrollHandle,
      () => {},
      (x: number, y: number, width: number, height: number) => {
        const s = scrollViewRef.current;
        if (!s) return;
        s.scrollTo({ x: 0, y, animated: true });
      }
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
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
    web: {
      backgroundColor: "#fff",
      color: secondary.dark,
      display: "flex",
      flexDirection: "column",
      marginBottom: 0,
      maxWidth: 700,
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      padding: 12
    },
    default: {
      backgroundColor: "#fff",
      color: secondary.dark,
      display: "flex",
      flexDirection: "column",
      flex: 1,
      marginBottom: 80,
      padding: 0
    },
    android: {
      backgroundColor: "#fff",
      color: secondary.dark,
      display: "flex",
      flexDirection: "column",
      flex: 1,
      padding: 12
    }
  })
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
