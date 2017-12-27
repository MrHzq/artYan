import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import vueAxios from "vue-axios";
import store from "./vuex/store";
Vue.use(vueAxios, axios);
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App }
});
