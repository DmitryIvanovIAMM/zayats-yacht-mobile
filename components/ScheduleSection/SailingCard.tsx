import { primary, secondary } from "@/constants/Colors";
import { getInternationalDateFormat } from "@/helpers/dateTime";
import {
  calculateDaysInTransit,
  calculateMilesForRoute
} from "@/helpers/routesCalculators";
import { PortFrontend } from "@/models/PortFrontend";
import { ShipStopWithSailingAndPortFrontend } from "@/models/ShipStopFrontend";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";

interface SailingCardProps {
  route: ShipStopWithSailingAndPortFrontend[];
}

export const SailingCard: React.FC<SailingCardProps> = ({
  route
}: SailingCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{
          //https://zayats-yacht.vercel.app/_next/image?url=%2Fimages%2FGolfito.jpg&w=3840&q=75
          uri: `https://zayats-yacht.vercel.app/_next/image?url=%2Fimages%2F${(route[route.length - 1].departurePort as PortFrontend).imageFileName}&w=3840&q=75`
        }}
        style={{ height: 200, width: "100%", borderRadius: 0 }}
      />
      <Card.Content>
        <Text style={styles.title}>
          {route[route.length - 1].sailing?.name || ""}
        </Text>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnHeader}>Loading Port</Text>
          </View>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnContent}>
              {route[0].departurePort?.portName}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnHeader}>Destination Port</Text>
          </View>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnContent}>
              {route[route.length - 1].departurePort?.portName || ""}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnHeader}>Loading Date</Text>
          </View>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnContent}>
              {getInternationalDateFormat(route[0].arrivalOn)}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnHeader}>Arrival Date</Text>
          </View>
          <View style={styles.descriptionContainerColumn}>
            <Text style={styles.columnContent}>
              {getInternationalDateFormat(route[route.length - 1].arrivalOn)}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.integrationContainer}>
          <Text style={styles.integrationHeader}>Miles:</Text>
          <Text style={styles.integrationText}>
            {calculateMilesForRoute(route)}
          </Text>
        </View>
        <View style={styles.integrationContainer}>
          <Text style={styles.integrationHeader}>Days:</Text>
          <Text style={styles.integrationText}>
            {calculateDaysInTransit(route)} days
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button style={styles.button}>
          <Text style={styles.buttonText}>Get Quote</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: Platform.select({
    web: {
      backgroundColor: "#fff",
      borderRadius: 0,
      padding: 0,
      minHeight: 194,
      margin: 20,
      boxShadow: "0 12px 48px 0 rgba(0,0,0,0.38), 0 6px 24px 0 rgba(0,0,0,0.32)"
    },
    default: {
      backgroundColor: "#fff",
      borderRadius: 0,
      padding: 0,
      minHeight: 194,
      margin: 20,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 3
    }
  }),
  title: Platform.select({
    default: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4
    },
    android: {
      fontSize: 16,
      color: "black",
      fontWeight: "bold",
      marginBottom: 4
    }
  }),
  descriptionContainer: Platform.select({
    default: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    android: {
      marginTop: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }),
  descriptionContainerColumn: {
    flex: 1,
    justifyContent: "flex-start"
  },
  columnHeader: Platform.select({
    default: {
      fontSize: 16,
      color: secondary.dark
    },
    android: {
      fontSize: 14,
      color: secondary.dark
    }
  }),
  columnContent: Platform.select({
    default: {
      fontSize: 16,
      fontWeight: "bold",
      color: primary.dark
    },
    android: {
      fontSize: 14,
      fontWeight: "bold",
      color: primary.dark
    }
  }),
  divider: {
    marginVertical: 10
  },
  integrationContainer: {
    marginTop: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  integrationHeader: Platform.select({
    default: {
      fontSize: 16,
      color: secondary.dark,
      marginRight: 10,
      textTransform: "uppercase"
    },
    android: {
      fontSize: 14,
      color: secondary.dark,
      marginRight: 10,
      textTransform: "uppercase"
    }
  }),
  integrationText: Platform.select({
    default: {
      fontSize: 16,
      fontWeight: "bold",
      color: secondary.dark
    },
    android: {
      fontSize: 14,
      fontWeight: "bold",
      color: secondary.dark
    }
  }),
  button: {
    marginTop: 0,
    padding: 0,
    color: "white",
    height: 40,
    borderWidth: 0,
    backgroundColor: secondary.main,
    borderRadius: 0,
    width: "100%"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center"
  }
});
