import { codeBlock, Colors, EmbedBuilder } from "discord.js";
import { client } from "..";
import { commands } from "./command";

import config from "../lib/config";

export default async function interactionHandler() {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (!config.discord.whitelist.includes(interaction.user.id)) {
            await interaction.reply({ content: "You are not whitelisted!" });
            return;
        }

        const command = commands.find(i => i.name === interaction.commandName);

        if (!command) { return } else {
            try {
                await interaction.deferReply({ ephemeral: command.ephemeral });

                await command.handler(interaction);
            } catch (error) {
                const typedError = error as Error;
                if (typedError.message.toLowerCase().includes("unknown interaction")) return;

                await interaction.editReply({ embeds: [new EmbedBuilder({ color: Colors.Red, description: codeBlock("js", (typedError.stack ?? typedError.toString()).substring(0, 1000)) })]});
            }
        }
    })
}