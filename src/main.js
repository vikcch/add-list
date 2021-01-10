import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import '@/assets/global.css';

Vue.component('icon', require('@/assets/images-svg.vue').default);

window.EventVue = new Vue;

new Vue({
  render: h => h(App),
}).$mount('#app')
