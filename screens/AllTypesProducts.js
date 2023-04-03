import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ProductsOutput from "../components/ProductsOutput/ProductsOutput";
import { ProductsContext } from "../store/products-context";
import DropDownPicker from "react-native-dropdown-picker";
const AllTypesProducts = () => {
  const expCtx = useContext(ProductsContext);
  const [open, setOpen] = useState(false);
  const [kindValue, setKindValue] = useState("groceries");
  const [items, setItems] = useState([
    { label: "Beverages", value: "beverages" },
    { label: "Candies", value: "candies" },
    { label: "Pots", value: "pots" },
    { label: "Groceries", value: "groceries" },
  ]);
  const [corLabel, setCorLabel] = useState("Groceries");
  const selExps = expCtx.Products.filter((exp) => exp.type === "groceries");
  const [selectedProductsses, setSelectedProductsses] = useState(selExps);
  useLayoutEffect(() => {
    const funSelectedExp = () => {
      const selectedProducts = expCtx.Products.filter(
        (exp) => exp.type === kindValue
      );
      setSelectedProductsses(selectedProducts);
      const labelTrs = items.filter((itm) => itm.value === kindValue)[0];
      setCorLabel(labelTrs.label);
    };
    funSelectedExp();
  }, [kindValue, expCtx.Products]);
  return (
    <>
      <View style={styles.dropd}>
        <DropDownPicker
          open={open}
          value={kindValue}
          items={items}
          setOpen={setOpen}
          setValue={setKindValue}
          setItems={setItems}
        />
      </View>
      <ProductsOutput
        Products={selectedProductsses}
        ProductsPeriode={corLabel}
        fallbackText="No registred Products found"
      />
    </>
  );
};
export default AllTypesProducts;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
