import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: "AIzaSyAjoO2KBO6nvWiPAlNg46a977YEjr1IQjk",
  authDomain: "vue-fin-crm-d1247.firebaseapp.com",
  databaseURL: "https://vue-fin-crm-d1247-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-fin-crm-d1247",
  storageBucket: "vue-fin-crm-d1247.appspot.com",
  messagingSenderId: "534038070015",
  appId: "1:534038070015:web:b7b3bd5c3e768c3c04c2ca",
  measurementId: "G-YLJB35FB71"
})


let app

firebase.auth().onAuthStateChanged( () => {
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


/*
  apiKey: "AIzaSyAjoO2KBO6nvWiPAlNg46a977YEjr1IQjk",
  authDomain: "vue-fin-crm-d1247.firebaseapp.com",
  projectId: "vue-fin-crm-d1247",
  storageBucket: "vue-fin-crm-d1247.appspot.com",
  messagingSenderId: "534038070015",
  appId: "1:534038070015:web:b7b3bd5c3e768c3c04c2ca",
  measurementId: "G-YLJB35FB71"
  */

