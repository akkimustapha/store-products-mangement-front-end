import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { AuthContext } from "../store/auth-context";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const [defVs, setdefVs] = useState({});
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const data = await login(email, password);
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
    return <LoadingOverlay message="Login user..." />;
  }
  return (
    <AuthContent isLogin onAuthenticate={loginHandler} defaultValues={defVs} />
  );
}
export default LoginScreen;
