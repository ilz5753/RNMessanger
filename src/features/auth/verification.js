import { useNavigation, useRoute } from "@react-navigation/native";
import { isEqual, noop } from "lodash";
import { useEffect } from "react";
import Animated from "react-native-reanimated";
import { AuthTemplate } from "../../../components/main";
import {
  AuthInputLayout,
  borderColor,
  borderRadius,
  bwh,
  colors,
  row,
} from "../../../styles";

export default function Verification() {
  let { navigate, setOptions } = useNavigation();
  let { params } = useRoute();
  useEffect(() => {
    setOptions({
      title: isEqual(params?.signType, "in") ? "Sign In" : "Create new account",
    });
  }, []);
  return (
    <AuthTemplate
      or
      facebook={{
        text: "Login with Facebook",
        onPress: noop,
      }}
      otherMethode={{
        text: `Sign ${params?.signType} with E-mail`,
        onPress: () => navigate(`${params?.signType}email`),
        marginTop: 20,
      }}
    >
      <Animated.View
        style={[
          AuthInputLayout,
          bwh,
          borderColor("", colors.lightBlack),
          borderRadius("", 24),
          row,
        ]}
      ></Animated.View>
    </AuthTemplate>
  );
}
