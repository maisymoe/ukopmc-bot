import { ApplicationCommandData, ApplicationCommandType } from "discord.js";
import { queryFull } from "minecraft-server-util";
import { Command } from "../def";
import config from "./config";

export function convertToDiscordCommands(commands: Command[]) {
    const convertedCommands = [];

    for (const command of commands) {
        convertedCommands.push({
            name: command.name,
            description: command.description,
            options: command.options,
            type: ApplicationCommandType.ChatInput,
        } as ApplicationCommandData);
    }

    return convertedCommands;
}

export async function queryServer() {
    return await queryFull(config.server.ip, config.server.port ?? 25565, {});
}