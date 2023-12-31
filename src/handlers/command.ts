import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { Client } from "discord.js";
import { Command } from "../def";
import { convertToDiscordCommands } from "../lib/common";

export const commands = new Array<Command>();

export default async function commandHandler(client: Client) {
    const rootCommandsDir = join(__dirname, "../", "commands/").trim();
    const commandFiles = (await readdir(rootCommandsDir)).filter(i => i.endsWith(".js"));

    for (const commandFile of commandFiles) {
        const command = (await import(join(rootCommandsDir, commandFile))).default;
        commands.push(command);
    }

    client.application?.commands.set(convertToDiscordCommands(commands));
}
