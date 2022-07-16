import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Animated from "react-native-reanimated";
import { AnimatedActivityIndicator } from "../../../components/main";
import { center, color, colors, fontSize, full, margin } from "../../../styles";

export default function Splash() {
  let { navigate } = useNavigation();
  useEffect(() => {
    setTimeout(() => navigate("onBoarding"), 2000);
  }, []);
  return (
    <Animated.View style={[full, center]}>
      <AnimatedActivityIndicator size="large" color={colors.normal} />
      <Animated.Text
        style={[fontSize(22.5), margin("t", 20), color(colors.normal)]}
      >
        Loading...
      </Animated.Text>
    </Animated.View>
  );
}
