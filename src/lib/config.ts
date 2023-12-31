import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { proxy, subscribe } from "valtio/vanilla";
import { Config } from "../def";

const configFile = join(__dirname, "../", "../", "config.json");
let parsedConfig;

try {
    parsedConfig = JSON.parse(readFileSync(configFile, "utf8"));
} catch (e) {
    throw new Error(`Could not read/parse config file at ${configFile}`);
}

const config: Config = proxy(parsedConfig);

subscribe(config, () => {
    try {
        writeFileSync(configFile, JSON.stringify(config, null, 4));
    } catch (e) {
        throw new Error(`Could not write config file at ${configFile}`);
    }
});

export default config;
