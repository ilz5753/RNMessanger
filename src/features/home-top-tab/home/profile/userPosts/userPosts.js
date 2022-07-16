import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { POSTS, PostsWrapper } from "../../../../../../components/main";

export default function UserPosts() {
  let { navigate } = useNavigation();
  return (
    <Animated.ScrollView>
      <PostsWrapper
        {...{
          posts: [POSTS[0]],
          goToPostDetail: (post) =>
            navigate("postDetail", { post, from: "Posts" }),
        }}
      />
    </Animated.ScrollView>
  );
}
