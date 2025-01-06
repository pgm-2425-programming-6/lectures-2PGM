import { getLogsByDate } from "@core/modules/logs/api";
import { formatTimeToString } from "@core/modules/logs/utils";
import ListItem from "@design/List/ListItem";
import ThemedText from "@design/Typography/ThemedText";
import CenteredView from "@design/View/CenteredView";
import DataListView from "@functional/Data/DataListView";
import DateHeaderPicker from "@functional/Date/DateHeaderPicker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const Home = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DateHeaderPicker date={date} onDateChange={setDate} />
      <DataListView
        name={["logs", date]}
        method={() => getLogsByDate(date)}
        renderItem={({ item }) => (
          <ListItem
            title={item.description}
            description={item.project.name}
            onPress={() => {}}
            right={formatTimeToString(item.time)}
          />
        )}
        emptyIcon="home"
        emptyTitle="No logs"
        emptyDescription="There are no logs available."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
