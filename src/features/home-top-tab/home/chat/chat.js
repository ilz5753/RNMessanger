import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Header_Btn } from "../../../../../components/main";
import List from "./list/list";
import { colors } from "../../../../../styles";
import { noop } from "lodash";
import ChoosePeople from "./choosePeople/choosePeople";
let Stack = createStackNavigator();
export default function Chat() {
  let { navigate } = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="list"
        component={List}
        options={{
          title: "Chat",
          headerRight: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                onPress: () => navigate("choosePeople"),
                text: <AntDesign name="plus" size={24} color={colors.normal} />,
              }}
            />
          ),
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="choosePeople"
        component={ChoosePeople}
        options={{
          title: "Choose People",
          headerRight: (p) => (
            <Header_Btn
              {...{
                po: p.pressOpacity,
                Color: colors.normal,
                text: "Create",
                onPress: noop,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
