import { Pressable, StyleSheet, Text, View } from "react-native";
import { GloablStyles } from "../../constants/styles";
import { getFormatedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({
  id,
  description,
  wholesale_price,
  retail_price,
  date,
  name,
}) => {
  //
  const navigation = useNavigation();

  //
  const productHandler = () => {
    navigation.navigate("ManageProduct", {
      ProductId: id,
    });
  };

  //
  return (
    <Pressable
      onPress={productHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.ProductItem}>
        <View style={styles.prix}>
          <View style={styles.amountContainer}>
            <View style={styles.am}>
              <View style={styles.wrd}>
                <Text style={styles.amount}> W.Price :</Text>
              </View>
              <View style={styles.nmb}>
                <Text style={styles.amount}>
                  ${wholesale_price.toFixed(2)} <Text style={styles.dh}></Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <View style={styles.am}>
              <View style={styles.wrd}>
                <Text style={styles.amount}>R.Price :</Text>
              </View>
              <View style={styles.nmb}>
                <Text style={styles.amount}>
                  ${retail_price.toFixed(2)} <Text style={styles.dh}></Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.btm}>
          <View style={styles.dt}>
            <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
          </View>
          <View style={styles.nameBox}>
            <Text style={[styles.textBase, styles.name]}>
              {name.substring(0, 40)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  ProductItem: {
    padding: 4,
    marginVertical: 4,
    backgroundColor: GloablStyles.colors.primary500,
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GloablStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GloablStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: GloablStyles.colors.gray900,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    flex: 1,
    margin: 2,
  },
  amount: {
    color: GloablStyles.colors.primary500,
    fontWeight: "bold",
  },
  prix: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  am: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  wrd: {
    flex: 1,
  },
  nmb: {
    flex: 1,
  },
  btm: {
    padding: 2,
  },
  desc: {
    backgroundColor: GloablStyles.colors.primary700,
    padding: 6,
  },
  nameBox: {
    borderRadius: 6,
    overflow: "hidden",
  },
  name: {
    backgroundColor: GloablStyles.colors.primary30,
    padding: 6,
    color: GloablStyles.colors.primary20,
    fontSize: 16,
    fontWeight: "bold",
  },
  dt: {
    marginBottom: 4,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dh: {
    fontSize: 10,
  },
});
