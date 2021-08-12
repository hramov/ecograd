import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FetchDataProvider } from "./custom/fetch-data.provider";

FetchDataProvider.init();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount("#app");
