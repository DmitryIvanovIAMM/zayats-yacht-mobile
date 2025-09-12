import { primary, secondary } from "@/constants/Colors";
import { getMenuLinks } from "@/helpers/menuLinks";
import { RelativePathString, useRouter } from "expo-router";
import { Divider, Menu } from "react-native-paper";

export interface LeftNavigationProps {
  setMenuIsOpen: (isOpen: boolean) => void;
  visible: boolean;
}

export const LeftNavigation = ({
  setMenuIsOpen,
  visible
}: LeftNavigationProps) => {
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
    <Menu
      visible={visible}
      onDismiss={() => setMenuIsOpen(false)}
      //anchor={<Button onPress={() => setMenuIsOpen(true)}>Show menu</Button>}
      anchor={{ x: -10, y: 110 }}
      contentStyle={{ backgroundColor: secondary.dark }}
    >
      <>
        {menuLinks.map((menuLinkItem, index) => {
          const { label, link, section } = menuLinkItem;
          return (
            <Menu.Item
              key={`menu-item-${index}`}
              onPress={() => handleMenuItemPress(link, section)}
              title={label}
              titleStyle={{ color: primary.contrastText }}
            />
          );
        })}
        <Divider />
      </>
    </Menu>
  );
};
