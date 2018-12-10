import Vue from 'vue'
import './plugins/vuetify'
import * as firebase from 'firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Alert from './components/Shared/Alert'
import Edit from './components/Travels/Edit/EditTravelDialog'
import Delete from './components/Travels/Delete/DeleteTravelDialog'
import AddInFavourite from './components/Travels/Favourites/FavouriteTravelDialog'

Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('app-edit-travel-dialog', Edit)
Vue.component('app-favourite-travel-dialog', AddInFavourite)
Vue.component('app-delete-travel-dialog', Delete)

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyBWJFGcVMKGKkYuNQ6QbaEAXVjlgwSaARM",
      authDomain: "travel-blogs-cb332.firebaseapp.com",
      databaseURL: "https://travel-blogs-cb332.firebaseio.com",
      projectId: "travel-blogs-cb332",
      storageBucket: "travel-blogs-cb332.appspot.com",
    })
    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadTravels')
  }
}).$mount('#app')
