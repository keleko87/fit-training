import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import ApiService from './common/api.service';
import DateFilter from './common/date.filter';

import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';

// Darkly Bootswatch theme
import './styles/bootstrap.min.css';
// MDBVue
import 'mdbvue/lib/css/mdb.min.css';

import './styles/main.scss';
import './registerServiceWorker';

Vue.use(Vuelidate);
Vue.filter('date', DateFilter);

Vue.config.productionTip = false;

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
