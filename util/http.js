import axios from "axios";
import { BACKEND_URL } from "@env";

export const fetchProducts = async () => {
  const auth = useContext(AuthContext);
  try {
    const response = await axios.get(BACKEND_URL + "/products/products", {
      Authorization: "Bearer " + auth.token,
    });
    console.log(response.data);
    const Products = [];

    for (const key in response.data.products) {
      const expensObj = {
        id: key,
        amount: response.data[key].amount,
        price: response.data[key].price,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
        type: response.data[key].type,
        name: response.data[key].name,
      };
      Products.push(expensObj);
    }
    return Products;
  } catch (err) {
    throw new Error(err.message || "Somthing went wrong,please try again.");
  }
};

export const updateProduct = async (id, expenseData, token) => {
  return await axios.put(
    BACKEND_URL + `/Products/${id}.json?auth=${token}`,
    expenseData
  );
};

export const deleteProduct = async (id, token) => {
  return await axios.delete(BACKEND_URL + `/Products/${id}.json?auth=${token}`);
};
