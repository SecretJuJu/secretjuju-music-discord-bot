import { Guild, Message } from "discord.js";
import { PlayListMap } from "../play-list";

const showPlayListHandler = async (msg: Message) => {
  const DefaultGuideMessage = `\`해당 채널에 등록된 플레이리스트가 없습니다. \``;

  const guild: Guild | null = msg.guild;
  if (guild === null) {
    return msg.channel.send("길드채널에서 사용하실 수 있습니다.");
  }

  const guildId = guild.id;
  const playList = PlayListMap.get(guildId);

  if (!playList) {
    return msg.channel.send(DefaultGuideMessage);
  }

  const musicList = playList.getMusicList();

  if (musicList.length === 0) {
    return msg.channel.send(DefaultGuideMessage);
  }
  const guideString: string = musicList
    .map(({ title }, index) => {
      return `** ${index + 1} **. \`${title}\``;
    })
    .join("\n");
  return msg.channel.send(
    `> ⬇    플레이 리스트 출력    ⬇️\n${guideString} \n\r> ⬆️    플레이 리스트 출력    ⬆️`
  );
};

export default showPlayListHandler;
