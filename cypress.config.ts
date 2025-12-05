import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "yf3jg4",
  e2e: {
    baseUrl: "http://localhost:8101",
    experimentalPromptCommand: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
