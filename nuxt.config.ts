// This bug is reproduced when vue.js plugin (bundled 202.6397.115) is enabled
// Type of config.components is infereded as vue.ComponentOptions (expected "any")

// I need create nuxt config
import {NuxtConfig} from "@nuxt/types";

// But my config contains a few custom values which aren't in NuxtConfig
interface Config extends NuxtConfig {
    [key: string]: any;
}

const config: Config = {
    // NuxtConfig fields
    mode: "spa",
    target: "server",

    // custom values
    customValue: 123, // adding this field doesn't lead to error (see ./config-custom-ok.png)
    components: false, // error (see ./config-error.png)
};

export default config;

// If config contains "components" it leads to error.
// Any other custom field doesn't lead to error
// Click on "component" opens file "node_modules/vue/types/options.d.ts", line 102, interface ComponentOptions
// see config-click.png
// tsc compiles it without errors
