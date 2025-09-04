import { secondary } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
interface FormContainerProps {
  borderWidth?: number;
}

export const FormContainer: FC<PropsWithChildren<FormContainerProps>> = ({
  children,
  borderWidth = 2,
}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        })
      ).start();
    };
    startRotation();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.gradientWrapper, { transform: [{ rotate }] }]}
      >
        <LinearGradient
          colors={[secondary.dark, "white", secondary.dark, "white"]}
          style={styles.gradientBorder}
        />
      </Animated.View>
      <View style={[styles.container, { margin: borderWidth }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    overflow: "hidden",
  },
  gradientWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 1,
    zIndex: 1,
  },
  gradientBorder: {
    flex: 1,
    borderRadius: 1,
  },
});
