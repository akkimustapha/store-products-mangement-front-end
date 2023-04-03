import { FlatList } from "react-native";
import ProductItem from "./ProductItem";
const rendeerProductItem = (itemData) => {
  return <ProductItem {...itemData.item} />;
};
const ProductsList = ({ Products }) => {
  return (
    <FlatList
      data={Products}
      renderItem={rendeerProductItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProductsList;
