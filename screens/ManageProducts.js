import axios from "axios";
import { BACKEND_URL } from "@env";
import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UIEXP/IconButton";
import { GloablStyles } from "../constants/styles";
import { ProductsContext } from "../store/products-context";
import ProducteForm from "../components/ManageProduct/ProductForm";
import LoadingOverLay from "../components/UIEXP/LoadingOverLay";
import ErrorOverLay from "../components/UIEXP/ErrorOverLay";
import { AuthContext } from "../store/auth-context";
const ManageProducte = ({ route, navigation }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();
  const expCtx = useContext(ProductsContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const editedProducteId = route.params?.ProductId;
  const isEditing = !!editedProducteId;
  const selectedProducte = expCtx.Products.find(
    (Product) => Product.id === editedProducteId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Product" : "Add Product",
    });
  }, [navigation, isEditing]);
  const deleteProductHandler = async () => {
    setIsSubmiting(true);
    try {
      const response = await axios.delete(
        BACKEND_URL + "/products/" + editedProducteId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!!response.data.msg && response.data.msg === "logout") {
        authCtx.logout();
        return;
      }
      expCtx.deleteProduct(editedProducteId);
      navigation.goBack();
    } catch (e) {
      setError("Could not delete Product - please try again later!");
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (ProductData) => {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        const response = await axios.patch(
          BACKEND_URL + "/products/" + editedProducteId,
          ProductData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!!response.data.msg && response.data.msg === "logout") {
          authCtx.logout();
          return;
        }

        expCtx.updateProduct(editedProducteId, ProductData);
      } else {
        const response = await axios.post(
          BACKEND_URL + "/products",
          ProductData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!!response.data.msg && response.data.msg === "logout") {
          authCtx.logout();
          return;
        }

        expCtx.addProduct({ ...ProductData });
      }
      navigation.navigate("AllProducts");
    } catch (e) {
      console.log(e);
      setError("Could not save data - please try again later!");
      setIsSubmiting(false);
    }
  };

  if (error && !isSubmiting) {
    return <ErrorOverLay message={error} onConfirm={() => setError(null)} />;
  }
  if (isSubmiting) {
    return <LoadingOverLay />;
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <ProducteForm
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          defaultValues={selectedProducte}
        />
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GloablStyles.colors.error500}
            size={36}
            onPress={deleteProductHandler}
          />
        </View>
      )}
    </View>
  );
};
export default ManageProducte;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 10,
    padding: 24,
    backgroundColor: GloablStyles.colors.primary700,
  },
  deleteContainer: {
    borderTopWidth: 2,
    borderTopColor: GloablStyles.colors.primary500,
    alignItems: "center",
    flex: 1,
    backgroundColor: GloablStyles.colors.primary700,
  },
});
