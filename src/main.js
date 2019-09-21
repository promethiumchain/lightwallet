import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
 
Vue.use(VModal)
 


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
