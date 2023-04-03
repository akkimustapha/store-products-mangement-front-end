import { View, Text, StyleSheet } from "react-native";
import { GloablStyles } from "../../constants/styles";
const ProductsSummary = ({ periodName, Products }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
    </View>
  );
};
export default ProductsSummary;
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GloablStyles.colors.black,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    color: GloablStyles.colors.white,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GloablStyles.colors.primary500,
  },
});
