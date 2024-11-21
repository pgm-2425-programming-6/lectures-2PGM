import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

const Root = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Link style={styles.link} href="/oefeningen/Oefening1">
          Oefening 1
        </Link>
        <Link style={styles.link} href="/oefeningen/Oefening2">
          Oefening 2
        </Link>
        <Link style={styles.link} href="/oefeningen/Oefening3">
          Oefening 3
        </Link>
        <Link style={styles.link} href="/oefeningen/Oefening4">
          Oefening 4
        </Link>
        <Link style={styles.link} href="/oefeningen/Oefening5">
          Oefening 5
        </Link>
        <Link style={styles.link} href="/oefeningen/Oefening6">
          Oefening 6
        </Link>
        <Link style={styles.link} href="/oefeningen/Oefening7">
          Oefening 7
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
  },
  link: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default Root;
