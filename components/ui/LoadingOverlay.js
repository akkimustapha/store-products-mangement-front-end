import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GloablStyles } from "../../constants/styles";
function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color={GloablStyles.colors.error500} />
    </View>
  );
}
export default LoadingOverlay;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: GloablStyles.colors.primary700,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: GloablStyles.colors.error500,
  },
});
