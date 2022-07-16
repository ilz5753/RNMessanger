import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons, Octicons } from "@expo/vector-icons";
import { Pager } from "../../../components/main";

export default function OnBoarding() {
  let { navigate } = useNavigation();
  return (
    <Pager
      list={[
        {
          title: "Posts",
          description: "Share posts, photos and comments with your network.",
          icon: {
            Provider: MaterialIcons,
            name: "list-alt",
          },
        },
        {
          title: "Stories",
          description: "Share stories that disappear after one day.",
          icon: {
            Provider: Ionicons,
            name: "ios-camera-outline",
          },
        },
        {
          title: "Check in",
          description:
            "Check in when posting to share your location with friends.",
          icon: {
            Provider: Ionicons,
            name: "ios-location-outline",
          },
        },
        {
          title: "Reactions",
          description: "React to posts and photos with like, dislike and more.",
          icon: {
            Provider: Octicons,
            name: "thumbsup",
          },
        },
        {
          title: "Chat",
          description: "Communicate with your friends via private messages.",
          icon: {
            Provider: Ionicons,
            name: "ios-chatbubble-outline",
          },
        },
      ]}
      goToAppFunc={() => navigate("auth")}
      goToAppText="Let's Go"
    />
  );
}
