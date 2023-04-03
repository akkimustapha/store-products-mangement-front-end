import axios from "axios";
import { BACKEND_URL } from "@env";
import { useContext, useEffect, useState } from "react";
import ProductsOutput from "../components/ProductsOutput/ProductsOutput";
import ErrorOverLay from "../components/UIEXP/ErrorOverLay";
import LoadingOverLay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { ProductsContext } from "../store/products-context";
import { getDateMinusDays } from "../util/date";
const RecentProducts = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const expCtx = useContext(ProductsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const getProducts = async () => {
      setIsFetching(true);

      try {
        const response = await axios.get(BACKEND_URL + "/products/products", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const Products = [];
        for (const key in response.data.products) {
          const expensObj = {
            id: response.data.products[key].id,
            wholesale_price: 50,//response.data.products[key].wholesale_price,
           retail_price: 60,//response.data.retail_price[key].price,
            date: new Date(response.data.products[key].date),
            description: response.data.products[key].description,
            type: response.data.products[key].type,
            name: response.data.products[key].name,
          };
          Products.push(expensObj);
        }
        expCtx.setProducts(Products);
      } catch (err) {
        setError("Could not fetch Products!");
      }

      setIsFetching(false);
    };
    getProducts();
  }, []);

  const recentProducts = expCtx.Products.filter((Product) => {
    const today = new Date();
    const date30DaysAgo = getDateMinusDays(today, 30);
    return Product.date >= date30DaysAgo && Product.date <= today;
  });
  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={() => setError(null)} />;
  }
  if (isFetching) {
    return <LoadingOverLay message="Fetching Data..." />;
  }
  return (
    <ProductsOutput
      Products={recentProducts}
      ProductsPeriode="Last 30 Days"
      fallbackText="No Products registred for the last 30 days"
    />
  );
};
export default RecentProducts;
