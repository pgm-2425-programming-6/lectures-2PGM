import { addDays, subDays, format } from "date-fns";
import { StyleSheet, View } from "react-native";
import IconButton from "@design/Button/IconButton";
import ThemedText from "@design/Typography/ThemedText";
import { Variables } from "@style/theme";

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

const formatDate = (date: Date) => {
  if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
    return "Today";
  } else if (format(date, "yyyy") === format(new Date(), "yyyy")) {
    return format(date, "dd/MM");
  } else {
    return format(date, "dd/MM/yyyy");
  }
};

const DateHeaderPicker = ({ date, onDateChange }: Props) => {
  const handleNextDayPress = () => {
    onDateChange(addDays(date, 1));
  };

  const handlePrevDayPress = () => {
    onDateChange(subDays(date, 1));
  };

  // todo: make design component of layout below
  return (
    <View style={styles.container}>
      <IconButton
        label="Previous day"
        color={Variables.colors.white}
        icon="arrow-left-circle"
        onPress={handlePrevDayPress}
      />
      <ThemedText style={styles.text}>{formatDate(date)}</ThemedText>
      <IconButton
        label="Next day"
        color={Variables.colors.white}
        icon="arrow-right-circle"
        onPress={handleNextDayPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Variables.colors.primary["600"],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.sm,
  },
  text: {
    flex: 1,
    textAlign: "center",
    color: Variables.colors.white,
  },
});

export default DateHeaderPicker;
