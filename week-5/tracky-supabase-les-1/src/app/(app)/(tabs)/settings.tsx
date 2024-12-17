import { logout } from "@core/modules/auth/api";
import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import DefaultView from "@design/View/DefaultView";
import CurrentUserListItem from "@functional/User/CurrentUserListItem";
import { FlatList } from "react-native";

const list: ({ type: "account" } | { type: "item"; title: string; onPress: () => void })[] = [
  {
    type: "account",
  },
  {
    type: "item",
    onPress: () => logout(),
    title: "Logout",
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
            <CurrentUserListItem />
          ) : (
            <ListItem onPress={item.onPress} title={item.title} />
          )
        }
      />
    </DefaultView>
  );
};

export default Settings;
