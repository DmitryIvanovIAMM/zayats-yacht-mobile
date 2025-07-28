import * as React from "react";
import { Appbar } from "react-native-paper";
import { secondary } from "@/constants/Colors";
import { Image, StyleSheet } from "react-native";

export interface AppBarWithIconProps {
  toggleMenu: () => void;
}
const AppBarWithIcon = ({ toggleMenu }: AppBarWithIconProps) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={toggleMenu} color={secondary.dark} />
      <Appbar.Content
        title={
          <Image
            source={require("@/assets/images/allied_yacht_vertical_png_120.png")}
            style={styles.alliedIcon}
          />
        }
      />
      <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default AppBarWithIcon;

const styles = StyleSheet.create({
  alliedIcon: {
    height: 55,
    width: 80,
    bottom: 0,
    //left: 0,
    //position: "absolute",
  },
});
