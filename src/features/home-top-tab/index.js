import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { display } from "../../../styles";
import Camera from "./camera/camera";
import Home from "./home/home";
let TopTab = createMaterialTopTabNavigator();
export default function Index() {
  return (
    <TopTab.Navigator
      screenOptions={{
        // swipeEnabled: false,
        tabBarStyle: [display(true)],
      }}
      initialRouteName="home"
    >
      <TopTab.Screen name="camera" component={Camera} />
      <TopTab.Screen name="home" component={Home} />
    </TopTab.Navigator>
  );
}
