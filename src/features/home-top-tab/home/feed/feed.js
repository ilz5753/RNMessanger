import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { Header_Btn } from "../../../../../components/main";
import { colors } from "../../../../../styles";
import CreatePost from "./createPost/createPost";
import MyFeed from "./myFeed/myFeed";
import { noop } from "lodash";
import { useNavigation } from "@react-navigation/native";

let Stack = createStackNavigator();
export default function Feed() {
  let { navigate } = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="myFeed"
        component={MyFeed}
        options={{
          title: "Feed",
          headerLeft: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                onPress: () => navigate("camera"),
                text: (
                  <Ionicons
                    name="ios-camera-outline"
                    size={24}
                    color={colors.normal}
                  />
                ),
                isRight: false,
              }}
            />
          ),
          headerRight: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                onPress: () => navigate("createPost"),
                text: <AntDesign name="plus" size={24} color={colors.normal} />,
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="createPost"
        component={CreatePost}
        options={{
          title: "Create Post",
          headerRight: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                text: "Post",
                Color: colors.normal,
                onPress: noop,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
