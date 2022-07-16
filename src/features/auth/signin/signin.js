import { createStackNavigator } from "@react-navigation/stack";
import { AuthHeader } from "../../../../components/main";
import InEmail from "./email";
import InPhone from "./phone";
let Stack = createStackNavigator();
export default function SignIn() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (p) => <AuthHeader {...p} />,
        title: "Sign In",
      }}
    >
      <Stack.Screen name="inemail" component={InEmail} />
      <Stack.Screen name="inphone" component={InPhone} />
    </Stack.Navigator>
  );
}
