import { Colors, EmbedBuilder, codeBlock, ApplicationCommandOptionType } from "discord.js";
import { RCON } from "minecraft-server-util";
import { Command } from "../def";
import config from "../lib/config";

export default new Command({
    name: "rcon",
    description: "Attempt to send RCON commands to the server, success rates low",
    options: [
        {
            name: "command",
            description: "The command to send",
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: "password",
            description: "The RCON password, by default blank",
            type: ApplicationCommandOptionType.String
        },
        {
            name: "port",
            description: "The RCON port, by default 25575",
            type: ApplicationCommandOptionType.Integer
        }
    ],
    handler: async (interaction) => {
        const command = interaction.options.getString("command", true);
        const password = interaction.options.getString("password");
        const port = interaction.options.getInteger("port");

        const rconClient = new RCON();

        rconClient.on("message", async(data) => {
            interaction.editReply({ embeds: [new EmbedBuilder({ color: Colors.Blurple, description: codeBlock(JSON.stringify(data)) })] });
        })

        await rconClient.connect(config.server.ip, port ?? 25575);
        await rconClient.login(password || "");
        await rconClient.run(command);
    },
})