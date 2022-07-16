import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import {
  AuthInput,
  AuthTemplate,
  SignUpImageProfileButton,
} from "../../../../components/main";
import { aic, fullWidth, height, jcse } from "../../../../styles";

export default function UpEmail() {
  let { navigate } = useNavigation();
  return (
    <AuthTemplate
      verify={{
        text: "Sign Up",
        onPress: () => navigate("home_top_tab"),
      }}
      or
      orHeight={80}
      otherMethode={{
        text: "Sign up with phone number",
        onPress: () => navigate("upphone"),
      }}
    >
      <SignUpImageProfileButton />
      <Animated.View style={[fullWidth, height(360), aic, jcse]}>
        <AuthInput placeholder="First name" />
        <AuthInput placeholder="Last name" />
        <AuthInput placeholder="E-mail address" keyboardType="email-address" />
        <AuthInput placeholder="Password" secureTextEntry />
        <AuthInput placeholder="Repeat Password" secureTextEntry />
      </Animated.View>
    </AuthTemplate>
  );
}
