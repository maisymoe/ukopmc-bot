import { ApplicationCommandOptionData, ChatInputCommandInteraction } from "discord.js";

export interface Config {
    server: {
        ip: string;
        port?: number;
    }
    discord: {
        whitelist: string[];
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