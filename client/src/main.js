import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import VueMaterial from 'vue-material';
import ApiService from './common/api.service';
import DateFilter from './common/date.filter';
import 'nprogress/nprogress.css';

// Bootswatch theme
// import '../src/assets/css/bootstrap-darkly.min.css';
// MDBVue
import 'bootstrap-css-only/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbvue/lib/css/mdb.min.css';
// Vue Material
import 'vue-material/dist/vue-material.min.css';
import './assets/scss/main.scss';
import './registerServiceWorker';

Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.filter('date', DateFilter);

Vue.config.productionTip = false;

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
