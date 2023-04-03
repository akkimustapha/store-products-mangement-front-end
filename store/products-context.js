import { createContext, useReducer } from "react";
export const ProductsContext = createContext({
  Products: [],
  addProduct: ({
    description,
    wholesale_price,
    retail_price,
    date,
    type,
    name,
  }) => {},
  setProducts: (Products) => {},
  deleteProduct: (id) => {},
  updateProduct: (
    id,
    { description, wholesale_price, retail_price, date, name }
  ) => {},
});

const ProductsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableProductIndex = state.findIndex(
        (Product) => Product.id === action.payload.id
      );
      const updatableProduct = state[updatableProductIndex];
      const updatedItem = { ...updatableProduct, ...action.payload.data };
      const updatedProducts = [...state];
      updatedProducts[updatableProductIndex] = updatedItem;
      return updatedProducts;
    case "DELETE":
      return state.filter((Product) => Product.id !== action.payload);
    default:
      return state;
  }
};
const ProductsContextProvider = ({ children }) => {
  const [ProductState, dispatch] = useReducer(ProductsReducer, []);
  const addProduct = (ProductData) => {
    dispatch({ type: "ADD", payload: ProductData });
  };
  const setProducts = (Products) => {
    dispatch({ type: "SET", payload: Products });
  };
  const deleteProduct = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateProduct = (id, ProductData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: ProductData } });
  };
  const value = {
    Products: ProductState,
    addProduct,
    setProducts,
    deleteProduct,
    updateProduct,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsContextProvider;
