import { useContext } from "react";
import ProductsOutput from "../components/ProductsOutput/ProductsOutput";
import { ProductsContext } from "../store/products-context";
const AllProducts = () => {
  const expCtx = useContext(ProductsContext);
  return (
    <ProductsOutput
      Products={expCtx.Products}
      ProductsPeriode="All-Time"
      fallbackText="No registred Products found"
    />
  );
};
export default AllProducts;
