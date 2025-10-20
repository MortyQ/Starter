import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./main.scss";

// Create Vue app instance
const app = createApp(App);

// Install plugins
app.use(createPinia());
app.use(router);

// Mount the app
app.mount("#app");
