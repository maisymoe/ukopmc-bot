import { Colors, EmbedBuilder, inlineCode } from "discord.js";
import { Command } from "../def";
import { queryServer } from "../lib/common";
import config from "../lib/config";

export default new Command({
    name: "info",
    description: "List server info",
    handler: async (interaction) => {
        const query = await queryServer();

        const embed = new EmbedBuilder({
            color: Colors.Blurple,
            fields: [
                { name: "Domain", value: inlineCode(`${config.server.ip}`) },
                { name: "IP:Port", value: inlineCode(`${query.hostIP}:${query.hostPort}`) },
                { name: "MOTD", value: query.motd.clean },
                { name: "World Name", value: query.map },
                { name: "Version", value: query.version, inline: true },
                { name: "Plugins", value: query.plugins.length > 0 ? query.plugins.join(", ") : "None", inline: true },
                { name: "Software", value: query.software || "Not listed", inline: true },
            ]
        });

        await interaction.editReply({ embeds: [embed] });
    },
})