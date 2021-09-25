import { Message } from "discord.js";

import { helpMessage } from "./constants";
import play from "./actions/play";

const COMMAND_REGEX: RegExp = /^!![a-zA-Z]+/;

export const isCommand = (msgContent: string) => {
  return COMMAND_REGEX.test(msgContent);
};
export const commandHandler = (msg: Message) => {
  const commandType = msg.content.split(" ")[0];
  switch (commandType) {
    case "!!play":
      play(msg);
      break;
    case "!!add":
      msg.channel.send("this is add music into queue function");
      break;
    case "!!insert":
      msg.channel.send("this is insert music into queue function");
      break;
    case "!!delete":
      msg.channel.send("this is delete music by number function");
    case "!!show":
      msg.channel.send("this is show play list function");
      break;
    case "!!clear":
      msg.channel.send("this is clear music queue function");
      break;
    case "!!help":
      msg.channel.send(helpMessage);
      break;
    default:
      msg.channel.send(helpMessage);
  }
};
