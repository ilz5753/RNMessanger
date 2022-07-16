import { createStackNavigator } from "@react-navigation/stack";
import { AuthHeader } from "../../../../components/main";
import UpEmail from "./email";
import UpPhone from "./phone";
let Stack = createStackNavigator();
export default function SignUp() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (p) => <AuthHeader {...p} />,
        title: "Create new account"
      }}
    >
      <Stack.Screen name="upemail" component={UpEmail} />
      <Stack.Screen name="upphone" component={UpPhone} />
    </Stack.Navigator>
  );
}
