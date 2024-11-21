import { StyleSheet, Image, Platform, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
];

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <FlatList data={items} renderItem={({ item }) => <Text>{item}</Text>} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
