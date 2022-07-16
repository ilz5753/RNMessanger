import { useNavigation } from "@react-navigation/native";
import { isEqual, noop } from "lodash";
import Animated from "react-native-reanimated";
import {
  AnimatedTouchableOpacity,
  MarginedTopSection,
} from "../../../../../../components/main";
import {
  backgroundColor,
  borderColor,
  borderWidth,
  br10,
  center,
  color,
  colors,
  f1,
  fontSize,
  fw,
  height,
  margin,
} from "../../../../../../styles";

export default function Settings() {
  let { navigate } = useNavigation();
  let settingActions = [
    {
      title: "Account Details",
      onPress: () => navigate("accountDetails"),
    },
    {
      title: "Settings",
      onPress: noop,
    },
    {
      title: "Log out",
      onPress: () => navigate("auth"),
    },
  ];
  return (
    <Animated.ScrollView>
      <MarginedTopSection
        {...{
          header: {
            title: "GENERAL",
          },
          size: 30,
        }}
      >
        <Animated.View
          style={[margin("", 10), backgroundColor(colors.white), br10]}
        >
          {settingActions.map((action, i) => (
            <Animated.View key={i} style={[fw, height(60)]}>
              <AnimatedTouchableOpacity
                style={[f1, center]}
                activeOpacity={0.75}
                onPress={action.onPress}
              >
                <Animated.Text style={[color(colors.normal), fontSize(18)]}>
                  {action.title}
                </Animated.Text>
              </AnimatedTouchableOpacity>
              {!isEqual(i, settingActions.length - 1) && (
                <Animated.View
                  style={[
                    fw,
                    height(1),
                    borderWidth("t", 0.5),
                    borderColor("t", colors.lightBlack),
                  ]}
                />
              )}
            </Animated.View>
          ))}
        </Animated.View>
      </MarginedTopSection>
    </Animated.ScrollView>
  );
}
