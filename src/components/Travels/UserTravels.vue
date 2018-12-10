<template>
<v-app>
  <v-container>
    <v-layout row wrap mb-3>
      <v-flex offset-sm1 xs4 sm3 lg2>
        <v-select
          v-model="select"
          :items="items"
          item-text="state"
          item-value="value"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
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
          select: {state: 'Все', value: "allTravels"},
          items: [
              {state: 'Все', value: "allTravels"},
              {state: 'Созданные', value: "createdTravels"},
              {state: 'Нравятся', value: "favouriteTravels"}
          ]
      }
    },
    computed:{
      travels(){
          switch (this.select.value){
              case 'allTravels':
                return this.$store.getters.userTravels
              case 'createdTravels':
                return this.$store.getters.createdTravels
              case 'favouriteTravels':
                return this.$store.getters.favouriteTravels
          }
            
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

