import { Message } from "discord.js";
import { PlayList, PlayListMap } from "play-list";
import commandSplitter from "utils/command-splitter";

const deleteMusicHandler = (msg: Message) => {
  const guild = msg.guild;
  if (guild === null) {
    return msg.channel.send("길드채널에서 가능한 명령어 입니다.");
  }

  const playList = PlayListMap.get(guild.id) as PlayList;
  const splitedCommand = commandSplitter(msg.content);
  const targetList: Array<number> = splitedCommand
    .filter((element) => !isNaN(+element))
    .map((element) => +element - 1);

  playList.deleteMusic(targetList);
  msg.channel.send("삭제되었습니다. ✅");
};
export default deleteMusicHandler;
