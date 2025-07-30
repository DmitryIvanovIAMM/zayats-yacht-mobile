import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { secondary } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: secondary.light,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: secondary.dark,
          },
          android: {
            // Use a solid background on Android
            backgroundColor: secondary.dark,
          },
          default: { backgroundColor: secondary.dark },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          tabBarItemStyle: { backgroundColor: secondary.dark },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarItemStyle: { backgroundColor: secondary.dark },
        }}
      />
      <Tabs.Screen
        name="instructions"
        options={{
          title: "Instructions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
          tabBarItemStyle: { backgroundColor: secondary.dark },
        }}
      />
      <Tabs.Screen
        name="testimonials"
        options={{
          title: "Testimonials",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="message.badge" color={color} />
          ),
          tabBarItemStyle: { backgroundColor: secondary.dark },
        }}
      />
    </Tabs>
  );
}
