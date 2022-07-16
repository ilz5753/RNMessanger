import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import {
  AnimatedTextInput,
  Button,
  MoreModal,
  Post,
  useKeyboardInputHeight,
} from "../../../components/main";
import {
  aic,
  backgroundColor,
  bottom,
  br10,
  colors,
  fontSize,
  full,
  fullWidth,
  height,
  jcse,
  margin,
  overlay,
  padding,
  row,
  squareLayout,
  width,
} from "../../../styles";
import { useEffect, useState } from "react";
import { isEmpty, noop } from "lodash";

export default function PostDetail() {
  let { setOptions } = useNavigation();
  let { params } = useRoute();
  let [comment, setComment] = useState("");
  let KHStyle = useKeyboardInputHeight(14);
  let [showMoreActions, setShowMoreActions] = useState(false);
  let toggleShowActions = () => setShowMoreActions((s) => !s);
  let actions = [
    {
      text: "Block",
      onPress: noop,
    },
    {
      text: "Report post",
      onPress: noop,
    },
    {
      text: "Share",
      onPress: noop,
    },
  ];
  useEffect(() => {
    setOptions({
      headerLeft: (p) => (
        <HeaderBackButton
          {...{
            ...p,
            label: params?.from,
          }}
        />
      ),
    });
  }, []);
  return (
    <Animated.View style={[fullWidth, KHStyle]}>
      <Animated.ScrollView style={[margin("b", 55)]}>
        <Post {...params?.post} showComments moreClick={toggleShowActions} />
      </Animated.ScrollView>
      <Animated.View
        style={[
          fullWidth,
          height(54),
          overlay,
          bottom(30),
          backgroundColor(colors.white),
          row,
          aic,
          jcse,
        ]}
      >
        <Animated.View style={[width(360), height(48), br10, padding("v", 10)]}>
          <AnimatedTextInput
            style={[full, br10, fontSize(20), padding("h", 6)]}
            value={comment}
            onChangeText={setComment}
            placeholder="Add Comment to this post"
            placeholderTextColor={colors.midBlack}
          />
        </Animated.View>
        <Button
          parentStyle={[squareLayout(42), br10]}
          btnStyle={[br10]}
          disabled={isEmpty(comment)}
          onPress={noop}
        >
          <Ionicons
            name="ios-send"
            size={30}
            color={isEmpty(comment) ? colors.midBlack : colors.normal}
          />
        </Button>
      </Animated.View>
      <Animated.View
        style={[fullWidth, height(30), backgroundColor(colors.white)]}
      />
      <MoreModal
        {...{
          show: showMoreActions,
          hide: toggleShowActions,
          actions,
        }}
      />
    </Animated.View>
  );
}
