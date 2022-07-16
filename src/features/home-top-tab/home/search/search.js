import { useNavigation } from "@react-navigation/native";
import { noop } from "lodash";
import { useState } from "react";
import {
  ChatTemplate,
  MoreModal,
  POSTS,
  PostsWrapper,
  SearchBox,
} from "../../../../../components/main";

export default function Search() {
  let { navigate } = useNavigation();
  let [showMoreActions, setShowMoreActions] = useState(false);
  let [ActivePost, setActivePost] = useState();
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
  return (
    <ChatTemplate>
      <SearchBox />
      <PostsWrapper
        {...{
          posts: POSTS,
          goToPostDetail: (post) =>
            navigate("postDetail", { post, from: "Discover" }),
          moreClick: (post) => {
            setActivePost(post);
            toggleShowActions();
          },
        }}
      />
      <MoreModal
        {...{
          show: showMoreActions,
          hide: toggleShowActions,
          actions,
        }}
      />
    </ChatTemplate>
  );
}
