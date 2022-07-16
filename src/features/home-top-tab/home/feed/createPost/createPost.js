import { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import {
  AnimatedTextInput,
  Button,
  RoundedContactRowProfile,
  useKeyboardInputHeight,
} from "../../../../../../components/main";
import {
  aic,
  backgroundColor,
  br10,
  bwh,
  colors,
  fontSize,
  fontWeight,
  full,
  fullWidth,
  fw,
  height,
  jcc,
  jcfe,
  jcsb,
  jcse,
  layout,
  margin,
  minHeight,
  padding,
  row,
  squareLayout,
} from "../../../../../../styles";
import { noop } from "lodash";

export default function CreatePost() {
  let KHStyle = useKeyboardInputHeight(-10);
  let galleryViewHeight = useSharedValue(0);
  let locationViewHeight = useSharedValue(0);
  let tiRef = useAnimatedRef();
  let [postText, setPostText] = useState("");
  let [cameraPressed, setCameraPressed] = useState(false);
  let [locationPressed, setLocationPressed] = useState(false);
  let toggleCamera = () => setCameraPressed((c) => !c);
  let toggleLocation = () => setLocationPressed((c) => !c);
  let photosInGallery = [{}, {}, {}, {}];
  let galleryViewStyle = useAnimatedStyle(() => ({
    height: withTiming(galleryViewHeight.value, { duration: 750 }),
  }));
  let locationViewStyle = useAnimatedStyle(() => ({
    height: withTiming(locationViewHeight.value, { duration: 750 }),
  }));
  let blurTI = () => {
    if (!cameraPressed || !locationPressed) tiRef.current.blur();
  };
  return (
    <Animated.View style={[KHStyle]}>
      <Animated.ScrollView style={[backgroundColor(colors.white)]}>
        <Animated.View style={[fw, height(90), row, aic, padding("ht", 20)]}>
          <RoundedContactRowProfile
            size={60}
            source={require("../../../../../../assets/1.jpeg")}
          />
          <Animated.View style={[height(60), jcse, margin("l", 15)]}>
            <Animated.Text style={[fontSize(16), fontWeight("6")]}>
              Cristina
            </Animated.Text>
            <Animated.Text style={[fontSize(12)]}>The Warfield</Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[fullWidth, minHeight(400), padding("", 19)]}>
          <AnimatedTextInput
            ref={tiRef}
            style={[full, fontSize(18)]}
            multiline
            placeholder="Start typing..."
            placeholderTextColor={colors.midBlack}
            value={postText}
            onChangeText={setPostText}
            onFocus={() => {
              setCameraPressed(false);
              setLocationPressed(false);
              galleryViewHeight.value = 0;
              locationViewHeight.value = 0;
            }}
            scrollEnabled={false}
          />
        </Animated.View>
      </Animated.ScrollView>
      <Animated.View style={[fullWidth, minHeight(60), jcfe, padding("h", 19)]}>
        <Animated.View
          style={[fw, galleryViewStyle, jcc]}
          entering={FadeIn.duration(750)}
          exiting={FadeOut.duration(750)}
        >
          {cameraPressed && (
            <Animated.View style={[fw, height(90)]}>
              <Animated.ScrollView
                showsHorizontalScrollIndicator={false}
                style={[fw, height(90)]}
                horizontal
              >
                {photosInGallery.map((photo, i) => (
                  <Button
                    key={i}
                    onPress={noop}
                    parentStyle={[squareLayout(90), br10, bwh, margin("r", 10)]}
                    btnStyle={[br10]}
                  ></Button>
                ))}
              </Animated.ScrollView>
            </Animated.View>
          )}
        </Animated.View>
        <Animated.View style={[fw, height(60), row, aic, jcsb]}>
          <Animated.Text style={[fontSize(19.5)]}>
            Add to your post
          </Animated.Text>
          <Animated.View style={[layout(100, 48), row, aic, jcse]}>
            <Button
              onPress={() => {
                blurTI();
                galleryViewHeight.value = cameraPressed ? 0 : 120;
                setTimeout(toggleCamera, cameraPressed ? 1 : 750);
                setLocationPressed(false);
                locationViewHeight.value = 0;
              }}
              parentStyle={[squareLayout(42), br10]}
              btnStyle={[br10]}
            >
              <Ionicons
                name="ios-camera-outline"
                size={33}
                color={cameraPressed ? colors.normal : colors.black}
              />
            </Button>
            <Button
              onPress={() => {
                blurTI();
                locationViewHeight.value = locationPressed ? 0 : 360;
                setTimeout(toggleLocation, locationPressed ? 1 : 750);
                setCameraPressed(false);
                galleryViewHeight.value = 0;
              }}
              parentStyle={[squareLayout(42), br10]}
              btnStyle={[br10]}
            >
              <Ionicons
                name="ios-location-outline"
                size={33}
                color={locationPressed ? colors.normal : colors.black}
              />
            </Button>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            fw,
            locationViewStyle,
            backgroundColor(colors.white),
            br10,
            margin("b", 5),
          ]}
          entering={FadeIn.duration(750)}
          exiting={FadeOut.duration(750)}
        ></Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
