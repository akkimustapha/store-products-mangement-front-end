import { StyleSheet, Text, TextInput, View } from "react-native";
import { GloablStyles } from "../../constants/styles";
const Input = ({ label, inValid, textInputConfig, style }) => {
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline); //hadi wa3ra
  }
  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: GloablStyles.colors.primary500,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GloablStyles.colors.primary200,
    color: GloablStyles.colors.black,
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inValidLabel: {
    color: GloablStyles.colors.error500,
  },
  inValidInput: {
    backgroundColor: GloablStyles.colors.error50,
  },
});
