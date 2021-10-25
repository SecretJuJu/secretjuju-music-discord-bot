import * as dotenv from "dotenv";
import client from "./discord-client";
import { commandHandler } from "./command/command-manager";

dotenv.config();

client.on("ready", () => console.log("ready"));

client.on("message", commandHandler);

client.login(process.env.CLIENT_TOKEN);
