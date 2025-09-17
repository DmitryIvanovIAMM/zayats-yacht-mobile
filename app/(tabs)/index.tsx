import ContactUs from "@/components/ContactUs/ContactUs";
import ScheduleSection from "@/components/ScheduleSection/ScheduleSection";
import { useSailings } from "@/components/ScheduleSection/useSchedule";
import { secondary } from "@/constants/Colors";
import { SECTIONS } from "@/helpers/paths";
import AboutUs from "@/Sections/Pages/AboutUs/AboutUs";
import Testimonials from "@/Sections/Pages/Testimonials/Testimonials";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
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
  // Safely cast params to your type
  const { section } = (route?.params as HomeScreenRouteParams) || {
    section: undefined
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

  // Keep your scroll view ref strongly typed
  const scrollViewRef = React.useRef<ScrollView | null>(null);

  // Example section refs (use your actual ones)
  const aboutUsRef = React.useRef<ScrollView | null>(null);
  const contactUsRef = React.useRef<ScrollView | null>(null);
  const scheduleRef = React.useRef<ScrollView | null>(null);
  const testimonialsRef = React.useRef<ScrollView | null>(null);

  const [readyToScroll, setReadyToScroll] = useState(false);

  const scrollToSectionIfAny = (section: string | undefined) => {
    if (!section) return;

    switch (section) {
      case SECTIONS.aboutUs:
        // scrollToSectionRef(aboutUsRef);
        scrollToSection(aboutUsRef);
        break;
      case SECTIONS.schedule:
        // scrollToSectionRef(scheduleRef);
        scrollToSection(scheduleRef);
        break;
      case SECTIONS.testimonials:
        // scrollToSectionRef(testimonialsRef);
        scrollToSection(testimonialsRef);
        break;
      case SECTIONS.contactUs:
        // scrollToSectionRef(contactUsRef);
        scrollToSection(contactUsRef);
        break;
      default:
        break;
    }

    // trick is here - do not forget to reset the section to be scrolled id
    setSectionToScroll(undefined);
  };

  const getNearestSailingsCallback = useCallback(() => {
    const getNearestCall = async () => {
      setReadyToScroll(false);
      await getNearestSailings();
      setReadyToScroll(true);
    };
    getNearestCall();
  }, [getNearestSailings]);

  useEffect(getNearestSailingsCallback, [getNearestSailingsCallback]);

  useEffect(() => {
    if (readyToScroll) {
      scrollToSectionIfAny(sectionToScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToScroll, sectionToScroll]);

  // Helper: scroll to a section without calling measureLayout on ScrollView
  function scrollToSection(sectionRef: React.RefObject<ScrollView | null>) {
    const scroll = scrollViewRef.current;
    const node = sectionRef.current;
    if (!scroll || !node) return;

    const scrollHandle = findNodeHandle(scroll);
    const nodeHandle = findNodeHandle(node);
    if (!scrollHandle || !nodeHandle) return;

    UIManager.measureLayout(
      nodeHandle,
      scrollHandle,
      () => {
        // ignore measure errors
      },
      (x: number, y: number, width: number, height: number) => {
        const s = scrollViewRef.current;
        if (!s) return; // guard against null
        s.scrollTo({ x: 0, y, animated: true });
      }
    );
  }

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
      marginBottom: 80
    },
    android: {
      backgroundColor: "#fff",
      color: secondary.dark,
      display: "flex",
      flexDirection: "column",
      flex: 1
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
