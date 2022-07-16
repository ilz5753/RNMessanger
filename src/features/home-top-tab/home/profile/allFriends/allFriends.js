import { useState } from "react";
import {
  ChatContacts,
  ChatTemplate,
  SearchBox,
} from "../../../../../../components/main";

export default function AllFriends() {
  let [search, setSearch] = useState("");
  let contacts = [
    {
      imageUri: "",
      name: "Daren",
      source: require("../../../../../../assets/2.jpeg"),
    },
    {
      imageUri: "",
      name: "Lesa",
      source: require("../../../../../../assets/11.png"),
    },
    {
      imageUri: "",
      name: "Courtis",
      source: require("../../../../../../assets/8.jpeg"),
    },
    {
      imageUri: "",
      name: "Florian",
      source: require("../../../../../../assets/5.jpeg"),
    },
    {
      imageUri: "",
      name: "Criag",
      source: require("../../../../../../assets/6.webp"),
    },
    {
      imageUri: "",
      name: "Camila",
      source: require("../../../../../../assets/9.jpeg"),
    },
    {
      imageUri: "",
      name: "Mark",
      source: require("../../../../../../assets/11.png"),
    },
    {
      imageUri: "",
      name: "Alireza pishgar",
      source: require("../../../../../../assets/7.jpeg"),
    },
    {
      imageUri: "",
      name: "Dolar",
      source: require("../../../../../../assets/4.jpeg"),
    },
    {
      imageUri: "",
      name: "Barbara",
      source: require("../../../../../../assets/11.png"),
    },
    {
      imageUri: "",
      name: "Kelly",
      source: require("../../../../../../assets/3.jpeg"),
    },
    {
      imageUri: "",
      name: "Johny Chan",
      source: require("../../../../../../assets/7.jpeg"),
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
      <ChatContacts
        {...{
          contacts,
        }}
      />
    </ChatTemplate>
  );
}
