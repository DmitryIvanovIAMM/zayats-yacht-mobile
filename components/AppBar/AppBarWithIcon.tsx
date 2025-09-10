import { secondary } from "@/constants/Colors";
import { useAuth } from "@/cotnexts/AuthContext";
import { RelativePathString, useRouter } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";

export interface AppBarWithIconProps {
  toggleMenu: () => void;
}

const AppBarWithIcon = ({ toggleMenu }: AppBarWithIconProps) => {
  const router = useRouter();
  const { logout, authState } = useAuth();

  const handleLoginPress = () => {
    if (authState.isAuthenticated) {
      logout();
    } else {
      router.push("/login" as RelativePathString);
    }
  };

  return (
    <Appbar.Header style={styles.container}>
      <View style={styles.firstDiv}>
        <Appbar.Action
          icon="menu"
          onPress={toggleMenu}
          color={secondary.dark}
        />
      </View>
      <Appbar.Content
        title={
          <Image
            source={require("@/assets/images/zayats-logo-transparent.png")}
            style={styles.alliedIcon}
          />
        }
        style={styles.secondDiv}
      />
      <View style={styles.thirdDiv}>
        {authState.isValidating ? (
          <ActivityIndicator
            size="small"
            color={secondary.dark}
            style={styles.activityIndicator}
          />
        ) : authState.isAuthenticated ? (
          <View style={styles.appBarIconWitName}>
            <View style={styles.userNameWithIcon}>
              <Text style={styles.userName}>
                {authState.userInfo?.user?.name
                  ? (authState?.userInfo?.user?.name ?? "User")
                  : (authState?.userInfo?.user?.email ?? "User")}
              </Text>
              <Appbar.Action
                icon="logout"
                onPress={handleLoginPress}
                color={secondary.dark}
                style={styles.appBarIconAfterNName}
              />
            </View>
          </View>
        ) : (
          <Appbar.Action
            icon="login"
            onPress={handleLoginPress}
            color={secondary.dark}
            style={styles.singAppBarIcon}
          />
        )}
      </View>
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
    width: "100%",
  },
  firstDiv: {
    flex: 1,
    justifyContent: "flex-start",
  },
  secondDiv: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thirdDiv: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  alliedIcon: {
    height: 55,
    width: 80,
    bottom: 0,
    alignSelf: "center",
  },
  userNameWithIcon: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  userName: Platform.select({
    default: {
      color: secondary.dark,
      fontSize: 18,
      marginRight: 8,
      fontWeight: "bold",
      textAlign: "right",
      alignSelf: "center",
    },
    android: {
      color: secondary.dark,
      fontSize: 14,
      fontWeight: "bold",
      textWrap: "wrap",
      width: "100%",
      textAlign: "right",
      alignSelf: "center",
    },
  }),
  activityIndicator: {
    marginRight: 16,
  },
  singAppBarIcon: {
    padding: 0,
  },
  appBarIconWitName: {
    flexDirection: "row",
    alignItems: "center",
  },
  appBarIconAfterNName: {
    marginLeft: 0,
    padding: 0,
    width: "auto",
  },
});
