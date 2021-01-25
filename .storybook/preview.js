import { app } from "@storybook/vue3";

import YourPlugin from "../src/main"; // whatever your plugin entry point is

app.use(YourPlugin);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}