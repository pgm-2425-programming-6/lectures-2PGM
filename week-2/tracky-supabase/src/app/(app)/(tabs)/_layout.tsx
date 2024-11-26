import { Tabs } from "expo-router";
import Icons from "@expo/vector-icons/Feather";
import { DefaultScreenOptions } from "@style/theme";

const TabLayout = () => {
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
