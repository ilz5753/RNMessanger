import { useNavigation } from "@react-navigation/native";
import { noop } from "lodash";
import { useState } from "react";
import Animated from "react-native-reanimated";
import {
  FriendsInBio,
  MoreModal,
  POSTS,
  PostsWrapper,
  RoundedContactRowProfile,
  Section,
} from "../../../../../../components/main";
import {
  center,
  fontSize,
  fontWeight,
  fullWidth,
  height,
  margin,
} from "../../../../../../styles";

export default function UserProfile() {
  let { navigate } = useNavigation();
  let [showMoreActions, setShowMoreActions] = useState(false);
  let friends = [
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
    },
    {
      source: require("../../../../../../assets/11.png"),
      name: "Lesa",
    },
    {
      source: require("../../../../../../assets/8.jpeg"),
      name: "Florian",
    },
    {
      source: require("../../../../../../assets/5.jpeg"),
      name: "Courtis",
    },
    {
      source: require("../../../../../../assets/6.webp"),
      name: "Criag",
    },
    {
      source: require("../../../../../../assets/9.jpeg"),
      name: "Camila",
    },
  ];
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
      text: "Share Post",
      onPress: noop,
    },
    {
      text: "Delete Post",
      onPress: noop,
      isDelete: true,
    },
  ];
  return (
    <Animated.ScrollView>
      <Animated.View style={[fullWidth, height(300), center]}>
        <RoundedContactRowProfile size={150} source={require("../../../../../../assets/1.jpeg")} />
        <Animated.Text
          style={[fontSize(19.5), fontWeight("5"), margin("t", 15)]}
        >
          Cristina Kardashian
        </Animated.Text>
      </Animated.View>
      <Section
        header={{
          title: "FRIENDS",
          // expandable: true,
          moreAction: {
            text: "See All",
            onPress: () => navigate("allFriends"),
          },
        }}
      >
        <FriendsInBio
          {...{
            friends,
          }}
        />
      </Section>
      <Section
        header={{
          title: "LATEST POSTS",
          // expandable: true,
          moreAction: {
            text: "See All",
            onPress: () => navigate("myPosts"),
          },
        }}
      >
        <PostsWrapper
          {...{
            posts: [POSTS[0]],
            goToPostDetail: (post) =>
              navigate("postDetail", { post, from: "Profile" }),
            moreClick: toggleShowActions,
          }}
        />
      </Section>
      <MoreModal
        {...{
          show: showMoreActions,
          hide: toggleShowActions,
          actions,
        }}
      />
    </Animated.ScrollView>
  );
}
