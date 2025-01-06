import { Tabs } from "expo-router";
import Icons from "@expo/vector-icons/Feather";
import { DefaultScreenOptions } from "@style/theme";
import useUser from "@functional/Auth/useUser";
import { Role } from "@core/modules/auth/types";

const TabLayout = () => {
  const user = useUser();

  return (
    <Tabs screenOptions={DefaultScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Icons size={size} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color, size }) => <Icons size={size} name="folder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color, size }) => <Icons size={size} name="briefcase" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: "Profiles",
          tabBarIcon: ({ color, size }) => <Icons size={size} name={"user"} color={color} />,
          ...(user.role !== Role.Admin ? { href: null } : {}), // hacky way for hiding a tab in Expo
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Icons size={size} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
