<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      absolute
      height=100%
      temporary>
      <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{item.title}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Выйти</v-list-tile-content>
      </v-list-tile>  
    </v-navigation-drawer>
    <v-toolbar dark color="light-blue darken-1">
      <v-toolbar-side-icon class='hidden-md-and-up' @click.native.stop="sideNav=!sideNav"></v-toolbar-side-icon>
      
      <v-toolbar-title class="">
        <router-link to="/" tag="span" style="cursor: pointer">My Travel</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
      class='hidden-sm-and-down'
      >   
        <v-btn
        v-for="item in menuItems"
        :key="item.title"
        flat
        router
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout"
        >
          <v-icon left>exit_to_app</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      sideNav: null,
      
    }
  },
  computed:{
    menuItems(){
      let menuItems=[
        {icon: 'collections', title: 'Все путешествия', link: '/travels'},   
        {icon: 'lock_open', title: 'Войти', link: '/signin'},
        {icon: 'account_box', title: 'Зарегестрироваться', link: '/signup'}
      ]
      if(this.userIsAuthenticated){
        menuItems =[
          {icon: 'collections', title: 'Все путешествия', link: '/travels'},
          {icon: 'photo', title: 'Мои путешествия', link: '/userTravels'},
          {icon: 'add_photo_alternate', title: 'Создать путешествие', link: '/newTravel'},
        ]
      }
      return menuItems
    },
    userIsAuthenticated(){
      let userAuth = this.$store.getters.user
        return userAuth!==null && userAuth!==undefined
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>
