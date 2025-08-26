export default defineNuxtPlugin((nuxtApp) => {
  // check https://vuetify-nuxt-module.netlify.app/guide/nuxt-runtime-hooks.html
  nuxtApp.hook("vuetify:before-create", (options) => {
    // run only on client to avoid SSR mismatch
    if (import.meta.client) {
      // ensure theme key is set to our 'white' theme on the runtime vuetify options
      const vo = (options as any)?.vuetifyOptions;
      if (vo) {
        vo.theme = vo.theme || {};
        vo.theme.defaultTheme = "white";
      } else {
        // fallback: attach a vuetifyOptions object
        (options as any).vuetifyOptions = { theme: { defaultTheme: "white" } };
      }
      // helpful debug output in dev
      console.log(
        "vuetify:before-create - forcing theme=white",
        (options as any)?.vuetifyOptions?.theme
      );
    }
  });
});
