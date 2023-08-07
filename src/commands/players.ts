import { EmbedBuilder, codeBlock, resolveColor } from "discord.js";
import { Command } from "../def";
import { isBedrockPlayer, queryServer } from "../lib/common";

export default new Command({
    name: "players",
    description: "List online players.",
    handler: async (interaction) => {
        const query = await queryServer();

        const javaPlayers = (query.players?.list.filter(p => !isBedrockPlayer(p)) ?? []).map(p => p.name_clean);
        const bedrockPlayers = (query.players?.list.filter(isBedrockPlayer) ?? []).map(p => p.name_clean);

        const embed = new EmbedBuilder({
            color: resolveColor("#86bdbb"),
            fields: [
                { name: "Players", value: `${query.players?.online}/${query.players?.max}` },
                { name: `Java (${javaPlayers.length})`, value: codeBlock(javaPlayers.length > 0 ? javaPlayers.join(", ") : "None") },
                { name: `Bedrock (${bedrockPlayers.length})`, value: codeBlock(bedrockPlayers.length > 0 ? bedrockPlayers.join(", ") : "None") },
            ],
        });

        await interaction.editReply({ embeds: [embed] });
    },
})
