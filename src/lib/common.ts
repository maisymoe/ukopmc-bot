import { ApplicationCommandData, ApplicationCommandType } from "discord.js";
import { statusJava } from "node-mcstatus";
import { Command, Player } from "../def";
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

export const queryServer = async () => await statusJava(config.server.host, config.server.port ?? 25565, { query: true });
export const isBedrockPlayer = (player: Player) => player.name_clean.startsWith(".");
