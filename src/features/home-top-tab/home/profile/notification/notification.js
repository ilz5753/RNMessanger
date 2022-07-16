import { NotificationWrapper } from "../../../../../../components/main";

export default function Notifications() {
  let time = new Date().getTime();
  let notifications = [
    {
      source: require("../../../../../../assets/6.webp"),
      name: "ahsan",
      time,
      isCommented: false,
    },
    {
      source: require("../../../../../../assets/10.jpeg"),
      name: "Mister",
      time,
      isCommented: true,
    },
    {
      source: require("../../../../../../assets/8.jpeg"),
      name: "Curtis",
      time,
      isCommented: false,
    },
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
      time,
      isCommented: false,
    },
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
      time,
      isCommented: false,
    },
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
      time,
      isCommented: true,
    },
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
      time,
      isCommented: false,
    },
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
      time,
      isCommented: false,
    },
    {
      source: require("../../../../../../assets/2.jpeg"),
      name: "Daren",
      time,
      isCommented: false,
    },
  ];
  return (
    <NotificationWrapper
      {...{
        notifications,
      }}
    />
  );
}
