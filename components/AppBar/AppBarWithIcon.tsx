import { secondary } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { RelativePathString, useRouter } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Appbar } from "react-native-paper";
import WebAppBarWithIcon from "./WebAppBarWithIcon";

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

  // Use web-specific AppBar for web platform
  if (Platform.OS === "web") {
    return <WebAppBarWithIcon toggleMenu={toggleMenu} />;
  }

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
          <View style={styles.logoContainer}>
            <Image
              // source={require("@/assets/images/zayats-logo-transparent.png")} //ZAYATS_embedded
              // source={require("@/assets/images/ZAYATS_embedded.svg")} //ZAYATS_embedded
              source={require("@/assets/images/zayats-logo-white.png")} //ZAYATS_embedded
              style={styles.alliedIcon}
            />
            <View
              style={styles.logoTouchable}
              onTouchEnd={() => router.push("/" as RelativePathString)}
            />
          </View>
        }
        style={styles.secondDiv}
      />
      <View style={styles.thirdDiv}>
        {authState.isValidating ? (
          <ActivityIndicator
            testID="spinner"
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
    ...Platform.select({
      web: {
        position: "sticky" as any,
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)" as any
      },
      default: {
        elevation: 4
      }
    })
  },
  firstDiv: {
    flex: 1,
    justifyContent: "flex-start"
  },
  secondDiv: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  thirdDiv: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  alliedIcon: {
    height: 55,
    width: 80,
    maxWidth: "100%",
    bottom: 0,
    alignSelf: "center"
  },
  userNameWithIcon: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  userName: Platform.select({
    default: {
      color: secondary.dark,
      fontSize: 18,
      marginRight: 8,
      fontWeight: "bold",
      textAlign: "right",
      alignSelf: "center"
    },
    android: {
      color: secondary.dark,
      fontSize: 14,
      fontWeight: "bold",
      textWrap: "wrap",
      width: "100%",
      textAlign: "right",
      alignSelf: "center"
    }
  }),
  activityIndicator: {
    marginRight: 16
  },
  singAppBarIcon: {
    padding: 0
  },
  appBarIconWitName: {
    flexDirection: "row",
    alignItems: "center"
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  logoTouchable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  appBarIconAfterNName: {
    marginLeft: 0,
    padding: 0,
    width: "auto"
  },
  iconButton: {
    padding: 8,
    borderRadius: 4,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
