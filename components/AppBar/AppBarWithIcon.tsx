import { secondary } from "@/constants/Colors";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export interface AppBarWithIconProps {
  toggleMenu: () => void;
}

const AppBarWithIcon = ({ toggleMenu }: AppBarWithIconProps) => {
  return (
    <Appbar.Header style={styles.cotainer}>
      <Appbar.Action icon="menu" onPress={toggleMenu} color={secondary.dark} />
      <Appbar.Content
        title={
          <Image
            source={require("@/assets/images/allied_yacht_vertical_png_120.png")}
            style={styles.alliedIcon}
          />
        }
      />
      <Appbar.Action
        icon="calendar"
        onPress={() => {}}
        color={secondary.dark}
      />
    </Appbar.Header>
  );
};

export default AppBarWithIcon;

const styles = StyleSheet.create({
  cotainer: {
    backgroundColor: "white",
    color: secondary.dark,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alliedIcon: {
    height: 55,
    width: 80,
    bottom: 0,
    alignSelf: "center",
  },
});
