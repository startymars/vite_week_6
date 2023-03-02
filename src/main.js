import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { localize, setLocale } from '@vee-validate/i18n';
import App from './App.vue';
import router from './router';
import './assets/all.scss';

defineRule('email', email);
defineRule('required', required);

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
