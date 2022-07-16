import { useState } from "react";
import {
  ChatContacts,
  ChatTemplate,
  SearchBox,
} from "../../../../../components/main";

export default function Friends() {
  let [search, setSearch] = useState("");
  let contacts = [
    {
      imageUri: "",
      name: "Daren",
      actionText: "Unfriend",
      source: require("../../../../../assets/2.jpeg"),
    },
    {
      imageUri: "",
      name: "Lesa",
      actionText: "Accept",
      source: require("../../../../../assets/11.png"),
    },
    {
      imageUri: "",
      name: "Courtis",
      actionText: "Accept",
      source: require("../../../../../assets/8.jpeg"),
    },
    {
      imageUri: "",
      name: "Florian",
      actionText: "Unfriend",
      source: require("../../../../../assets/5.jpeg"),
    },
    {
      imageUri: "",
      name: "Criag",
      actionText: "Accept",
      source: require("../../../../../assets/6.webp"),
    },
    {
      imageUri: "",
      name: "Camila",
      actionText: "Accept",
      source: require("../../../../../assets/9.jpeg"),
    },
    {
      imageUri: "",
      name: "Mark",
      actionText: "Unfriend",
      source: require("../../../../../assets/11.png"),
    },
    {
      imageUri: "",
      name: "Alireza pishgar",
      actionText: "Unfriend",
      source: require("../../../../../assets/7.jpeg"),
    },
    {
      imageUri: "",
      name: "Dolar",
      actionText: "Unfriend",
      source: require("../../../../../assets/4.jpeg"),
    },
    {
      imageUri: "",
      name: "Barbara",
      actionText: "Unfriend",
      source: require("../../../../../assets/11.png"),
    },
    {
      imageUri: "",
      name: "Kelly",
      actionText: "Accept",
      source: require("../../../../../assets/3.jpeg"),
    },
    {
      imageUri: "",
      name: "Johny Chan",
      actionText: "Unfriend",
      source: require("../../../../../assets/7.jpeg"),
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
          selectable: false,
        }}
      />
    </ChatTemplate>
  );
}
