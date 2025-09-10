import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { secondary } from "@/constants/Colors";
import { SECTIONS } from "@/helpers/paths";
import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

export default function AboutUs({
  ref,
}: {
  ref: React.RefObject<ScrollView | null>;
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      id={SECTIONS.aboutUs}
      ref={ref}
    >
      <SectionTitle>About Us</SectionTitle>
      <Text style={styles.header}>Zayats Yacht Transport</Text>
      <Text style={styles.body}>
        Welcome to Zayats Yacht Transport, your trusted partner in global yacht
        logistics and transportation services. At Zayats Yacht Transport, we
        specialize in providing safe, reliable, and efficient transport
        solutions for yachts of all sizes. Our mission is to deliver
        unparalleled service that ensures your vessel reaches its destination
        securely and on schedule.
      </Text>
      <Text style={styles.header}>Our Heritage</Text>
      <Text style={styles.body}>
        Founded on a passion for the sea and a deep understanding of the
        complexities involved in yacht transportation, Zayats Yacht Transport
        has grown to become a leading name in the industry. Under the leadership
        of Vadim Yegudkin, our president who has been a prominent figure in the
        yacht transport field for over 14 years, our team combines expertise
        with personal service to manage every aspect of your yacht&#39;s
        journey. From the bustling ports of North America to the serene waters
        of the Mediterranean, we cover all major routes across the globe.
      </Text>
      <Text style={styles.header}>Our Services</Text>
      <Text style={styles.body}>
        Zayats Yacht Transport offers a comprehensive range of services tailored
        to meet the unique needs of each client. Our services include.{"\n"}
        <Text style={styles.emphasizedTextStyle}>
          • International Yacht Shipping:
        </Text>
        &nbsp;&nbsp;We handle all logistics, from inland transportation to
        international shipping, ensuring your yacht is transported safely across
        oceans.{"\n"}
        <Text style={styles.emphasizedTextStyle}>• Customs Clearance:</Text>
        &nbsp;&nbsp;Our team takes care of all necessary customs documentation
        and clearance procedures, making international transfers as smooth as
        possible.{"\n"}
        <Text style={styles.emphasizedTextStyle}>
          • Cradling and Shrink Wrapping:
        </Text>
        &nbsp;&nbsp;To guarantee the utmost safety during transport, we provide
        custom cradling and professional shrink wrapping.{"\n"}
        <Text style={styles.emphasizedTextStyle}>
          • Load Master Supervision:
        </Text>
        &nbsp;&nbsp;Our experienced load masters oversee every step of the
        loading and unloading process, ensuring that each yacht is handled with
        care.{"\n"}
        <Text style={styles.emphasizedTextStyle}>• Insurance:</Text>
        &nbsp;&nbsp;We offer comprehensive marine insurance for peace of mind
        throughout the transport process.
      </Text>
      <Text style={styles.header}>Our Commitment</Text>
      <Text style={styles.body}>
        At Zayats Yacht Transport, we are committed to excellence. Our dedicated
        team works closely with each client, providing personalized service and
        attention to detail that ensures every transport is executed flawlessly.
        We use the latest technology and equipment to monitor each shipment,
        giving our clients peace of mind knowing their valuable assets are in
        safe hands.
      </Text>
      <Text style={styles.header}>Join Us</Text>
      <Text style={styles.body}>
        Whether you&#39;re relocating, attending international regattas, or
        exploring new waters, Zayats Yacht Transport is here to make your yacht
        transportation experience seamless and stress-free. Connect with us
        today to learn more about how we can assist with your yacht transport
        needs. Together, let&#39;s set the course for your next maritime
        adventure.
      </Text>
      <Text style={styles.header}>
        Explore. Transport. Discover. With Zayats Yacht Transport.
      </Text>
      <Image
        style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
          marginBottom: 40,
        }}
        source={require("@/assets/images/aboutus.jpeg")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 16,
    color: secondary.dark,
  },
  body: {
    fontSize: 18,
    color: secondary.dark,
    lineHeight: 28,
    marginBottom: 20,
  },
  emphasizedTextStyle: {
    fontWeight: "bold",
    color: secondary.dark,
  },
});
