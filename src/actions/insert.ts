import { Message } from "discord.js";
import { PlayList, PlayListMap } from "play-list";
import commandSplitter from "utils/command-splitter";

const insertMusicHandler = async (msg: Message) => {
  const guild = msg.guild;
  if (guild === null) {
    return msg.channel.send("길드채널에서 가능한 명령어 입니다.");
  }

  const playList = PlayListMap.get(guild.id) as PlayList;
  const splitedCommand = commandSplitter(msg.content);
  const order = splitedCommand[1];
  const url = splitedCommand[2];

  const insertResult = await playList.insertMusic(url, +order);

  if (!insertResult) {
    msg.channel.send("음원 삽입에 실패했습니다. ❌");
  } else {
    msg.channel.send("음원을 삽입했습니다. ✅");
  }
};

export default insertMusicHandler;
