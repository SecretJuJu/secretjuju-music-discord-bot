import { Message, TextChannel } from "discord.js";

import { helpMessage } from "./constants";
import play from "./actions/play";
import showPlayList from "actions/show";
import { PlayList, PlayListMap } from "./play-list";

const COMMAND_REGEX: RegExp = /^!![a-zA-Z]+/;

export const isCommand = (msgContent: string) => {
  return COMMAND_REGEX.test(msgContent);
};
export const commandHandler = (msg: Message) => {
  const commandType = msg.content.split(" ")[0];
  const guild = msg.guild;

  if (guild !== null) {
    const tmpPlayList = PlayListMap.get(guild.id);
    const playList =
      tmpPlayList === undefined
        ? (PlayListMap.set(guild.id, new PlayList(guild.id)).get(
            guild.id
          ) as PlayList)
        : tmpPlayList;

    playList.setLastMessageChannel(msg.channel as TextChannel);
  }

  switch (commandType) {
    case "!!play":
      play(msg);
      break;
    case "!!add":
      // addMusicToPlayList(msg)
      break;
    case "!!insert":
      msg.channel.send("this is insert music into queue function");
      break;
    case "!!delete":
      msg.channel.send("this is delete music by number function");
    case "!!show":
      showPlayList(msg);
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
