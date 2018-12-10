<template>
<v-app>
  <v-container>
    <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
              v-if="loading"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    <v-layout justify-center row wrap>
      <v-flex lg10>
        <v-card class="travels__item" v-for ="travel in travels" :key="travel.id">
          <v-container fluid>
            <v-layout wrap row>
              <v-flex xs12 sm4 md3>
                <v-img
                :src="travel.imageUrl"
                height = 200
                >
                </v-img>
              </v-flex>
              <v-flex xs12 sm8 md9>
                  <v-card-title  pb-0>
                    <div class="title__name primary--text">{{travel.title}}</div>
                    <v-layout>
                      <v-flex><div class="subheading">{{travel.creatorName}}</div></v-flex>
                      <v-flex><div class="title__data subheading">{{travel.date}}</div></v-flex>
                    </v-layout>    
                  </v-card-title>
                  <v-card-text class="content">
                    <div>
                         {{travel.description}}
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn flat light :to= "'/travels/' + travel.id">
                      Читать далее
                      <v-icon right>arrow_forward</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
          return this.$store.getters.travels
        },
      
      loading(){
        return this.$store.getters.loading
      }
    }

  }
</script>

<style <style lang="scss" scoped>
  .title__name{
    font-size: 2em;
    width: 100%;
  }
  .title__data{
    float: right;
  }
  .content {
    overflow: hidden;
    padding: 0 20px;
    height: 55px;
    line-height: 25px;
  }
  .travels__item{
    margin-bottom: 15px;
  }
</style>

