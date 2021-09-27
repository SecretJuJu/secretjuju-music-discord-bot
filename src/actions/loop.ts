import { Message } from "discord.js";
import { PlayList, PlayListMap } from "play-list";

const loopMusicHandler = (msg: Message) => {
  const guild = msg.guild;
  if (guild === null) {
    return msg.channel.send("길드채널에서 가능한 명령어 입니다.");
  }

  const playList = PlayListMap.get(guild.id) as PlayList;
  const currentIsLoop = playList.toggleLoop();
  if (currentIsLoop) {
    msg.channel.send("루프기능이 활성화 되었습니다. 🔁 ✅");
  } else {
    msg.channel.send("루프기능이 비활성화 되었습니다. 🔁 ❌");
  }
};

export default loopMusicHandler;
