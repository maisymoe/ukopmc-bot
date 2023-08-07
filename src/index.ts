import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import commandHandler from "./handlers/command";
import interactionHandler from "./handlers/interaction";
import config from "./lib/config";

export const client = new Client({ intents: [GatewayIntentBits.Guilds], allowedMentions: { parse: ["users"] } });

client.on("ready", async() => {
    console.log("Initialising...");

    await commandHandler(client);
    await interactionHandler(client);

    client.user?.setActivity({
        type: ActivityType.Competing,
        name: "sucking sausage rolls",
    });

    console.log("Client ready!");
})

client.login(config.discord.token);
