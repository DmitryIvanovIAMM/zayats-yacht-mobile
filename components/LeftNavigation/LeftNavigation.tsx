import { Button, Divider, Menu } from "react-native-paper";
import { primary, secondary } from "@/constants/Colors";
import { getMenuLinks } from "@/helpers/menuLinks";

export interface LeftNavigationProps {
  setMenuIsOpen: (iaOpen: boolean) => void;
  visible: boolean;
}

export const LeftNavigation = ({
  setMenuIsOpen,
  visible,
}: LeftNavigationProps) => {
  const menuLinks = getMenuLinks(false);
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
              onPress={() => {
                console.log(`Navigating to ${section}`);
                setMenuIsOpen(false);
              }}
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
