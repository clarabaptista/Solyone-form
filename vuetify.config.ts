import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

// Configure a plain white theme that will be the default for the app.
// This sets background/surface to pure white so Vuetify components use white
// surfaces, and provides sensible text/primary colors for contrast.
export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "white",
    themes: {
      white: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          primary: "#1976D2",
          "on-primary": "#FFFFFF",
          secondary: "#424242",
          "on-secondary": "#FFFFFF",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
          // helpful explicit text colors
          "text-primary": "#000000",
          "text-secondary": "#333333",
        },
      },
    },
  },
});
