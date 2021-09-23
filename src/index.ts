import { Client, Intents } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("message", async (msg) => {
  //   if (isComand(msg.content)) { // todo implement
  //     resolveCommand(msg);
  //   }
});

client.login(process.env.CLIENT_TOKEN);
