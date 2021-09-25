import client from "discord-client";
import { Collection, GuildMember, Message } from "discord.js";
import { NoGuildException, NotJoinedVoiceException } from "./common/errors";

const joinChannel = async (msg: Message): Promise<void> => {
  const guild = msg.guild;
  if (!guild) {
    throw new NoGuildException();
  }

  if (!msg.member?.voice.channel) {
    throw new NotJoinedVoiceException();
  }

  msg.member?.voice.channel?.join();
};

const play = async (msg: Message) => {
  const authorId = msg.author.id;
  try {
    await joinChannel(msg);
  } catch (err) {
    if (
      err instanceof NoGuildException ||
      err instanceof NotJoinedVoiceException
    ) {
      msg.channel.send(err.message);
    } else {
      msg.channel.send("예상치 못한 에러입니다.");
    }
  }
};

export default play;
