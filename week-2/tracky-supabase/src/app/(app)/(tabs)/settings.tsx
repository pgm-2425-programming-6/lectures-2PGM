import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import ListProfileItem from "@design/List/Profile/ListProfileItem";
import DefaultView from "@design/View/DefaultView";
import { FlatList } from "react-native";

const list: ({ type: "account" } | { type: "item"; title: string })[] = [
  {
    type: "account",
  },
  {
    type: "item",
    title: "Item 1",
  },
  {
    type: "item",
    title: "Item 2",
  },
];

const Settings = () => {
  return (
    <DefaultView padding={false}>
      <FlatList
        data={list}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) =>
          item.type === "account" ? (
            <ListProfileItem
              title="John Doe"
              avatarText="JD"
              description="john.doe@gmail.com"
              onPress={() => {}}
            ></ListProfileItem>
          ) : (
            <ListItem onPress={() => {}} title={item.title} />
          )
        }
      />
    </DefaultView>
  );
};

export default Settings;
