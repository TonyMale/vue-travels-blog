<template>
    <v-dialog v-model="favouriteDialog"  persistent max-width="300px">
        <v-btn slot="activator" color="primary" accent>
            {{isFavouriteForUser ? 'Больше не нравится' : "Нравится"}}     
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap> 
                    <v-flex xs12>
                        <v-card-title v-if="!isFavouriteForUser" class="font-weight-medium">Добавить историю к себе в коллекцию?</v-card-title>
                        <v-card-title v-else class="font-weight-medium">Убрать из историю из коллекции?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex>
                        <v-card-text>Вы всегда можете изменить ваше решение.</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn  flat class='green--text darken-1' @click='onAgree'>
                                Подтвердить
                            </v-btn>
                            <v-btn flat class='red--text darken-1'  @click='favouriteDialog=false'>
                                Отмена 
                            </v-btn>
                        </v-card-actions> 
                    </v-flex>
                </v-layout>
            </v-container>
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['travelId'],
    data(){
        return {
            favouriteDialog: false,
        }
    },
    computed:{
        isFavouriteForUser(){
            console.log(this.$store.getters.user.favouriteTravels)
            return this.$store.getters.user.favouriteTravels.findIndex(travelId=>{
                return travelId === this.travelId
            }) >= 0
        }
    },
    methods:{
        onAgree(){
            if(this.isFavouriteForUser){
                console.log(this.travelId)
                this.$store.dispatch('deleteFavouriteTravel', this.travelId)
            }
            else{
                 this.$store.dispatch('addFavouriteTravel', this.travelId)
            }
            this.favouriteDialog= false
        }
    }
}
</script>
