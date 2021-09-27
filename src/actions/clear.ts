import { Message } from "discord.js";
import { PlayList, PlayListMap } from "play-list";

const clearMusicHandler = (msg: Message) => {
  const guild = msg.guild;
  if (guild === null) {
    return msg.channel.send("길드채널에서 가능한 명령어 입니다.");
  }

  const playList = PlayListMap.get(guild.id) as PlayList;
  playList.clearMusicList();
  msg.channel.send("플레이리스트가 비워졌습니다. ");
};

export default clearMusicHandler;
