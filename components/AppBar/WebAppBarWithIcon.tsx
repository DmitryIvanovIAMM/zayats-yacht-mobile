import { secondary } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { RelativePathString, useRouter } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export interface WebAppBarWithIconProps {
  toggleMenu: () => void;
}

const WebAppBarWithIcon = ({ toggleMenu }: WebAppBarWithIconProps) => {
  const router = useRouter();
  const { logout, authState } = useAuth();

  const handleLoginPress = () => {
    if (authState.isAuthenticated) {
      logout();
    } else {
      router.push("/login" as RelativePathString);
    }
  };

  const isWeb = typeof window !== "undefined" && window.document;
  const webStickyStyle = isWeb
    ? {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
      }
    : {};

  if (isWeb) {
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row" as const,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          height: 64,
          padding: "0 16px",
          borderBottom: "1px solid #e0e0e0",
          ...(webStickyStyle as React.CSSProperties)
        }}
      >
        {/* ...existing code... */}
        <View style={styles.firstDiv}>
          <TouchableOpacity
            onPress={toggleMenu}
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Toggle menu"
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondDiv}>
          <TouchableOpacity
            onPress={() => router.push("/" as RelativePathString)}
            accessibilityRole="link"
            accessibilityLabel="Go to home page"
          >
            <Image
              source={require("@/assets/images/zayats-logo-white.png")}
              style={styles.alliedIcon}
            />
          </TouchableOpacity>
        </View>
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
                <TouchableOpacity
                  onPress={handleLoginPress}
                  style={styles.logoutButton}
                  accessibilityRole="button"
                  accessibilityLabel="Logout"
                >
                  <Text style={styles.logoutIcon}>⏻</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLoginPress}
              style={styles.loginButton}
              accessibilityRole="button"
              accessibilityLabel="Login"
            >
              <Text style={styles.loginIcon}>👤</Text>
            </TouchableOpacity>
          )}
        </View>
      </div>
    );
  }

  return (
    <View style={styles.container}>
      {/* ...existing code... */}
      <View style={styles.firstDiv}>
        <TouchableOpacity
          onPress={toggleMenu}
          style={styles.menuButton}
          accessibilityRole="button"
          accessibilityLabel="Toggle menu"
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondDiv}>
        <TouchableOpacity
          onPress={() => router.push("/" as RelativePathString)}
          accessibilityRole="link"
          accessibilityLabel="Go to home page"
        >
          <Image
            source={require("@/assets/images/zayats-logo-white.png")}
            style={styles.alliedIcon}
          />
        </TouchableOpacity>
      </View>

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
              <TouchableOpacity
                onPress={handleLoginPress}
                style={styles.logoutButton}
                accessibilityRole="button"
                accessibilityLabel="Logout"
              >
                <Text style={styles.logoutIcon}>⏻</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleLoginPress}
            style={styles.loginButton}
            accessibilityRole="button"
            accessibilityLabel="Login"
          >
            <Text style={styles.loginIcon}>👤</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default WebAppBarWithIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
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
    alignSelf: "center"
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  menuIcon: {
    fontSize: 24,
    color: secondary.dark,
    fontWeight: "bold"
  },
  loginButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  loginIcon: {
    fontSize: 24,
    color: secondary.dark
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: 8
  },
  logoutIcon: {
    fontSize: 20,
    color: secondary.dark
  },
  userNameWithIcon: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  userName: {
    color: secondary.dark,
    fontSize: 16,
    marginRight: 8,
    fontWeight: "bold",
    textAlign: "right",
    alignSelf: "center"
  },
  activityIndicator: {
    marginRight: 16
  },
  appBarIconWitName: {
    flexDirection: "row",
    alignItems: "center"
  }
});
