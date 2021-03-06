import {
  playListHandler,
  showPlayListHandler,
  addMusicHandler,
  insertMusicHandler,
  deleteMusicHandler,
  clearMusicHandler,
  skipMusicHandler,
  loopMusicHandler,
} from "actions";
import { Message, TextChannel } from "discord.js";

import { helpMessage } from "../constants";
import { PlayList, PlayListMap } from "../play-list";

const COMMAND_REGEX: RegExp = /^!![a-zA-Z]+/;

const isCommand = (msgContent: string) => {
  return COMMAND_REGEX.test(msgContent);
};

export const commandHandler = (msg: Message) => {
  if (!isCommand(msg.content)) {
    return;
  }
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
      playListHandler(msg);
      break;
    case "!!add":
      addMusicHandler(msg);
      break;
    case "!!insert":
      insertMusicHandler(msg);
      break;
    case "!!delete":
      deleteMusicHandler(msg);
      break;
    case "!!show":
      showPlayListHandler(msg);
      break;
    case "!!clear":
      clearMusicHandler(msg);
      break;
    case "!!skip":
      skipMusicHandler(msg);
      break;
    case "!!loop":
      loopMusicHandler(msg);
      break;
    case "!!help":
      msg.channel.send(helpMessage);
      break;
    default:
      msg.channel.send(helpMessage);
  }
};
