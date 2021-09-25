import * as dotenv from "dotenv";
import client from "discord-client";
import { isCommand, commandHandler } from "./command-manager";

dotenv.config();

client.on("ready", () => console.log("ready"));

client.on("message", async (msg) => {
  if (isCommand(msg.content)) {
    commandHandler(msg);
  }
});

client.login(process.env.CLIENT_TOKEN);
