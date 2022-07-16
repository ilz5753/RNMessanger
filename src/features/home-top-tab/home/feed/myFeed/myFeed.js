import { useNavigation } from "@react-navigation/native";
import {
  ChatTemplate,
  POSTS,
  PostsWrapper,
  StoryLine,
} from "../../../../../../components/main";

export default function MyFeed() {
  let { navigate } = useNavigation();
  let stories = [
    {
      name: "My Story",
      isViewedStory: false,
      source: require("../../../../../../assets/1.jpeg"),
    },
    {
      name: "Daren",
      isViewedStory: true,
      source: require("../../../../../../assets/2.jpeg"),
    },
    {
      name: "Curtis",
      isViewedStory: false,
      source: require("../../../../../../assets/8.jpeg"),
    },
  ];
  return (
    <ChatTemplate>
      <StoryLine
        {...{
          stories,
          onStoryPressed: (story) => navigate("story", { story }),
        }}
      />
      <PostsWrapper
        {...{
          posts: POSTS,
          goToPostDetail: (post) =>
            navigate("postDetail", { post, from: "Feed" }),
        }}
      />
    </ChatTemplate>
  );
}
