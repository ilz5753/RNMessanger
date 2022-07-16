import { createStackNavigator } from "@react-navigation/stack";
import { AuthHeader } from "../../../components/main";
import Intro from "./intro";
import ResetPassword from "./resetPassword";
import SignIn from "./signin/signin";
import SignUp from "./signup/signup";
import Verification from "./verification";
let Stack = createStackNavigator();
export default function Auth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="intro" component={Intro} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen
        name="resetpw"
        component={ResetPassword}
        options={{
          headerShown: true,
          title: "Reset Password",
          header: (p) => <AuthHeader {...p} />,
        }}
      />
      <Stack.Screen
        name="verification"
        component={Verification}
        options={{
          headerShown: true,
          header: (p) => <AuthHeader {...p} />,
        }}
      />
    </Stack.Navigator>
  );
}
