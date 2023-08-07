import { EmbedBuilder, inlineCode, resolveColor } from "discord.js";
import { Command } from "../def";
import { queryServer } from "../lib/common";

export default new Command({
    name: "info",
    description: "List server info.",
    handler: async (interaction) => {
        const query = await queryServer();

        const embed = new EmbedBuilder({
            color: resolveColor("#86bdbb"),
            fields: [
                { name: "IP:Port", value: inlineCode(`${query.host}:${query.port}`) },
                { name: "MOTD", value: query.motd?.clean ?? "Unknown" },
                { name: "Version", value: query.version?.name_clean || "Unknown", inline: true },
                { name: "Plugins", value: (query.plugins && query.plugins.length > 0) ? query.plugins.map(p => p.name).join(", ") : "Unknown", inline: true },
                { name: "Software", value: query.software ?? "Unknown", inline: true },
            ]
        });

        await interaction.editReply({ embeds: [embed] });
    },
})
