import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { primary, secondary } from "@/constants/Colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const testimonials = [
  {
    quote:
      "Thank you for the fine work you did on the Beneteau swift trawler that we had you send down from Victoria to Ensenada. The owners are really happy with their new boat! We have more opportunities in the pipeline and we will definitely be contacting you again so that we may use your services.",
    author: "Walter Johnson",
    position: "President",
    company: "ENGEL & VÖLKERS YACHTING",
  },
  {
    quote:
      "I would like to express my sincere gratitude for the ship visit last week. Justin really gave me a great tour! Very happy to be a customer and to be able to support Allied Yacht Transport. You are running a really good business! Thanks again for the amazing customer service!!",
    author: "Richard",
    company: "Vessel: Adventurer",
  },
  {
    quote:
      "Thanks are in order for Allied Yacht Transport and Vadim who, thanks to their commitment to service, helped our team to ensure we made the trip to the transport boat on time for departure. Awesome support.",
    author: "Mike Karty",
  },
  {
    quote:
      "Vadim Yegudkin, thank you for all your hard work on our transportation needs. I definitely will be recommending your services and you will be the person we contact if she need to ship return back home.",
    author: "Nic Arnsby",
  },
] as const;

const styles = StyleSheet.create({
  testimonialContainer: {
    backgroundColor: "#fff",
    borderRadius: 2,
    padding: 12,
    marginVertical: 12,
    marginHorizontal: 0,
    color: secondary.dark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    color: secondary.dark,
    marginBottom: 16,
    lineHeight: 26,
    borderLeftWidth: 4,
    borderLeftColor: primary.main,
    paddingLeft: 12,
  },
  author: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 14,
    color: secondary.dark,
  },
  company: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 14,
    color: secondary.dark,
  },
  authorRow: {
    lineHeight: 16,
    flexDirection: "column",
    color: secondary.dark,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  scroll: {
    flex: 1,
  },
});

export default function Testimonials() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <SectionTitle>Testimonials</SectionTitle>
      {testimonials.map((testimonial, index) => (
        <View style={styles.testimonialContainer} key={index}>
          <Text style={styles.quote}>"{testimonial.quote}"</Text>
          <View style={styles.authorRow}>
            <Text style={styles.author}>{testimonial.author}</Text>
            {testimonial?.position && (
              <Text style={styles.author}>
                {"\n"}
                {testimonial?.position}
              </Text>
            )}
            {testimonial?.company && (
              <Text style={styles.company}>
                {"\n"}
                {testimonial?.company}
              </Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
