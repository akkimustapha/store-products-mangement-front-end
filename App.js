import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import IconButton from "./components/ui/IconButton";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllProducts from "./screens/AllProducts";
import ManageProduct from "./screens/ManageProducts";
import RecentProducts from "./screens/RecentProducts";
import { GloablStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import ProductsContextProvider from "./store/products-context";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import AllTypesProducts from "./screens/AllTypesProducts";
import FindProduct from "./screens/FindProduct";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProductsOverView = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GloablStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GloablStyles.colors.primary500,
          padding: 4,
          height: 70,
        },
        tabBarActiveTintColor: GloablStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <View style={styles.mainButtons}>
            <IconButton
              icon="add"
              size={32}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageProduct");
              }}
            />
            <IconButton
              icon="exit"
              color={tintColor}
              size={32}
              onPress={authCtx.logout}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="RecentProducts"
        component={RecentProducts}
        options={{
          title: "Recent Products",
          tabBarLabel: "Recent",
          tabBarActiveTintColor: GloablStyles.colors.primary20,
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} color={color} name="hourglass" />
          ),
          tabBarLabelStyle: { paddingBottom: 12 },
          tabBarIconStyle: { marginTop: 6 },
        }}
      />
      <Tab.Screen
        name="AllProducts"
        component={AllProducts}
        options={{
          title: "All Products",
          tabBarLabel: "All",
          tabBarActiveTintColor: GloablStyles.colors.primary20,
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} color={color} name="calendar" />
          ),
          tabBarLabelStyle: { paddingBottom: 12 },
          tabBarIconStyle: { marginTop: 6 },
        }}
      />
      <Tab.Screen
        name="FindProduct"
        component={FindProduct}
        options={{
          title: "Find a Product",
          tabBarLabel: "Search",
          tabBarActiveTintColor: GloablStyles.colors.primary20,
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} color={color} name="search" />
          ),
          tabBarLabelStyle: { paddingBottom: 12 },
          tabBarIconStyle: { marginTop: 6 },
        }}
      />
      <Tab.Screen
        name="Categories"
        component={AllTypesProducts}
        options={{
          title: "Categories",
          tabBarLabel: "categories",
          tabBarActiveTintColor: GloablStyles.colors.primary20,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore1" size={size} color={color} />
          ),
          tabBarLabelStyle: { paddingBottom: 12 },
          tabBarIconStyle: { marginTop: 6 },
        }}
      />
    </Tab.Navigator>
  );
};
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <ProductsContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GloablStyles.colors.primary500 },
          headerTintColor: "white",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={32}
              onPress={authCtx.logout}
            />
          ),
        }}
      >
        <Stack.Screen
          name="ProductsOverView"
          component={ProductsOverView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageProduct"
          component={ManageProduct}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </ProductsContextProvider>
  );
}
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
SplashScreen.preventAutoHideAsync();
function Root() {
  const [isTringLogin, setIsTringLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetcheToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTringLogin(false);
    };
    fetcheToken();
  }, []);

  if (!isTringLogin) {
    SplashScreen.hideAsync();
  }
  return <Navigation />;
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
const styles = StyleSheet.create({
  mainButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
    minWidth: 100,
  },
});
