import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { creatUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert, ScrollView } from "react-native";
import { AuthContext } from "../store/auth-context";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const [defVs, setdefVs] = useState({});
  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const data = await creatUser(email, password);
      authCtx.authenticate(data.token);
    } catch (e) {
      Alert.alert(
        "Authentication Failed",
        "Could not logged you in please check your Credentials!"
      );
      const lr = {
        email: email,
        confirmEmail: "",
        password: password,
        confirmPassword: "",
      };
      setdefVs((prev) => Object.assign(prev, lr));
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return (
    <ScrollView>
      <AuthContent onAuthenticate={signupHandler} defaultValues={defVs} />
    </ScrollView>
  );
}

export default SignupScreen;
