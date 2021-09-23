import { Message } from "discord.js";

const COMMAND_REGEX: RegExp = /^@@[a-zA-Z]+/;

export const isCommand = (msgContent: string) => {
  return COMMAND_REGEX.test(msgContent);
};
export const commandHandler = (msg: Message) => {};
