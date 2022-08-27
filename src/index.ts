// import { queryFull } from "minecraft-server-util";
import config from "./lib/config";

// queryFull(config.server.ip, config.server.port ?? 25565, {})
//     .then(result => console.log(result))
//     .catch(e => console.error(e));

import { Client, GatewayIntentBits } from "discord.js";
import commandHandler from "./handlers/command";
import interactionHandler from "./handlers/interaction";

export const client = new Client({ intents: [GatewayIntentBits.Guilds], allowedMentions: { parse: ["users"] } });

client.on("ready", async() => {
    await commandHandler();
    await interactionHandler();

    console.log("Client ready!")
})

client.login(config.discord.token);