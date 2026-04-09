import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./components/Header";
import AssetMain from "./components/AssetMain";
import PhotoGalery from "./components/PhotoGalery";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import { GestureHandlerRootView } from "react-native-gesture-handler";


const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Головна"
          screenOptions={({ route, navigation }) => ({
            header: () => <Header activeTitle={route.name} navigation={navigation} />,
          })}
        >
          <Stack.Screen name="Головна" component={AssetMain} />
          <Stack.Screen name="Галерея" component={PhotoGalery} />
          <Stack.Screen name="Профіль" component={Registration} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
