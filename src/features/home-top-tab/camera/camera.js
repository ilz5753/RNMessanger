import {
  aic,
  backgroundColor,
  borderRadius,
  br10,
  center,
  colors,
  full,
  fw,
  height,
  jcsb,
  jcse,
  padding,
  row,
  squareLayout,
} from "../../../../styles";
import { Camera as ECamera } from "expo-camera";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedTouchableOpacity } from "../../../../components/main";
import { noop } from "lodash";
let CameraRow = ({ actions = [] }) => {
  return (
    <Animated.View style={[fw, height(60), row, aic, jcse, br10]}>
      {actions.map((action, i) => (
        <AnimatedTouchableOpacity
          key={i}
          style={[squareLayout(action?.isLarge ? 54 : 48), br10, center]}
          onPress={action?.onPress}
          activeOpacity={0.72}
        >
          {action?.children}
        </AnimatedTouchableOpacity>
      ))}
    </Animated.View>
  );
};
export default function Camera() {
  let insets = useSafeAreaInsets();
  let topActions = [];
  let bottomActions = [
    {
      onPress: noop,
    },
    {
      onPress: noop,
      children: (
        <Animated.View
          style={[
            squareLayout(56),
            borderRadius("", 28),
            backgroundColor(colors.white),
          ]}
        />
      ),
    },
    {
      onPress: noop,
    },
  ];
  return (
    <ECamera style={[full, padding("v", insets.top), jcsb]}>
      <CameraRow actions={topActions} />
      <CameraRow actions={bottomActions} />
    </ECamera>
  );
}
