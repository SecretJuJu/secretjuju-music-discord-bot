import { VoiceConnection } from "discord.js";
import { Message } from "discord.js";
import { NoGuildException, NotJoinedVoiceException } from "../errors";
import { PlayList, PlayListMap } from "../play-list";

const joinChannel = async (msg: Message) => {
  const guild = msg.guild;
  if (!guild) {
    throw new NoGuildException();
  }

  if (!msg.member?.voice.channel) {
    throw new NotJoinedVoiceException();
  }

  const connection: VoiceConnection = await msg.member?.voice.channel?.join();
  return connection;
};

const getVoiceConnection = async (
  msg: Message
): Promise<VoiceConnection | null> => {
  try {
    const voiceConnection = await joinChannel(msg);
    return voiceConnection;
  } catch (err) {
    if (
      err instanceof NoGuildException ||
      err instanceof NotJoinedVoiceException
    ) {
      msg.channel.send(err.message);
    } else {
      msg.channel.send("예상치 못한 에러입니다.");
    }

    return null;
  }
};

const play = async (msg: Message) => {
  const voiceConnection = await getVoiceConnection(msg);

  if (voiceConnection === null) {
    return;
  }

  const guildId = msg.guild?.id as string; // if guild.id is null then error at prePlay function
  const url = msg.content.split(" ").filter((content) => content !== "")[1];

  console.log(`${msg.guild?.name} 에서 ${url} play 요청`);

  const playList: PlayList = PlayListMap.get(guildId) as PlayList;

  if (!url) {
    msg.channel.send("URL을 입력 해 주세요.");
    playList.startPlayList();
    return;
  }

  playList.setVoiceConnection(voiceConnection as VoiceConnection);

  const addResult = await playList.addMusic(url);
  if (!addResult) {
    msg.channel.send("해당 유튜브 영상을 가져올 수 없습니다.");
  }
  console.log("start play list");
  playList.startPlayList();
};

export default play;
