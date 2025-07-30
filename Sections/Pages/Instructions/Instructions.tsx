import { Collapsible } from "@/components/Collapsible";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { ThemedText } from "@/components/ThemedText";
import { secondary } from "@/constants/Colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Instructions() {
  return (
    <ScrollView style={styles.scroll}>
      <SectionTitle>Yacht Transport Instructions</SectionTitle>
      <View style={styles.container}>
        <Text style={styles.intro}>
          <Text style={styles.bold}>Allied Yacht Transport</Text> is pleased to
          provide our customers with the following instructions and information
          to ensure a successful transit facilitated by properly preparing
          vessels and their representatives to work with our experienced,
          professional team in support of safely loading, stowing, and
          transporting vessels aboard our ships.
        </Text>
        <Collapsible title="INSURANCE">
          <ThemedText style={styles.description}>
            <ThemedText style={styles.bold}>Allied Yacht Transport</ThemedText>{" "}
            maintains marine cargo insurance coverages. In addition, owners of
            all vessels to be transported should maintain insurance coverage to
            cover their vessel before and after the shipment.
          </ThemedText>
        </Collapsible>
        <Collapsible title="DOCUMENTATION, PASSPORTS & VISAS">
          <ThemedText style={styles.description}>
            <ThemedText style={styles.bold}>Allied Yacht Transport</ThemedText>{" "}
            will facilitate the timely customs filings, port passes, and other
            formalities required by law on your behalf at arrival ports for
            vessels and riders. The customs agency at the arrival port will
            arrange all necessary clearances.
            {"\n"}
            {"\n"}
            <ThemedText style={styles.bold}>
              Allied Yacht Transport
            </ThemedText>{" "}
            will request documentation associated with the vessel to be
            transported. Customs procedures are to be strictly adhered to for
            each country of origin and destination.
            {"\n"}
            {"\n"}
            Customs paperwork must be timely filed with the authorized Allied
            Yacht Transport representative upon request. Without proper
            clearances in place, vessels will not be able to load or unload,
            resulting in significant fines from the country of origin,
            demurrage, or potential arrest of the vessel by authorities.
            {"\n"}
            {"\n"}
            Citizens of countries other than the United States aboard an Allied
            Yacht Transport ship as a rider arriving in or passing through the
            United States are required to hold a valid B1/B2 Visa. Without a
            B1/B2 Visa, riders will not be allowed on an Allied Yacht Transport
            ship.
            {"\n"}
            {"\n"}
            Copies of valid Visas and current passports will be requested by an
            Allied Yacht Transport representative prior to approval.
            {"\n"}
            {"\n"}
            Upon loading, the original will be securely held by the Master on
            board Allied Yacht Transport for the duration of the voyage.
          </ThemedText>
        </Collapsible>
        <Collapsible title="PRIOR TO TRANSPORT, SECURE THE VESSEL">
          <ThemedText style={styles.description}>
            Any loose items on the vessel should be removed or properly stowed
            aboard the vessel prior to loading on an Allied Yacht Transport
            ship.
            {"\n"}
            {"\n"}
            All hatches should be closed and locked.
            {"\n"}
            {"\n"}
            Personal items and prohibited items should be removed and breakables
            should be stored.
          </ThemedText>
        </Collapsible>
        <Collapsible title="VESSEL SPECIFICATIONS FOR CRIBBING">
          <ThemedText style={styles.description}>
            For a vessel to be safely secured and stowed on an Allied Yacht
            Transport ship, all measurements provided must include any
            protrusions including but not limited to outriggers, bowsprits,
            transducers, etc.
          </ThemedText>
        </Collapsible>
        <Collapsible title="PRE-VOYAGE DAMAGE DOCUMENTATION">
          <ThemedText style={styles.description}>
            Prior to loading, vessel should be inspected for damage and pictures
            should be taken to document any pre-existing problems.
          </ThemedText>
        </Collapsible>
        <Collapsible title="SHRINK WRAP FOR EXTRA PROTECTION">
          <ThemedText style={styles.description}>
            Shrink wrapping the vessel is an option to protect the vessel from
            exposure to the elements during transport. Covering stainless steel
            and chrome fittings or the application of an insulator wax can also
            provide additional protection.
          </ThemedText>
        </Collapsible>
        <Collapsible title="WEIGHT">
          <ThemedText style={styles.description}>
            Weight of the vessel can sometimes require that quantities of fuel
            and water onboard the vessel be reduced as much as possible while
            maintaining enough onboard for getting to and from an Allied Yacht
            Transport ship.
            {"\n"}
            {"\n"}
            If the vessel to be loaded is of a significant weight, Allied Yacht
            Transport representatives will provide additional guidance.
            {"\n"}
            {"\n"}
            Flammable liquids such as fuel stowed in containers will not be
            allowed. Bilges should be empty and bilge pumps should be switched
            off. Sewage tanks should be empty and switched off.
          </ThemedText>
        </Collapsible>
        <Collapsible title="VESSEL POWER AND WATER DURING TRANSPORT">
          <ThemedText style={styles.description}>
            Prior to loading, everything on the vessel should be powered down
            with batteries unplugged and cables stored. If reserved in advance,
            50 amp connections are available upon request for an additional
            charge and will be included in the shipping contract prior to
            execution.
            {"\n"}
            {"\n"}
            Plug-in connections and specifications will be provided. If
            arrangements have been made in advance, Allied Yacht Transport can
            also provide water connections. Standard 2“ water connections
            are available on board and vessels are responsible for supplying
            their own hoses with multiple hoses sometimes required.
          </ThemedText>
        </Collapsible>
        <Collapsible title="FOR SAILING VESSELS">
          <ThemedText style={styles.description}>
            Sails should be removed or protected by covers prior to transport.
            All sailing vessels must meet height requirements.
          </ThemedText>
        </Collapsible>
        <Collapsible title="STRICTLY PROHIBITED AND SUBJECT TO HEAVY FINES OR ARREST">
          <ThemedText style={styles.description}>
            While Allied Yacht Transport representatives will never board a
            vessel, the following are strictly prohibited to be aboard a vessel
            during transport on an Allied Yacht Transport ship:
            {"\n"}
            1. Firearms
            {"\n"}
            2. Ammunitions
            {"\n"}
            3. Illegal drugs
            {"\n"}
            4. Perishable food
            {"\n"}
            5. Plants
          </ThemedText>
        </Collapsible>
        <Collapsible title="POLLUTION">
          <ThemedText style={styles.description}>
            All garbage and waste products including but not limited to oil or
            oil residues, garbage, plastics, and paint residues should be
            discarded prior to arrival to an Allied Yacht Transport ship for
            loading.
            {"\n"}
            {"\n"}
            Removal of waste from a vessel to the deck of an Allied Yacht
            Transport ship is strictly prohibited.
          </ThemedText>
        </Collapsible>
        <Collapsible title="GENERAL">
          <ThemedText style={styles.description}>
            <Text style={styles.bold}>Allied Yacht Transport</Text> cannot
            accept deliveries for any vessel.
            {"\n"}
            {"\n"}
            When an Allied Yacht Transport ship is anchored offshore, limited
            launch service will be provided.
            {"\n"}
            {"\n"}
            Launch departure locations and times will be provided by authorized
            Allied Yacht Transport representatives.
            {"\n"}
            {"\n"}
            Customers should limit items carried. Customers should be prepared
            to utilize a rope ladder. Two (2) persons are recommended to be on
            board the vessel during loading and un­loading operations.
          </ThemedText>
        </Collapsible>
        <Collapsible title="PREPARATION FOR LOADING">
          <ThemedText style={styles.description}>
            Vessels should be equipped with: Four (4) 50 feet of lines with two
            (2) on each side, forward and aft. Four (4) fenders with two (2) on
            each side of vessel, forward and aft. A two+ (2) person crew.
          </ThemedText>
        </Collapsible>
        <Collapsible title="VESSEL DELIVERY PROCESS">
          <ThemedText style={styles.description}>
            {"\u2022"} Radio check on VHF Channel 17 with the Allied Yacht
            Transport load master and await instruction.
            {"\n"}
            {"\n"}
            {"\u2022"} Berthing alongside an Allied Yacht Transport ship is not
            permitted without prior authorization from the Allied Yacht Transport
            load master.
            {"\n"}
            {"\n"}
            {"\u2022"} Upon reaching the Allied Yacht Transport ship, ensure
            fenders and lines are set and maintained at correct locations and
            heights.
            {"\n"}
            {"\n"}
            {"\u2022"} Pay close attention to instructions from crew and
            the Allied Yacht Transport load master and be prepared for line
            handling.
            {"\n"}
            {"\n"}
            {"\u2022"} Regulations in most ports strictly prohibit vessel
            representatives from boarding an Allied Yacht Transport ship.
            {"\n"}
            {"\n"}
            {"\u2022"} Stay on board your vessel until the vessel is properly
            secured to the Allied Yacht Transport ship.
            {"\n"}
            {"\n"}
            {"\u2022"} Switch off generators/main engines as soon as vessel is
            positioned and before divers are in the water. Ensure all vessel
            equipment and loose items are properly sea-fastened.
            {"\n"}
            {"\n"}
            {"\u2022"} Unless instructed otherwise, board the tender provided
            by Allied Yacht Transport and proceed to the designated marina for
            ground transportation.
            {"\n"}
            {"\n"}
            {"\u2022"} All riders aboard an Allied Yacht Transport ship must be
            on board one hour before scheduled departure.
            {"\n"}
            {"\n"}
            {"\u2022"} If permitted, all visitors must leave the Allied Yacht
            Transport ship at least one hour before scheduled departure
          </ThemedText>
        </Collapsible>
        <Collapsible title="ARRIVAL AT PORT OF DISCHARGE">
          <ThemedText style={styles.description}>
            Arrive at designated departure dock to board Allied Yacht Transport
            provided tender to be transported to the ship.
            {"\n"}
            {"\n"}
            Upon arrival by tender to the Allied Yacht Transport ship, pay close
            attention to Allied Yacht Transport crew instructions.
          </ThemedText>
        </Collapsible>
        <Collapsible title="TIPS FOR VESSEL TRANSPORT RIDERS">
          <ThemedText style={styles.description}>
            <Text style={styles.bold}>Allied Yacht Transport</Text> riders must
            attend the orientation meeting on board the vessel prior to
            departure in order to familiarize themselves with safety protocols,
            procedures and ask any further questions of Allied Yacht Transport
            representatives and ship's crew before departure from port.
            {"\n"}
            {"\n"}
            Riders must be physically capable of boarding an Allied Yacht
            Transport ship from a tender and climb a rope ladder.
            {"\n"}
            {"\n"}
            After receiving instructions from an Allied Yacht Transport
            representatives or ship&lsquo;s crew member, riders can proceed to
            climb the ladder and board the ship.
            {"\n"}
            {"\n"}
            <Text style={styles.bold}>Allied Yacht Transport</Text> does not
            accept any liability whatsoever for accidents associated with
            ladders utilized to board our ships.
          </ThemedText>
        </Collapsible>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 40, // Ensure the scroll view has some margin at the bottom
  },
  container: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 100,
  },
  intro: {
    color: secondary.dark,
    fontSize: 18,
    marginBottom: 16,
  },
  bold: {
    fontWeight: "bold",
    color: secondary.dark,
  },
  description: {
    color: secondary.dark,
    backgroundColor: "white",
    fontSize: 16,
    marginBottom: 16,
  },
});
