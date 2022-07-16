import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import Chat from "./chat/chat";
import Feed from "./feed/feed";
import Friends from "./friends/friends";
import Profile from "./profile/profile";
import Search from "./search/search";
let BottomTab = createBottomTabNavigator();
export default function Home() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="feed"
        component={Feed}
        options={{
          headerShown: false,
          tabBarIcon: (p) => (
            <Ionicons
              {...{
                name: "ios-home-outline",
                ...p,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: (p) => (
            <Ionicons
              {...{
                name: "ios-search-outline",
                ...p,
              }}
            />
          ),
          title: "Discover",
        }}
      />
      <BottomTab.Screen
        name="chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: (p) => (
            <Ionicons
              {...{
                name: "ios-chatbubble-outline",
                ...p,
              }}
            />
          ),
          title: "Chat",
        }}
      />
      <BottomTab.Screen
        name="friends"
        component={Friends}
        options={{
          tabBarIcon: (p) => (
            <Fontisto
              {...{
                name: "persons",
                ...p,
              }}
            />
          ),
          title: "Friends",
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: (p) => (
            <Ionicons
              {...{
                name: "ios-person-circle-outline",
                ...p,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
