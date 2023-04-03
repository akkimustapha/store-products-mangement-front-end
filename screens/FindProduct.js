import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import ProductsOutput from "../components/ProductsOutput/ProductsOutput";
import { ProductsContext } from "../store/products-context";
import Input from "../components/ManageProduct/Input";
import { GloablStyles } from "../constants/styles";
const FindProduct = () => {
  const expCtx = useContext(ProductsContext);
  const [selectedProductsses, setSelectedProductsses] = useState([]);

  const findProductHandler = (e) => {
    if (!e.trim()) {
      setSelectedProductsses([]);
      return;
    }
    const selectedProducts = expCtx.Products.filter((exp) =>
      exp.name.includes(e.trim())
    );
    setSelectedProductsses(selectedProducts);
  };

  return (
    <>
      <View style={styles.root}>
        <Input
          label="Enter Name"
          textInputConfig={{
            onChangeText: findProductHandler,
            maxLength: 100,
          }}
        />
      </View>

      <ProductsOutput
        Products={selectedProductsses}
        ProductsPeriode="Found Products"
        fallbackText="No Product found"
      />
    </>
  );
};
export default FindProduct;
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    backgroundColor: GloablStyles.colors.primary700,
  },
  txt: {
    fontSize: 34,
    fontWeight: "bold",
  },
  dropd: {
    marginTop: 0,
    zIndex: 5,
  },
});
