import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Travels from './components/Travels/Travels'
import Travel from './components/Travels/Travel'
import NewTravel from './components/Travels/NewTravel'
import Signin from './components/User/Signin'
import Signup from './components/User/Signup'
import UserTravels from './components/Travels/UserTravels'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/travels',
      name: 'travels',
      component: Travels
    },
    {
      path: '/userTravels',
      name: 'userTravels',
      component: UserTravels
    },
    {
      path: '/travels/:id',
      name: 'travel',
      props: true,
      component: Travel
    },
    {
      path: '/newTravel',
      name: 'newTravel',
      component: NewTravel
    },
    {
      path: '/signin',
      name: 'signin ',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup ',
      component: Signup
    }
  ]
})
