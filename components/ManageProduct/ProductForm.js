import { useState } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { GloablStyles } from "../../constants/styles";
import { getFormatedDate } from "../../util/date";
import Button from "../UIEXP/Button";
import Input from "./Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
const ProductForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [open, setOpen] = useState(false);
  const [kindValue, setKindValue] = useState(
    defaultValues ? defaultValues.type.toString() : "groceries"
  );
  const [items, setItems] = useState([
    { label: "Beverages", value: "beverages" },
    { label: "Candies", value: "candies" },
    { label: "Pots", value: "pots" },
    { label: "Groceries", value: "groceries" },
  ]);
  const [inputs, setInputs] = useState({
    wholesale_price: {
      value: defaultValues ? defaultValues.wholesale_price.toString() : "",
      isValid: true,
    },
    retail_price: {
      value: defaultValues ? defaultValues.retail_price.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormatedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifer, entredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifer]: { value: entredValue, isValid: true },
      };
    });
  };
  const [datee, setDatee] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDatee(currentDate);
    setInputs((curInputs) => {
      return {
        ...curInputs,
        date: { value: selectedDate.toISOString(), isValid: true },
      };
    });
  };
  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
    }
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const submitHandler = () => {
    const expensData = {
      retail_price: +inputs.retail_price.value,
      wholesale_price: +inputs.wholesale_price.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      type: kindValue,
      name: inputs.name.value,
    };
    const wholesaleIsValid =
      !isNaN(expensData.wholesale_price) && expensData.wholesale_price > 0;
    const retailIsValid =
      !isNaN(expensData.retail_price) && expensData.retail_price > 0;
    const dateIsValid = expensData.date.toString() !== "Invalid Date";
    const nameIsValid = expensData.name.trim().length > 0;
    if (!wholesaleIsValid || !dateIsValid || !priceIsValid || !nameIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          retail_price: {
            value: curInputs.retail_price.value,
            isValid: retailIsValid,
          },
          wholesale_price: {
            value: curInputs.wholesale_price.value,
            isValid: wholesaleIsValid,
          },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          name: { value: curInputs.name.value, isValid: nameIsValid },
          description: {
            value: curInputs.description.value,
            isValid: true,
          },
        };
      });
      return;
    }
    onSubmit(expensData);
  };
  const formIsInValid =
    !inputs.retail_price.isValid ||
    !inputs.retail_price.isValid ||
    !inputs.date.isValid ||
    !inputs.name.isValid;
  return (
    <>
      <View style={styles.titleCont}>
        <Text style={styles.titleStyle}>Add Your Product</Text>
      </View>
      <View style={styles.tp}>
        <Text style={styles.tx}>Type</Text>
      </View>
      <View style={styles.top}>
        <DropDownPicker
          open={open}
          value={kindValue}
          items={items}
          setOpen={setOpen}
          setValue={setKindValue}
          setItems={setItems}
        />
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.clm}>
          <View style={styles.inputsRow}>
            <Input
              label=" Retail Price"
              inValid={!inputs.retail_price.isValid}
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangedHandler.bind(null, "retail_price"),
              }}
              style={styles.inputStyle}
            />

            <Input
              label="Date"
              inValid={!inputs.date.isValid}
              textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(null, "date"),
                value: inputs.date.value,
              }}
              style={styles.inputStyle}
            />
          </View>
          <View style={styles.bt}>
            <Button style={styles.button} onPress={showDatepicker}>
              Show date picker!
            </Button>
          </View>

          <Input
            label=" Wholesale Price"
            inValid={!inputs.wholesale_price.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(null, "wholesale_price"),
            }}
            style={styles.inputStyle}
          />
          <Input
            label="Name"
            inValid={!inputs.name.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(null, "name"),
              value: inputs.name.value,
              maxLength: 100,
            }}
          />
          <Input
            label="Description"
            inValid={false}
            textInputConfig={{
              multiline: true,
              onChangeText: inputChangedHandler.bind(null, "description"),
              value: inputs.description.value,
            }}
          />
        </View>

        {formIsInValid && (
          <Text style={styles.errorText}>
            Invalid inputs values - Please check your entred data
          </Text>
        )}
        <View style={styles.buttons}>
          <Button mode="flat" style={styles.button} onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={datee}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </ScrollView>
    </>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  bt: {
    marginTop: 6,
  },
  clm: {
    flex: 3,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputStyle: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GloablStyles.colors.primary500,
    textAlign: "center",
    marginBottom: 6,
  },
  titleCont: {
    borderBottomColor: GloablStyles.colors.primary500,
    borderBottomWidth: 2,
    marginBottom: 4,
    marginHorizontal: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GloablStyles.colors.error500,
    margin: 8,
  },
  top: {
    zIndex: 5,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  tp: {
    marginTop: 8,
  },
  tx: {
    color: GloablStyles.colors.primary500,
  },
});
