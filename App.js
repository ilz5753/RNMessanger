import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SM from "./src/sm";
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SM />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
