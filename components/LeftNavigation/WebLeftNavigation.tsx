import { primary, secondary } from "@/constants/Colors";
import { getMenuLinks } from "@/helpers/menuLinks";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";

export interface WebLeftNavigationProps {
  setMenuIsOpen: (isOpen: boolean) => void;
  visible: boolean;
}

export const WebLeftNavigation = ({
  setMenuIsOpen,
  visible
}: WebLeftNavigationProps) => {
  const router = useRouter();
  const menuLinks = getMenuLinks(false);

  const handleMenuItemPress = (link: string = "/", section: string = "") => {
    setMenuIsOpen(false);
    if (!link) return;

    const routeLink = link.startsWith("/") ? link : `/${link}`;
    const routeSection = section
      ? routeLink + `?section=${section}`
      : routeLink;

    router.push(routeSection as RelativePathString);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setMenuIsOpen(false)}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => setMenuIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.menuContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {menuLinks.map((menuLinkItem, index) => {
            const { label, link, section } = menuLinkItem;
            return (
              <TouchableOpacity
                key={`menu-item-${index}`}
                onPress={() => handleMenuItemPress(link, section)}
                style={styles.menuItem}
              >
                <Text style={styles.menuItemText}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 60,
    paddingLeft: 10
  },
  menuContainer: {
    backgroundColor: secondary.dark,
    borderRadius: 4,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)"
  },
  menuItemText: {
    color: primary.contrastText,
    fontSize: 16
  }
});
