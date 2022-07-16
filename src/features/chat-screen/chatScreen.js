import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ChatTemplate } from "../../../components/main";

export default function ChatScreen() {
  let { setOptions } = useNavigation();
  let { params } = useRoute();
  useEffect(() => {
    setOptions({
      title: params?.chat?.title,
    });
  }, []);
  return <ChatTemplate></ChatTemplate>;
}
