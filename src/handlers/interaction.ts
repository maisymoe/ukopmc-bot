import { Client, codeBlock, Colors, EmbedBuilder } from "discord.js";
import { commands } from "./command";

export default async function interactionHandler(client: Client) {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = commands.find(i => i.name === interaction.commandName);
        if (!command) return;

        try {
            await interaction.deferReply({ ephemeral: command.ephemeral });

            await command.handler(interaction);
        } catch (error) {
            const typedError = error as Error;
            if (typedError.message.toLowerCase().includes("unknown interaction")) return;

            await interaction.editReply({ embeds: [new EmbedBuilder({ color: Colors.Red, description: codeBlock("js", (typedError.stack ?? typedError.toString()).substring(0, 1000)) })]});
        }
    })
}
