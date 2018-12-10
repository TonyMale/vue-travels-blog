<template>
    <v-dialog v-model="deleteDialog"  persistent max-width="300px">
        <v-btn slot="activator" color="primary" accent>
            Удалить
        </v-btn>
        <v-card>
            <v-container>
                <v-layout  row wrap> 
                    <v-flex xs12>
                        <v-card-title class="font-weight-medium">Желаете удалить запись?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex>
                        <v-card-text>Запись будет удалена безвозратно.</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn  flat class='red--text darken-1' @click='onDelete'>
                                Удалить
                            </v-btn>
                            <v-btn flat class='green--text darken-1'  @click='deleteDialog=false'>
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
            deleteDialog: false,
        }
    },
    computed:{
    },
    methods:{
        onDelete(){
            this.$store.dispatch('deleteTravel', this.travelId)
            this.deleteDialog= false
        }                    
    }
}
</script>
