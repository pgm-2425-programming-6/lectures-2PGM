import { StyleSheet, Text } from "react-native";

type Props = {
  children: string;
};

const CustomText = ({ children }: Props) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "green",
  },
});

export default CustomText;
