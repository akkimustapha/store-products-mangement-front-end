import { View, StyleSheet, Text } from "react-native";
import { GloablStyles } from "../../constants/styles";
import ProductsList from "./ProductsList";
import ProductsSummary from "./ProductsSummary";
const ProductsOutput = ({ Products, ProductsPeriode, fallbackText, style }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (Products.length > 0) {
    content = <ProductsList Products={Products} />;
  }
  return (
    <View style={styles.contianer}>
      <ProductsSummary
        Products={Products}
        periodName={ProductsPeriode}
        style={style}
      />
      {content}
    </View>
  );
};
export default ProductsOutput;
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 0,
    backgroundColor: GloablStyles.colors.primary700,
  },
  infoText: {
    color: GloablStyles.colors.error600,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
