import { useNavigation } from "@react-navigation/native";
import { noop } from "lodash";
import Animated from "react-native-reanimated";
import { AuthInput, AuthTemplate, TextBtn } from "../../../../components/main";
import {
  aic,
  AuthInputLayout,
  colors,
  fw,
  jcfe,
  margin,
  padding,
  row,
} from "../../../../styles";

export default function InEmail() {
  let { navigate } = useNavigation();
  return (
    <AuthTemplate
      verify={{
        text: "Log in",
        onPress: () => navigate("home_top_tab"),
      }}
      or
      facebook={{
        text: "Login with Facebook",
        onPress: noop,
      }}
      apple={{
        text: "Sign in with Apple",
        onPress: noop,
      }}
      otherMethode={{
        text: "Sign in with phone number",
        onPress: () => navigate("inphone"),
      }}
    >
      <Animated.View style={[margin("b", 20)]}>
        <AuthInput
          placeholder="E-mail"
          placeholderTextColor={colors.midBlack}
        />
      </Animated.View>
      <AuthInput
        placeholder="Password"
        placeholderTextColor={colors.midBlack}
      />
      <Animated.View style={[AuthInputLayout]}>
        <TextBtn
          parentStyle={[fw, padding("", 10), row, jcfe, aic]}
          text="Forgot Password?"
          onPress={() => navigate("resetpw")}
        />
      </Animated.View>
    </AuthTemplate>
  );
}
