import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import DefaultView from "@design/View/DefaultView";
import { FlatList } from "react-native";

const placeholderData = [
  {
    id: 1,
    name: "Client 1",
  },
  {
    id: 2,
    name: "Client 2",
  },
  {
    id: 3,
    name: "Client 3",
  },
];

const Clients = () => {
  return (
    <DefaultView padding={false}>
      <FlatList
        data={placeholderData}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <ListItem onPress={() => {}} title={item.name} />}
      />
    </DefaultView>
  );
};

export default Clients;
