<template>
    <v-dialog v-model="editDialog"  persistent max-width="400px">
        <v-btn slot="activator" color="primary" fab small dark>
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout align-center justify-center row wrap> 
                    <v-flex xs12>
                        <v-card-title class="font-weight-medium">Редактировать</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout align-center justify-center row wrap>
                    <v-flex xs12>
                        <v-text-field
                            name="title"
                            label="Заголовок"
                            id="title"
                            v-model ='editTitle'
                            required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row wrap>
                    <v-flex xs12>
                        <v-text-field
                        name="location"
                        label="Местоположение"
                        id="location"
                        v-model ='editLocation'                                      
                        required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row wrap>
                    <v-flex xs12>
                        <v-menu
                            ref="editMenu"
                            :close-on-content-click="false"
                            v-model="editMenu"
                            :nudge-right="40"
                            :return-value.sync="editDate"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="editDate"
                            label="Выберете дату"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="editDate"  @input="$refs.editMenu.save(editDate)"></v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row wrap>
                    <v-flex xs12>
                        <v-textarea
                        v-model="editDescription"
                        label="Описание"
                    ></v-textarea>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center row wrap>
                    <v-flex xs12 offset-xs3>
                        <v-card-actions>
                            <v-btn  flat class='primary' @click='onSaveChange'>
                                Сохранить
                            </v-btn>
                            <v-btn flat  @click='editDialog=false'>
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
    props: ['travel'],
    data(){
        return {
            editMenu: false,
            editDialog: false,
            editTitle: this.travel.title,
            editLocation: this.travel.location,
            editDate: this.travel.date,
            editDescription: this.travel.description,
        }
    },
    methods:{
        onSaveChange(){
            if(this.editTitle.trim() === '' || this.editLocation.trim() === ''){
                return
            }
            this.editDialog = false
            this.$store.dispatch('updateTravel', {
                id: this.travel.id,
                title: this.editTitle,
                location: this.editLocation,
                date: this.editDate,
                description: this.editDescription
            })
        }
    }
}
</script>
