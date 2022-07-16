import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ChatList,
  ChatTemplate,
  SearchBox,
  StoryLine,
} from "../../../../../../components/main";
export default function List() {
  let { navigate } = useNavigation();
  let [search, setSearch] = useState("");
  let stories = [
    {
      name: "Lesa",
      isViewedStory: false,
      source: require("../../../../../../assets/11.png"),
    },
    {
      name: "Curtis",
      isViewedStory: false,
      source: require("../../../../../../assets/5.jpeg"),
    },
    {
      name: "Camila",
      isViewedStory: false,
      source: require("../../../../../../assets/9.jpeg"),
    },
    {
      name: "Craig",
      isViewedStory: false,
      source: require("../../../../../../assets/6.webp"),
    },
    {
      name: "Mark",
      isViewedStory: false,
      source: require("../../../../../../assets/7.jpeg"),
    },
  ];
  let time = new Date().getTime();
  let chats = [
    {
      profiles: [
        require("../../../../../../assets/1.jpeg"),
        require("../../../../../../assets/2.jpeg"),
      ],
      title: "Instamobile Team",
      lastMsg: {
        text: "Me too",
        time,
      },
    },
    {
      profiles: [require("../../../../../../assets/8.jpeg")],
      title: "Curtis George",
      lastMsg: {
        text: "Haha, don't tell her 😎",
        time,
      },
    },
    {
      profiles: [
        require("../../../../../../assets/4.jpeg"),
        require("../../../../../../assets/3.jpeg"),
      ],
      title: "Londen, baby!",
      lastMsg: {
        text: "Who needs a Map? 🙈",
        time,
      },
    },
    {
      profiles: [
        require("../../../../../../assets/6.webp"),
        require("../../../../../../assets/7.jpeg"),
      ],
      title: "Friendzoned",
      lastMsg: {
        text: "Love this social network 🍹🍸🎉",
        time,
      },
    },
    {
      profiles: [require("../../../../../../assets/10.jpeg")],
      title: "Camila Bradley",
      lastMsg: {
        text: "This is awesome 🔥🔥🔥",
        time,
      },
    },
    {
      profiles: [require("../../../../../../assets/7.jpeg")],
      title: "Mark Twain",
      lastMsg: {
        text: "This is hilarious 😂🙈😎",
        time,
      },
    },
    {
      profiles: [require("../../../../../../assets/11.png")],
      title: "Barbara",
      lastMsg: {
        text: "Yo",
        time,
      },
    },
  ];
  return (
    <ChatTemplate>
      <SearchBox
        {...{
          text: search,
          setText: setSearch,
        }}
      />
      <StoryLine
        {...{
          stories,
          size: 67,
          onStoryPressed: (story) => navigate("story", { story }),
        }}
      />
      <ChatList
        {...{
          chats,
          onChatPress: (chat) => navigate("chat-screen", { chat }),
        }}
      />
    </ChatTemplate>
  );
}
