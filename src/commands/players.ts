import { Colors, EmbedBuilder, codeBlock } from "discord.js";
import { Command } from "../def";
import { queryServer } from "../lib/common";

export default new Command({
    name: "players",
    description: "List online players",
    handler: async (interaction) => {
        const query = await queryServer();

        const embed = new EmbedBuilder({
            color: Colors.Blurple,
            fields: [
                { name: "Online", value: query.players.online.toString(), inline: true },
                { name: "Max", value: query.players.max.toString(), inline: true },
                { name: "List", value: codeBlock(query.players.length > 0 ? query.players.list.join(", ") : "None") }
            ]
        });

        await interaction.editReply({ embeds: [embed] });
    },
})
