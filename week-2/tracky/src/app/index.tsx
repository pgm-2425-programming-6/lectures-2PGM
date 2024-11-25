import { Text, View } from "react-native";
import ThemedText from "@design/Typography/ThemedText";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText type="title">Hello, world!</ThemedText>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/(tabs)">Go to the tabs screen</Link>
    </View>
  );
}
