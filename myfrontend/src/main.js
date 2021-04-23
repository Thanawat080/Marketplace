import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'
import router from './router/index'
import 'cookie/index'
import axios from "axios";
import Vuelidate from 'vuelidate'

import '@fortawesome/fontawesome-free/css/all.css'
axios.defaults.withCredentials = true

Vue.config.productionTip = false
Vue.use(Vuelidate)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
