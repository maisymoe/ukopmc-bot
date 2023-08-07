import { ApplicationCommandOptionData, ChatInputCommandInteraction } from "discord.js";

// Ripped from the node-mcstatus library because they don't export it.
export interface Player {
    uuid: string;
    name_raw: string;
    name_clean: string;
    name_html: string;
}

export interface Config {
    server: {
        host: string;
        port?: number;
    }
    discord: {
        token: string;
    }
}

export interface CommandOptions {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    ephemeral?: boolean;
    handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export class Command {
    public name: string;
    public description: string;
    public options?: ApplicationCommandOptionData[];
    public ephemeral?: boolean = false;
    public handler: (interaction: ChatInputCommandInteraction) => Promise<void>;

    public constructor(co: CommandOptions) {
        this.name = co.name;
        this.description = co.description;
        this.options = co.options;
        this.ephemeral = co.ephemeral;
        this.handler = co.handler;
    };
}
