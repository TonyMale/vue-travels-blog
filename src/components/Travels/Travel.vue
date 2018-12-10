<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="primary--text">{{travel.title}}</h2>
                        <template v-if="userIsCreated">
                            <v-spacer></v-spacer>
                            <app-edit-travel-dialog :travel="travel"></app-edit-travel-dialog>
                        </template>
                    </v-card-title>
                    <v-card-media
                        :src='travel.imageUrl'
                        height = 400px
                    ></v-card-media>
                    <v-card-text>
                        <span class="info--text">{{travel.date}}</span>
                        <span class="ml-3 info--text">{{travel.location}}</span>
                        <div class='mt-2 mb-2'>
                            {{travel.description}}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-favourite-travel-dialog
                         class="mr-2 mb-4"
                        :travelId="travel.id"
                        v-if="userIsAuthenticated && !userIsCreated"></app-favourite-travel-dialog>
                        <app-delete-travel-dialog class="mr-2 mb-4"
                        :travelId="travel.id"
                        v-if="userIsAuthenticated && userIsCreated"></app-delete-travel-dialog>     
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed:{
        travel(){
            return this.$store.getters.getTravel(this.id)
        },
        userIsAuthenticated (){
            return this.$store.getters.user
        },
        userIsCreated(){
            if(!this.userIsAuthenticated)
                return false
            return this.$store.getters.user.id === this.travel.creatorId
        }
    },
    watch:{
        travel(value){
            if(value ===undefined){
                this.$router.push('/')
            }
        }
    },
}
</script>

