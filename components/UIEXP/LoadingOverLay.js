import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GloablStyles } from "../../constants/styles";
const LoadingOverLay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};
export default LoadingOverLay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GloablStyles.colors.primary700,
  },
});
