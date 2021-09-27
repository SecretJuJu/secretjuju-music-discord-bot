import { Message } from "discord.js";
import { PlayListMap } from "play-list";
import commandSplitter from "utils/command-splitter";

const addMusicHandler = async (msg: Message) => {
  const guild = msg.guild;
  if (guild === null) {
    msg.channel.send("길드채널에서 가능한 명령어 입니다.");
    return;
  }
  const playList = PlayListMap.get(guild.id);

  const url = commandSplitter(msg.content)[1];

  const addResult = await playList?.addMusic(url);

  if (!addResult) {
    msg.channel.send("음원 추가에 실패했습니다. ❌");
  } else {
    msg.channel.send("음원을 추가했습니다. ✅");
  }
};

export default addMusicHandler;
