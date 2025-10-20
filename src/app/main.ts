import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";

import App from "./App.vue";
import router from "./router";

import "./main.scss";

// Create Vue app instance
const app = createApp(App);

// Install plugins
app.use(createPinia());
app.use(router);

// Register global component
app.component("VueFeather", VueFeather);

// Mount the app
app.mount("#app");
