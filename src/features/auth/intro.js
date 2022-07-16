import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { RoundedBtn } from "../../../components/main";
import {
  center,
  color,
  colors,
  fontSize,
  fontWeight,
  full,
  margin,
  padding,
  textAlign,
} from "../../../styles";

export default function Intro() {
  let { navigate } = useNavigation();
  let btns = [
    {
      text: "Login",
      isOutline: false,
      onPress: () => navigate("signin"),
    },
    {
      text: "Sign Up",
      isOutline: true,
      onPress: () => navigate("signup"),
    },
  ];
  return (
    <Animated.View style={[full, center, padding("h", 25)]}>
      <Animated.Text
        style={[color(colors.normal), fontSize(72), fontWeight("b")]}
      >
        C
      </Animated.Text>
      <Animated.Text
        style={[color(colors.normal), fontSize(30), margin("t", 30)]}
      >
        Welcome to your app
      </Animated.Text>
      <Animated.Text style={[fontSize(21), margin("v", 18), textAlign("c")]}>
        Welcome to your app. Build your own social network in minute.
      </Animated.Text>
      {btns.map((btn, i) => (
        <Animated.View key={i} style={[margin("t", 24)]}>
          <RoundedBtn
            width={300}
            height={60}
            bgColor={colors.normal}
            Color={colors.white}
            {...btn}
          />
        </Animated.View>
      ))}
    </Animated.View>
  );
}
