import { secondary } from "@/constants/Colors";
import { useAuth } from "@/cotnexts/AuthContext";
import { RelativePathString, useRouter } from "expo-router";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export interface AppBarWithIconProps {
  toggleMenu: () => void;
}

const AppBarWithIcon = ({ toggleMenu }: AppBarWithIconProps) => {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();

  const handleLoginPress = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("/login" as RelativePathString);
    }
  };

  return (
    <Appbar.Header style={styles.container}>
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
        icon={isAuthenticated ? "logout" : "login"}
        onPress={handleLoginPress}
        color={secondary.dark}
      />
    </Appbar.Header>
  );
};

export default AppBarWithIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
