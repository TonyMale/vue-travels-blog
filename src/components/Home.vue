<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-center  row wrap>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
              v-if="loading"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout  align-center justify-center fill-height row v-if="!loading">
        <v-flex xs12 sm10 md8 lg6>
          <v-carousel style="cursor: pointer" height= 400>
            <v-carousel-item
              v-for="item in travels"
              :key="item.id"
              :src="item.imageUrl"
              reverse-transition="fade"
              transition="fade"
              @click ="onLoadTravel(item.id)"
            >
              <div class="carousel__title">{{item.title}}</div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>  
  </v-app>
</template>

<script>


  export default {
    data(){
      return{
      }
    },
    computed:{
      travels(){
        return this.$store.getters.carouselTravels
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods:{
      onLoadTravel (id){
        this.$router.push('/travels/' +id);
      }
    }
  }
</script>

<style scope>
  .carousel__title{
    position: absolute;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 1.5em;
    background-color: rgb(0,0,0,0.5);
    padding: 10px 0;
  }
</style>
