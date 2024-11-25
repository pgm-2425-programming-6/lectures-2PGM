import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import CustomText from "@/components/CustomText";

export default function TabOneScreen() {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Tab One</Text>
      <CustomText>Hallo</CustomText>
      <Button title="Press me" onPress={() => console.log("Button pressed")} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
