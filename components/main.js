import { StackHeaderProps, Header } from "@react-navigation/stack";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Modal,
  Keyboard,
} from "react-native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { chunk, isEmpty, isEqual, isNull, noop } from "lodash";
import { useEffect, useState } from "react";
import {
  aic,
  AuthInputLayout,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  bottom,
  br10,
  bwh,
  center,
  color,
  colors,
  dim,
  f1,
  fh,
  fontSize,
  fontWeight,
  full,
  fullWidth,
  fw,
  height,
  jcc,
  jcfe,
  jcfs,
  jcsb,
  jcse,
  layout,
  margin,
  maxWidth,
  minHeight,
  minWidth,
  overlay,
  padding,
  pos,
  right,
  root,
  row,
  squareLayout,
  textAlign,
  thuc,
  top,
  width,
} from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Countries } from "./countries";
import { TimeFormater } from "../utils/functions";
let CAC = Animated.createAnimatedComponent;
export let AnimatedTouchableOpacity = CAC(TouchableOpacity);
export let AnimatedTouchableHighlight = CAC(TouchableHighlight);
export let AnimatedActivityIndicator = CAC(ActivityIndicator);
export let AnimatedTextInput = CAC(TextInput);
export let AnimatedIonicons = CAC(Ionicons);
export let AnimatedEntypo = CAC(Entypo);
export let AnimatedVideo = CAC(Video);
export let Button = ({
  parentStyle,
  btnStyle,
  onPress,
  onLongPress,
  disabled = false,
  disabledOverlay = false,
  children,
}) => {
  return (
    <Animated.View style={[parentStyle]}>
      <AnimatedTouchableHighlight
        underlayColor={thuc}
        activeOpacity={0.75}
        style={[f1, center, btnStyle]}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
      >
        <>{children}</>
      </AnimatedTouchableHighlight>
      {disabled && disabledOverlay && (
        <Animated.View style={[parentStyle, overlay, backgroundColor(thuc)]} />
      )}
    </Animated.View>
  );
};
export let EmptyView = () => <></>;
export let Pager = ({ list, goToAppFunc, goToAppText }) => {
  let listLength = list.length;
  let [activeIndex, setActiveIndex] = useState(0);
  let onScroll = useAnimatedScrollHandler(({ contentOffset: { x } }) => {
    let i = Math.floor(x / dim.width);
    if (i >= 0 && i < listLength) runOnJS(setActiveIndex)(i);
  });
  return (
    <>
      <Animated.ScrollView
        onScroll={onScroll}
        style={[backgroundColor(colors.normal)]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{
          width: listLength * dim.width,
          height: dim.height,
        }}
      >
        {list.map((item, i) => (
          <Animated.View style={[root, center]} key={i}>
            <Animated.View style={[squareLayout(80), bottom(50), center]}>
              {item?.icon?.Provider && (
                <item.icon.Provider
                  name={item?.icon?.name}
                  size={80}
                  color={colors.white}
                />
              )}
            </Animated.View>
            <Animated.Text
              style={[margin("b", 40), fontSize(20), color(colors.white)]}
            >
              {item.title}
            </Animated.Text>
            <Animated.Text style={[fontSize(15), color(colors.white)]}>
              {item.description}
            </Animated.Text>
            {isEqual(i, listLength - 1) && (
              <Button
                parentStyle={[
                  layout(200, 60),
                  br10,
                  backgroundColor(colors.white),
                  overlay,
                  bottom(200),
                ]}
                btnStyle={[br10]}
                onPress={goToAppFunc}
              >
                <Animated.Text style={[color(colors.normal), fontSize(20)]}>
                  {goToAppText}
                </Animated.Text>
              </Button>
            )}
          </Animated.View>
        ))}
      </Animated.ScrollView>
      <Animated.View style={[fw, overlay, aic, bottom(100)]}>
        <Dots length={listLength} activeIndex={activeIndex} />
      </Animated.View>
    </>
  );
};
export let AssetView = ({ layout, isVideo, source }) => {
  let ref = useAnimatedRef();
  let [isPlaying, setIsPlaying] = useState(false);
  let [showPlayBtn, setShowPlayBtn] = useState(false);
  let play = async () => {
    await ref.current.playAsync();
    setIsPlaying(true);
  };
  let pause = async () => {
    await ref.current.pauseAsync();
    setIsPlaying(false);
  };
  let toggleShowPlaying = () => setShowPlayBtn((s) => !s);
  return (
    <Animated.View style={[layout]}>
      {isVideo ? (
        <>
          <Video
            source={source}
            ref={ref}
            style={[full]}
            resizeMode="contain"
          />
          <AnimatedTouchableOpacity
            activeOpacity={1}
            onPress={toggleShowPlaying}
            style={[full, overlay, center]}
          >
            {showPlayBtn && (
              <AnimatedTouchableOpacity
                style={[
                  squareLayout(42),
                  borderRadius("", 21),
                  backgroundColor(thuc),
                  center,
                ]}
                activeOpacity={1}
                entering={FadeIn}
                exiting={FadeOut}
                onPress={isPlaying ? pause : play}
              >
                {
                  <Entypo
                    name={`controller-${isPlaying ? "paus" : "play"}`}
                    size={30}
                    color={colors.whiteLike}
                  />
                }
              </AnimatedTouchableOpacity>
            )}
          </AnimatedTouchableOpacity>
        </>
      ) : (
        <Animated.Image source={source} style={[full]} resizeMode="contain" />
      )}
    </Animated.View>
  );
};
export let PostAssetPager = ({ list = [], w = 1, h = 1 }) => {
  let listLength = list.length;
  let [activeIndex, setActiveIndex] = useState(0);
  let onScroll = useAnimatedScrollHandler(({ contentOffset: { x } }) => {
    let i = Math.floor(x / w);
    if (i >= 0 && i < listLength) runOnJS(setActiveIndex)(i);
  });
  let l = layout(w, h);
  return (
    <Animated.View style={[l]}>
      <Animated.ScrollView
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{
          width: listLength * w,
          height: h,
        }}
      >
        {list.map((item, i) => (
          <AssetView key={i} layout={l} {...item} />
        ))}
      </Animated.ScrollView>
      {!isEqual(1, listLength) && (
        <Animated.View style={[fw, overlay, aic, bottom(0)]}>
          <Animated.View style={[backgroundColor(thuc), padding("v", 5), br10]}>
            <Dots length={listLength} activeIndex={activeIndex} />
          </Animated.View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export let Dots = ({
  bg = { r: "255", g: "255", b: "255" },
  length = 4,
  activeIndex = 0,
  size = 6,
}) => {
  return (
    <Animated.View style={[row, aic, jcse]}>
      {Array(length)
        .fill()
        .map((_, i) => (
          <Animated.View
            key={i}
            style={[
              squareLayout(size),
              borderRadius("", size / 2),
              margin("h", 8),
              backgroundColor(
                `rgba(${bg.r}, ${bg.g}, ${bg.b}, ${
                  isEqual(activeIndex, i) ? 1 : 0.3
                })`,
              ),
            ]}
          />
        ))}
    </Animated.View>
  );
};

export let RoundedBtn = ({
  width,
  height,
  isOutline = false,
  bgColor,
  Color,
  text,
  onPress,
}) => {
  let br = borderRadius("", height / 2);
  return (
    <Button
      parentStyle={[
        layout(width, height),
        br,
        isOutline
          ? [borderColor("", bgColor), borderWidth("", 0.75)]
          : backgroundColor(bgColor),
      ]}
      btnStyle={[br]}
      onPress={onPress}
    >
      <Animated.Text style={[fontSize(17), color(isOutline ? bgColor : Color)]}>
        {text}
      </Animated.Text>
    </Button>
  );
};

export let TextBtn = ({ parentStyle, btnStyle, text, onPress }) => (
  <Animated.View style={[parentStyle]}>
    <Animated.Text
      style={[color(colors.normal), fontSize(18), btnStyle]}
      onPress={onPress}
    >
      {text}
    </Animated.Text>
  </Animated.View>
);

export let AuthHeader = (p) => {
  let insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={[fullWidth, height(insets.top + 80), padding("t", insets.top)]}
    >
      <Animated.View style={[fullWidth, height(36), padding("h", 19), jcc]}>
        <Button
          parentStyle={[squareLayout(30), br10]}
          btnStyle={[br10]}
          onPress={p.navigation.goBack}
        >
          <AntDesign name="arrowleft" color={colors.normal} size={24} />
        </Button>
      </Animated.View>
      <Animated.View style={[fullWidth, height(44), padding("l", 32), jcfe]}>
        <Animated.Text
          style={[fontSize(30), fontWeight("b"), color(colors.normal)]}
        >
          {p.options.title}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export let AuthInput = ({ countrySelection, setText, text, ...props }) => {
  let [value, setValue] = useState(text ?? "");
  /**
   *
   * @param {string} text
   */
  let onChangeText = (text) => {
    setValue(text);
    if (setText) setText(text);
  };
  let br = borderRadius("", 24);
  let bc = borderColor("", colors.lightBlack);
  let brl = borderRadius("l", 24);
  return (
    <Animated.View style={[AuthInputLayout, row, aic, br, bwh, bc]}>
      {countrySelection && (
        <Animated.View
          style={[squareLayout(48), brl, borderWidth("r", 1), bc, center]}
        >
          <Button
            parentStyle={[squareLayout(33), brl]}
            onPress={countrySelection.onPress}
            btnStyle={[brl]}
          >
            <Animated.Image
              source={countrySelection.source}
              style={[full, brl]}
            />
          </Button>
        </Animated.View>
      )}
      <AnimatedTextInput
        style={[
          f1,
          fh,
          padding("h", 25),
          fontSize(18),
          borderRadius(countrySelection ? "r" : "", 24),
        ]}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </Animated.View>
  );
};

export let AuthTemplate = ({
  verify,
  or,
  orHeight = 120,
  facebook,
  apple,
  otherMethode,
  children,
}) => {
  let insets = useSafeAreaInsets();
  let KHStyle = useKeyboardInputHeight(insets.top + 80);
  return (
    <Animated.View style={[KHStyle, aic, margin("t", 40)]}>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        {children}
        <Animated.View style={[aic]}>
          {verify && (
            <Animated.View style={[margin("t", 30)]}>
              <RoundedBtn
                width={300}
                height={39}
                text={verify.text}
                bgColor={colors.normal}
                Color={colors.white}
                onPress={verify.onPress}
              />
            </Animated.View>
          )}
          {or && (
            <>
              <Animated.View style={[layout(360, orHeight), center]}>
                <Animated.Text style={[fontSize(16)]}>OR</Animated.Text>
              </Animated.View>
              {facebook && (
                <RoundedBtn
                  width={300}
                  height={39}
                  text={facebook.text}
                  bgColor={colors.blue}
                  Color={colors.white}
                  onPress={facebook.onPress}
                />
              )}
              {apple && (
                <Animated.View style={[margin("v", 20)]}>
                  <RoundedBtn
                    width={300}
                    height={39}
                    text={apple.text}
                    bgColor={colors.black}
                    Color={colors.white}
                    onPress={apple.onPress}
                  />
                </Animated.View>
              )}
            </>
          )}
          {otherMethode && (
            <TextBtn
              parentStyle={[margin("t", otherMethode.marginTop)]}
              text={otherMethode.text}
              onPress={otherMethode.onPress}
            />
          )}
        </Animated.View>
      </Animated.ScrollView>
    </Animated.View>
  );
};
export let CountrySelectionModal = ({ show, hide, SelectCountry }) => {
  return (
    <Modal visible={show} onRequestClose={hide} transparent>
      <AnimatedTouchableOpacity
        style={[full, backgroundColor(thuc), center]}
        activeOpacity={1}
        onPress={hide}
        entering={FadeIn.duration(500)}
        exiting={FadeIn.duration(250)}
      >
        <AnimatedTouchableOpacity onPress={noop} activeOpacity={1}>
          <Animated.View
            style={[
              width(360),
              height(420),
              margin("b", 10),
              br10,
              backgroundColor(colors.white),
            ]}
          >
            <Animated.ScrollView>
              {Countries.map((country, i) => (
                <Animated.View key={i} style={[margin("b", 5)]}>
                  <Button
                    onPress={() => {
                      SelectCountry(country);
                      hide();
                    }}
                    parentStyle={[AuthInputLayout, br10, padding("h", 4)]}
                    btnStyle={[br10, row, jcsb, padding("h", 10)]}
                  >
                    <Animated.Text style={[fontSize(18)]}>
                      {country.name}
                    </Animated.Text>
                    <Animated.Text style={[fontSize(18)]}>
                      +{country.code}
                    </Animated.Text>
                  </Button>
                  {!isEqual(i, Countries.length) && (
                    <Animated.View
                      style={[
                        fullWidth,
                        height(0.5),
                        backgroundColor(colors.lightBlack),
                        margin("t", 5),
                      ]}
                    />
                  )}
                </Animated.View>
              ))}
            </Animated.ScrollView>
          </Animated.View>
          <AnimatedTouchableOpacity
            onPress={hide}
            activeOpacity={0.9}
            style={[
              AuthInputLayout,
              br10,
              backgroundColor(colors.white),
              center,
            ]}
          >
            <Animated.Text style={[fontSize(18), color(colors.error)]}>
              Cancel
            </Animated.Text>
          </AnimatedTouchableOpacity>
        </AnimatedTouchableOpacity>
      </AnimatedTouchableOpacity>
    </Modal>
  );
};

export let SignUpImageProfileButton = ({ defaultUri, updateUri }) => {
  let [uri, setUri] = useState(defaultUri ?? "");
  /**
   * border radius of image view
   */
  let brIv = borderRadius("", 60);
  /**
   * border radius of image button selector
   */
  let brIbs = borderRadius("", 60);
  let selectImage = async () => {
    try {
      let ip = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!ip.cancelled) setUri(ip.uri);
      if (updateUri) updateUri(ip.uri);
    } catch (e) {
      console.log("Error while choosing photo...");
    }
  };
  let ieu = isEmpty(uri);
  return (
    <Animated.View style={[fullWidth, height(130), center]}>
      <Animated.View style={[squareLayout(120), brIv, ieu && bwh]}>
        <Animated.Image source={ieu ? null : { uri }} style={[full, brIv]} />
        <Button
          parentStyle={[
            overlay,
            squareLayout(40),
            brIbs,
            backgroundColor(colors.lightBlack),
            bottom(0),
            right(0),
          ]}
          btnStyle={[brIbs]}
          onPress={selectImage}
        >
          <Ionicons name="camera" color={colors.white} size={30} />
        </Button>
      </Animated.View>
    </Animated.View>
  );
};
export let ProfileImage = ({
  size = 80,
  isViewedStory = null,
  name,
  source,
  onPress = noop,
}) => {
  /**
   * Half size
   */
  let HSize = size / 2;
  let brHSize = borderRadius("", HSize);
  let br2 = borderRadius("", HSize - 4);
  let br3 = borderRadius("", HSize - 8);
  let nullName = isNull(name);
  return (
    <Animated.View
      style={[maxWidth(2 * size), height(size * (nullName ? 1.5 : 1.75))]}
    >
      <Button
        parentStyle={[
          squareLayout(size),
          brHSize,
          !isNull(isViewedStory) &&
            backgroundColor(isViewedStory ? colors.midBlack : colors.normal),
          margin("", 15),
        ]}
        btnStyle={[brHSize, nullName && jcfs]}
        onPress={onPress}
      >
        <Animated.View
          style={[
            squareLayout(size - 8),
            br2,
            backgroundColor(colors.white),
            center,
          ]}
        >
          <Animated.Image
            source={source}
            style={[squareLayout(size - 16), br3]}
          />
        </Animated.View>
      </Button>
      {!nullName && (
        <Animated.Text
          style={[textAlign("c"), fontSize(15), color(colors.midBlack)]}
        >
          {name}
        </Animated.Text>
      )}
    </Animated.View>
  );
};
export let StoryLine = ({ stories = [], size, onStoryPressed = noop }) => {
  return (
    <Animated.View style={[fullWidth, padding("h", 10), br10]}>
      <Animated.ScrollView
        horizontal
        style={[backgroundColor(colors.white), br10]}
        showsHorizontalScrollIndicator={false}
      >
        {stories.map((story, i) => (
          <ProfileImage
            key={i}
            {...story}
            size={size}
            onPress={() => onStoryPressed(story)}
          />
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};

export let Comment = ({ author, text }) => {
  return (
    <Animated.View style={[fw, padding("v", 12), row]}>
      <ProfileImage size={60} />
      <Animated.View
        style={[
          width(280),
          br10,
          padding("", 12),
          backgroundColor(colors.whiteLike),
          jcse,
        ]}
      >
        <Animated.Text style={[fontSize(17), fontWeight("5")]}>
          {author}
        </Animated.Text>
        <Animated.Text style={[fontSize(15)]}>{text}</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export let CommentWrapper = ({ comments = [] }) => {
  return comments.map((comment, i) => (
    <Comment
      {...{
        key: i,
        ...comment,
      }}
    />
  ));
};

export let ReactionWrapper = ({ reactions = [], setReaction }) => {
  let rl = reactions.length;
  let br = borderRadius("", 24);
  return (
    <Animated.View
      key="Reactions"
      style={[
        layout(rl * 48, 48),
        br,
        overlay,
        bottom(5),
        row,
        backgroundColor(colors.white),
      ]}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
    >
      {reactions.map((reaction, i) => (
        <Button
          key={i}
          parentStyle={[squareLayout(48), br]}
          btnStyle={[br]}
          onPress={() => setReaction(reaction)}
        >
          <Animated.Text style={[fontSize(27)]}>{reaction}</Animated.Text>
        </Button>
      ))}
    </Animated.View>
  );
};

export let Post = ({
  author,
  shortDesc,
  description,
  source,
  time = new Date().getTime(),
  assets = [],
  comments = [],
  goToPostDetail = noop,
  moreClick = noop,
  showComments = false,
}) => {
  let reactions = ["👍", "♥️", "😄", "😮", "😢", "😡"];
  let [showReactions, setShowReactions] = useState(false);
  let [isReactioned, setIsReactioned] = useState(false);
  let [selectedReaction, setSelectedReaction] = useState(reactions[0]);
  let datetime = new Date(time);
  let toggleReactionVisibility = () => setShowReactions((s) => !s);
  let toggleReaction = () => setIsReactioned((s) => !s);
  return (
    <Animated.View style={[fullWidth, padding("h", 10), padding("v", 5)]}>
      <Animated.View style={[fw, backgroundColor(colors.white), br10]}>
        <Animated.View style={[fw, height(140), row, padding("v", 10)]}>
          <Animated.View style={[center, margin("h", 20)]}>
            <RoundedContactRowProfile size={70} source={source} />
          </Animated.View>
          <Animated.View style={[width(250), padding("v", 18), jcse]}>
            <Animated.Text style={[fontSize(19), fontWeight("7")]}>
              {author}
            </Animated.Text>
            <Animated.Text
              style={[fontSize(15), fontWeight("4"), color(colors.midBlack)]}
            >
              {shortDesc} • {datetime.toDateString()}
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[aic, padding("t", 7.5)]}>
            <Button
              parentStyle={[squareLayout(36), br10]}
              btnStyle={[br10]}
              onPress={moreClick}
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={27}
                color={colors.midBlack}
              />
            </Button>
          </Animated.View>
        </Animated.View>
        <Animated.View key="description" style={[padding("hb", 14)]}>
          <Animated.Text style={[fontSize(16)]}>{description}</Animated.Text>
        </Animated.View>
        <Animated.View
          key="assets"
          style={[fw, margin("v", 7), height(300), aic]}
        >
          <PostAssetPager list={assets} w={dim.width - 20} h={300} />
          {showReactions && (
            <ReactionWrapper
              {...{
                reactions,
                setReaction: (reaction) => {
                  setSelectedReaction(reaction);
                  toggleReactionVisibility();
                },
              }}
            />
          )}
        </Animated.View>
        <Animated.View
          key="reactions and comments buttons"
          style={[fw, height(50), row, aic]}
        >
          <Button
            parentStyle={[squareLayout(42), br10, margin("h", 20)]}
            btnStyle={[br10]}
            onPress={toggleReaction}
            onLongPress={toggleReactionVisibility}
          >
            <Animated.Text style={[fontSize(24)]}>
              {selectedReaction}
            </Animated.Text>
          </Button>
          {!showComments && (
            <Button
              parentStyle={[minWidth(60), height(42), br10]}
              btnStyle={[br10, row, jcse]}
              onPress={goToPostDetail}
            >
              <Ionicons name="chatbubble-outline" size={30} />
              <Animated.Text>{comments.length}</Animated.Text>
            </Button>
          )}
        </Animated.View>
        {showComments && (
          <CommentWrapper
            {...{
              key: "Comments",
              comments,
            }}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export let PostsWrapper = ({
  goToPostDetail = noop,
  posts = [],
  moreClick = noop,
}) =>
  posts.map((post, i) => (
    <Post
      {...{
        key: i,
        goToPostDetail: () => goToPostDetail(post),
        moreClick: () => moreClick(post),
        ...post,
      }}
    />
  ));

export let useKeyboardInputHeight = (diff = 0) => {
  let Height = useSharedValue("100%");
  let style = useAnimatedStyle(() => ({
    height: Height.value,
  }));
  let kdsEvent = pos.isAndroid ? "keyboardDidShow" : "keyboardWillShow";
  let kdhEvent = pos.isAndroid ? "keyboardDidHide" : "keyboardWillHide";
  useEffect(() => {
    let kds = Keyboard.addListener(
      kdsEvent,
      ({ endCoordinates: { height }, duration }) => {
        let divide = Math.floor((height / dim.height) * 100);
        let diffDivide = Math.floor((diff / dim.height) * 100);
        let nh = 100 - divide - diffDivide;
        Height.value = withTiming(`${nh}%`, {
          duration,
        });
      },
    );
    let kdh = Keyboard.addListener(kdhEvent, ({ duration }) => {
      Height.value = withTiming(`100%`, { duration });
    });
    return () => {
      kds.remove();
      kdh.remove();
    };
  }, []);
  return style;
};

export let MoreModal = ({ show = false, hide = noop, actions = [] }) => {
  return (
    <Modal visible={show} onRequestClose={hide} transparent>
      <AnimatedTouchableOpacity
        onPress={hide}
        entering={FadeIn.duration(500)}
        activeOpacity={1}
        style={[
          full,
          overlay,
          backgroundColor(thuc),
          jcfe,
          padding("h", 14),
          padding("v", 36),
        ]}
      >
        <Animated.View entering={SlideInDown.duration(1000)}>
          <AnimatedTouchableOpacity
            style={[fw, br10, backgroundColor(colors.white)]}
            onPress={noop}
            activeOpacity={1}
          >
            <Animated.View style={[fw, height(42), center]}>
              <Animated.Text style={[fontSize(15), color(colors.midBlack)]}>
                MORE
              </Animated.Text>
            </Animated.View>
            {actions.map((action, i) => (
              <Animated.View key={i} style={[margin("v", 5)]}>
                <Animated.View
                  style={[
                    fw,
                    height(2),
                    borderWidth("t", 0.5),
                    borderColor("t", colors.midBlack),
                    margin("b", 5),
                  ]}
                />
                <AnimatedTouchableOpacity
                  onPress={() => {
                    action?.onPress();
                    hide();
                  }}
                  style={[fw, height(60), br10, padding("h", 5), center]}
                  activeOpacity={0.675}
                >
                  <Animated.Text
                    style={[
                      fontSize(20),
                      color(action?.isDelete ? colors.error : colors.normal),
                    ]}
                  >
                    {action?.text}
                  </Animated.Text>
                </AnimatedTouchableOpacity>
              </Animated.View>
            ))}
          </AnimatedTouchableOpacity>
          <Animated.View
            style={[
              fw,
              height(60),
              backgroundColor(colors.white),
              br10,
              margin("t", 15),
              padding("", 5),
            ]}
          >
            <AnimatedTouchableOpacity
              onPress={hide}
              style={[full, center, br10]}
              activeOpacity={0.675}
            >
              <Animated.Text
                style={[fontSize(22.5), color(colors.normal), fontWeight("5")]}
              >
                Cancel
              </Animated.Text>
            </AnimatedTouchableOpacity>
          </Animated.View>
        </Animated.View>
      </AnimatedTouchableOpacity>
    </Modal>
  );
};

export let HeaderBtn = ({
  isBack = false,
  onPress,
  Icon,
  isRight = false,
  text = null,
}) => {
  let Ic = isBack ? Entypo : Icon?.Provider;
  let IcName = isBack ? "chevron-left" : Icon?.name;
  return (
    <Button
      parentStyle={[
        layout(isBack || text ? 75 : 36, 36),
        margin(isRight ? "r" : "l", 15),
        br10,
      ]}
      btnStyle={[br10, isBack && row]}
      onPress={onPress}
    >
      <Ic name={IcName} size={30} color={Icon?.color ?? colors.black} />
      {text && (
        <Animated.Text style={[color(colors.normal), fontSize(17)]}>
          {text}
        </Animated.Text>
      )}
    </Button>
  );
};

export let Header_Btn = ({
  po,
  Color,
  text,
  onPress = noop,
  isRight = true,
}) => {
  return (
    <AnimatedTouchableOpacity
      activeOpacity={po}
      style={[
        minWidth(45),
        height(36),
        margin(isRight ? "r" : "l", 15),
        br10,
        center,
      ]}
      onPress={onPress}
    >
      <Animated.Text style={[color(Color), fontSize(18)]}>{text}</Animated.Text>
    </AnimatedTouchableOpacity>
  );
};

export let SearchBox = ({ text, setText, bg }) => {
  let max = dim.width - 20;
  let min = 90;
  let diff = max - min;
  let searchWidthMultiplier = useSharedValue(max);
  let [value, setValue] = useState(text ?? "");
  let tiRef = useAnimatedRef();
  /**
   * font size of texts
   */
  let fs = fontSize(19.5);
  /**
   *
   * @param {string} text
   */
  let onChangeText = (text) => {
    setValue(text);
    if (setText) setText(text);
  };
  let searchBoxStyle = useAnimatedStyle(() => ({
    width: withTiming(searchWidthMultiplier.value, {
      duration: 750,
    }),
  }));
  let cancelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(
          (searchWidthMultiplier.value === diff ? 0.25 : 1) * 20,
          { duration: 500 },
        ),
      },
    ],
  }));
  return (
    <Animated.View
      style={[width(dim.width), height(48), row, padding("h", 10)]}
    >
      <Animated.View
        style={[
          searchBoxStyle,
          fh,
          backgroundColor(bg ?? colors.whiteLike),
          row,
          aic,
          br10,
        ]}
      >
        <AnimatedTouchableOpacity
          style={[squareLayout(48), br10, center]}
          onPress={() => {
            tiRef.current.focus();
            searchWidthMultiplier.value = diff;
          }}
          activeOpacity={0.75}
        >
          <Ionicons
            name="ios-search-outline"
            color={colors.midBlack}
            size={22.5}
          />
        </AnimatedTouchableOpacity>
        <AnimatedTextInput
          ref={tiRef}
          style={[
            // textInputStyle, fh,
            f1,
            br10,
            fs,
            padding("r", 7.5),
          ]}
          placeholder="Search"
          placeholderTextColor={colors.midBlack}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            searchWidthMultiplier.value = diff;
          }}
          onBlur={() => {
            searchWidthMultiplier.value = max;
          }}
        />
        {!isEmpty(value) && (
          <Animated.View
            style={[layout(36, 48), br10, center]}
            entering={FadeIn}
            exiting={FadeOut}
            // layout={Layout.springify()}
          >
            <Button
              parentStyle={[squareLayout(27), borderRadius("", 13.5)]}
              btnStyle={[borderRadius("", 13.5)]}
              onPress={() => setValue("")}
            >
              <AntDesign
                name="closecircle"
                color={colors.midBlack}
                size={19.5}
              />
            </Button>
          </Animated.View>
        )}
      </Animated.View>
      <Animated.View style={[width(min), cancelStyle, fh, center]}>
        <Button
          parentStyle={[width(min - 20), fh, br10]}
          btnStyle={[br10]}
          onPress={() => {
            setValue("");
            searchWidthMultiplier.value = max;
            tiRef.current.blur();
          }}
        >
          <Animated.Text style={[fs, color(colors.normal)]}>
            Cancel
          </Animated.Text>
        </Button>
      </Animated.View>
    </Animated.View>
  );
};

export let ChatRowProfile = ({ profiles = [] }) => {
  let single = isEqual(profiles.length, 1);
  let br40 = borderRadius("", 40);
  let br30 = borderRadius("", 30);
  let br25 = borderRadius("", 25);
  return (
    <Animated.View style={[squareLayout(90), single && center]}>
      {single ? (
        <Animated.Image
          source={profiles[0]}
          style={[squareLayout(80), br40, backgroundColor(colors.midBlack)]}
        />
      ) : (
        profiles.map((profile, i) => (
          <Animated.View
            key={i}
            style={[
              squareLayout(60),
              br30,
              overlay,
              top(i * 30),
              right(i * 30),
              backgroundColor(colors.white),
              center,
            ]}
          >
            <Animated.View
              style={[squareLayout(50), br25, backgroundColor(colors.midBlack)]}
            >
              <Animated.Image source={profile} style={[full, br25]} />
            </Animated.View>
          </Animated.View>
        ))
      )}
    </Animated.View>
  );
};

export let ChatRow = ({
  profiles = [],
  title,
  lastMsg,
  onChatPress = noop,
}) => {
  return (
    <AnimatedTouchableOpacity
      style={[
        fw,
        height(100),
        br10,
        margin("v", 10),
        padding("h", 14),
        row,
        aic,
        jcfs,
      ]}
      onPress={onChatPress}
      activeOpacity={0.75}
    >
      <ChatRowProfile
        {...{
          profiles,
        }}
      />
      <Animated.View style={[width(300), height(60), jcse, padding("l", 5)]}>
        <Animated.Text style={[fontSize(22.5), fontWeight("6")]}>
          {title}
        </Animated.Text>
        <Animated.Text style={[fontSize(18), color(colors.midBlack)]}>
          {lastMsg?.text?.slice(0, 24)} • {TimeFormater(lastMsg?.time)}
        </Animated.Text>
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};
export let ChatList = ({ chats = [], onChatPress = noop }) => {
  return chats.map((chat, i) => (
    <ChatRow
      {...{
        key: i,
        onChatPress: () => onChatPress(chat),
        ...chat,
      }}
    />
  ));
};
export let ChatTemplate = ({ children, bg }) => {
  let KHStyle = useKeyboardInputHeight(-10);
  return (
    <Animated.View style={[fw, KHStyle, backgroundColor(bg ?? colors.white)]}>
      <Animated.ScrollView style={[padding("t", 10)]}>
        {children?.map((child, i) => (
          <Animated.View key={i}>
            <Spacer size={7.5} />
            {child}
            <Spacer size={7.5} />
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};
export let RoundedContactRowProfile = ({ size, source }) => {
  return (
    <Animated.Image
      source={source}
      style={[squareLayout(size), borderRadius("", size / 2)]}
    />
  );
};
export let ContactRow = ({
  source,
  name,
  selectable = null,
  isSelected = false,
  onPress = noop,
  onActionPress = noop,
  actionText,
}) => {
  let br12 = borderRadius("", 12);
  let br18 = borderRadius("", 18);
  /**
   * selectable is null?
   */
  let sin = isNull(selectable);
  return (
    <AnimatedTouchableOpacity
      style={[fw, height(60), br10, row, jcsb, aic]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Animated.View style={[row, aic]}>
        <RoundedContactRowProfile size={50} source={source} />
        <Animated.Text style={[fontSize(17), margin("l", 15)]}>
          {name}
        </Animated.Text>
      </Animated.View>
      <Button
        parentStyle={[
          sin
            ? []
            : selectable
            ? [
                squareLayout(24),
                br12,
                borderColor("", colors.midBlack),
                !isSelected && bwh,
              ]
            : [layout(100, 36), br18, backgroundColor(colors.whiteLike)],
        ]}
        btnStyle={[selectable ? br12 : br18]}
        onPress={selectable ? onPress : onActionPress}
        disabled={sin}
      >
        {sin ? null : selectable ? (
          isSelected && (
            <AnimatedIonicons
              name="ios-checkmark-circle-sharp"
              size={22.5}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
            />
          )
        ) : (
          <Animated.Text style={[fontSize(15), fontWeight("5")]}>
            {actionText}
          </Animated.Text>
        )}
        {/* {isNull(selectable) ? null : selectable ? (
          isSelected && (
            <AnimatedIonicons
              name="ios-checkmark-circle-sharp"
              size={22.5}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
            />
          )
        ) : (
          <Animated.Text style={[fontSize(15), fontWeight("5")]}>
            {actionText}
          </Animated.Text>
        )} */}
      </Button>
    </AnimatedTouchableOpacity>
  );
};
export let ChatContacts = ({
  contacts = [],
  selectable = null,
  onContactPress = noop,
  onActionPress = noop,
}) => {
  return (
    <Animated.View style={[margin("v", 10)]}>
      {contacts.map((contact, i) => (
        <Animated.View style={[padding("h", 24)]} key={i}>
          <ContactRow
            {...{
              ...contact,
              selectable,
              onPress: () => onContactPress(contact),
              onActionPress: () => onActionPress(contact),
            }}
          />
          {!isEqual(i, contacts.length - 1) && (
            <Animated.View
              style={[
                layout(dim.width - 113, 1),
                margin("l", 65),
                margin("v", 2),
                borderWidth("t", 0.3),
                borderColor("t", colors.midBlack),
              ]}
            />
          )}
        </Animated.View>
      ))}
    </Animated.View>
  );
};
export let Section = ({ header, children = null }) => {
  let [isExpanded, setIsExpanded] = useState(true);
  let toggleExpandtion = () => setIsExpanded((e) => !e);
  return (
    <Animated.View style={[fw, minHeight(0)]}>
      {header && (
        <AnimatedTouchableOpacity
          style={[
            fw,
            height(42),
            header?.moreAction ? [row, aic, jcsb] : jcc,
            padding("h", 15),
          ]}
          onPress={toggleExpandtion}
          activeOpacity={0.75}
          disabled={!header?.expandable}
        >
          <Animated.View style={[header?.expandable && [row, aic]]}>
            {header?.expandable && (
              <AnimatedEntypo
                name={`chevron-${isExpanded ? "down" : "right"}`}
                style={[margin("r", 10)]}
                color={colors.midBlack}
                size={25.5}
              />
            )}
            <Animated.Text
              style={[fontSize(18), fontWeight("6"), color(colors.midBlack)]}
            >
              {header?.title?.toUpperCase()}
            </Animated.Text>
          </Animated.View>
          {header?.moreAction && (
            <Button
              parentStyle={[height(36), br10]}
              btnStyle={[br10, padding("h", 6)]}
              onPress={header?.moreAction?.onPress}
            >
              <Animated.Text style={[fontSize(18), color(colors.normal)]}>
                {header?.moreAction?.text}
              </Animated.Text>
            </Button>
          )}
        </AnimatedTouchableOpacity>
      )}
      {header && header?.expandable ? (
        <Animated.View style={[fw, minHeight(0)]}>
          {isExpanded && children}
        </Animated.View>
      ) : (
        children
      )}
    </Animated.View>
  );
};
export let MarginedTopSection = ({ size, header, children }) => (
  <>
    <Spacer size={size} />
    <Section
      {...{
        header,
        children,
      }}
    />
  </>
);

export let ContactCard = ({ source, name, onPress = noop }) => {
  return (
    <Button
      parentStyle={[layout(120, 160), br10, backgroundColor(colors.white)]}
      btnStyle={[br10, jcse]}
      onPress={onPress}
    >
      <RoundedContactRowProfile size={100} source={source} />
      <Animated.Text style={[fontSize(16), fontWeight("5")]}>
        {name}
      </Animated.Text>
    </Button>
  );
};

export let FriendsInBio = ({ friends = [], onFriendPress = noop }) => {
  return (
    <Animated.View style={[padding("", 15), br10]}>
      {chunk(friends, 3).map((friendsRow, i) => (
        <Animated.View key={i} style={[fw, row, aic, jcse, margin("b", 10)]}>
          {friendsRow.map((friend, j) => (
            <ContactCard
              key={i * 3 + j}
              onPress={() => onFriendPress(friend)}
              {...friend}
            />
          ))}
        </Animated.View>
      ))}
    </Animated.View>
  );
};
export let Spacer = ({ size = 15 }) => (
  <Animated.View style={[margin("t", size)]} />
);
export let Notification = ({
  source,
  name,
  time,
  onNotificationPressed = noop,
  isCommented = false,
}) => {
  return (
    <AnimatedTouchableOpacity
      style={[fw, height(100), br10, row, aic, padding("h", 20)]}
      onPress={onNotificationPressed}
      activeOpacity={0.75}
    >
      <RoundedContactRowProfile size={60} source={source} />
      <Animated.View style={[height(60), jcse, padding("l", 15)]}>
        <Animated.View style={[row, aic]}>
          <Animated.Text style={[fontSize(16), fontWeight("6")]}>
            {`${name} `}
          </Animated.Text>
          <Animated.Text>
            just {isCommented ? "commented on" : "reacted to"} your post.
          </Animated.Text>
        </Animated.View>
        <Animated.Text>{TimeFormater(time)}</Animated.Text>
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};
export let NotificationWrapper = ({
  notifications = [],
  onNotificationPressed = noop,
}) => {
  return (
    <Animated.ScrollView style={[backgroundColor(colors.white)]}>
      {notifications.map((notification, i) => (
        <Animated.View key={i} style={[margin("h", 5)]}>
          <Notification
            {...{
              onNotificationPressed: () => onNotificationPressed(notification),
              ...notification,
            }}
          />
          {!isEqual(i, notifications.length - 1) && <BreakLine />}
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};
export let BreakLine = () => (
  <Animated.View
    style={[
      fw,
      height(1),
      borderWidth("t", 0.5),
      borderColor("t", colors.lightBlack),
    ]}
  />
);
export let POSTS = [
  {
    author: "Cristina",
    shortDesc: "The Warfield",
    description:
      "There's nothing beter than a drive on Golden Gate Bridge 🔥🔥🔥",
    time: new Date(2022, 3, 7).getTime(),
    source: require("../assets/1.jpeg"),
    assets: [
      {
        isVideo: true,
        source: require("../assets/big_buck_bunny.mp4"),
      },
      {
        isVideo: false,
        source: require("../assets/ggb.jpeg"),
      },
    ],
    reactions: [],
    comments: [
      {
        author: "Darren",
        text: "Amazing",
      },
      {
        author: "Craig",
        text: "Holy cow, San Francisco is fantastic. I'm so jealous 🥹",
      },
      {
        author: "Mister",
        text: "Awesome!",
      },
    ],
  },
  {
    author: "Daren",
    shortDesc: "Can Francisco City Hall",
    description: "Boom, just got married 😍🥳🥳",
    time: new Date(2022, 3, 7).getTime(),
    source: require("../assets/2.jpeg"),
    assets: [
      {
        isVideo: false,
        source: require("../assets/m.jpeg"),
      },
    ],
    reactions: [],
    comments: [
      {
        author: "Craig",
        text: "Holy cow, San Francisco is fantastic. I'm so jealous 🥹",
      },
    ],
  },
];
