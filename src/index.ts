import { Client, Intents } from "discord.js";
import * as dotenv from "dotenv";

import { isCommand, commandHandler } from "./command-manager";

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", async (msg) => {
  if (isCommand(msg.content)) {
    commandHandler(msg);
  }
});

client.login(process.env.CLIENT_TOKEN);
