import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './routes'
import {createPinia} from 'pinia'
import userStore from './store/user'
import { createHead, Head } from '@egoist/vue-head'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const head = createHead()
loadFonts()
const pinia = createPinia()

createApp({...App, mounted() {
  const $user = userStore();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  if(Object.keys(userData).length > 0){
    $user.setUser(userData);
  }
}})
  .component('Head', Head)
  .component('DatePicker', Datepicker)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .use(head)
  .mount('#app')
 