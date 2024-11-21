import { Image, StyleSheet, Platform, View, Text, Button, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Hello</Text>
        <Button title="Klik mij" onPress={() => alert("Klik")} />
        <View style={styles.box}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  box: {
    height: 1200,
    width: 50,
    backgroundColor: "blue",
  },
});
