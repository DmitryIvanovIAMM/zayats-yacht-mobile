import { primary, secondary } from "@/constants/Colors";
import { getMenuLinks } from "@/helpers/menuLinks";
import { RelativePathString, useRouter } from "expo-router";
import { Divider, Menu } from "react-native-paper";

export interface LeftNavigationProps {
  setMenuIsOpen: (iaOpen: boolean) => void;
  visible: boolean;
}

export const LeftNavigation = ({
  setMenuIsOpen,
  visible,
}: LeftNavigationProps) => {
  const router = useRouter();
  const menuLinks = getMenuLinks(false);

  const handleMenuItemPress = (link: string = "/") => {
    console.log(`Navigating to ${link}`);
    setMenuIsOpen(false);
    if (!link) return;

    if (link.startsWith("/")) {
      router.push(link as RelativePathString);
    } else {
      router.push(`/${link}` as RelativePathString);
    }
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
          const { label, section } = menuLinkItem;
          return (
            <Menu.Item
              key={`menu-item-${index}`}
              onPress={() => handleMenuItemPress(menuLinkItem?.link)}
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
