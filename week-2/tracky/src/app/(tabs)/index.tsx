import ThemedText from "@design/Typography/ThemedText";
import CenteredView from "@design/View/CenteredView";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <CenteredView>
      <ThemedText type="title">Home</ThemedText>
    </CenteredView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
  },
});

export default Home;
