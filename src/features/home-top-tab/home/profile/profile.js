import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Header_Btn } from "../../../../../components/main";
import UserProfile from "./userProfile/userProfile";
import { colors } from "../../../../../styles";
import { useNavigation } from "@react-navigation/native";
import AllFriends from "./allFriends/allFriends";
import UserPosts from "./userPosts/userPosts";
import Settings from "./settings/settings";
import Notifications from "./notification/notification";
import AccountDetails from "./accountDetails/accountDetails";
let Stack = createStackNavigator();
export default function Profile() {
  let { navigate } = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{
          title: "Profile",
          headerLeft: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                onPress: () => navigate("settings"),
                text: <EvilIcons name="gear" color={colors.normal} size={24} />,
                isRight: false,
              }}
            />
          ),
          headerRight: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                onPress: () => navigate("notifications"),
                text: (
                  <Ionicons
                    name="ios-notifications-outline"
                    color={colors.normal}
                    size={24}
                  />
                ),
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ title: "Profile Settings" }}
      />
      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="allFriends"
        component={AllFriends}
        options={{ title: "All Friends" }}
      />
      <Stack.Screen
        name="myPosts"
        component={UserPosts}
        options={{ title: "Posts" }}
      />
      <Stack.Screen
        name="accountDetails"
        component={AccountDetails}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}
