import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { EvilIcons } from "@expo/vector-icons";
import { Header_Btn } from "../components/main";
import { colors } from "../styles";
import Auth from "./features/auth/auth";
import PostDetail from "./features/postDetail/postDetail";
import Home from "./features/home-top-tab";
import Story from "./features/story/story";
import OnBoarding from "./features/onboarding/onboarding";
import Splash from "./features/splash/splash";
import ChatScreen from "./features/chat-screen/chatScreen";
import ChatSettings from "./features/chat-screen/chatSettings";
import { useNavigation } from "@react-navigation/native";

let Stack = createStackNavigator();
export default function SM() {
  let { navigate } = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="home_top_tab"
    >
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="onBoarding" component={OnBoarding} />
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="home_top_tab" component={Home} />
      <Stack.Screen
        name="postDetail"
        component={PostDetail}
        options={{
          title: "Detail Post",
          headerShown: true,
        }}
      />
      <Stack.Screen name="story" component={Story} />
      <Stack.Screen
        name="chat-screen"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerLeft: (p) => (
            <HeaderBackButton
              {...{
                ...p,
                label: "Chat",
              }}
            />
          ),
          headerRight: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                text: <EvilIcons name="gear" color={colors.normal} size={24} />,
                onPress: () => navigate("chat-settings"),
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="chat-settings"
        component={ChatSettings}
        options={{
          headerShown: true,
          title: "Settings"
        }}
      />
    </Stack.Navigator>
  );
}
