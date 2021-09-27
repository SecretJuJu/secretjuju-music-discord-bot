import { Message } from "discord.js";
import { PlayList, PlayListMap } from "play-list";

const skipMusicHandler = (msg: Message) => {
  const guild = msg.guild;
  if (guild === null) {
    return msg.channel.send("길드채널에서 가능한 명령어 입니다.");
  }

  const playList = PlayListMap.get(guild.id) as PlayList;
  playList.skipMusic();

  msg.channel.send("Skip!");
};

export default skipMusicHandler;
