<template>
<v-app>
      <v-container>
      <v-layout align-center justify-center row>
          <v-flex >
              <h4 class="display-1 primary--text  new-travel__title">Создать новое путешествие</h4>
          </v-flex>
      </v-layout>
      <v-layout align-center justify-center row >
          <v-flex xs12 sm6>
              <v-card>
                  <v-card-text>
                      <v-container>
                          <v-form @submit.prevent="onNewTravel" ref="form" >
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field
                                        name="title"
                                        label="Заголовок"
                                        id="title"
                                        v-model ='title'
                                        required
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field
                                        name="location"
                                        label="Местоположение"
                                        id="location"
                                        v-model ='location'                                      
                                        required
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-menu
                                        ref="addMenu"
                                        :close-on-content-click="false"
                                        v-model="addMenu"
                                        :nudge-right="40"
                                        :return-value.sync="date"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <v-text-field
                                        slot="activator"
                                        v-model="date"
                                        label="Выберете дату"
                                        prepend-icon="event"
                                        readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="date"  @input="$refs.addMenu.save(date)"></v-date-picker>
                                    </v-menu>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-btn raised @click="onPickFile" class="primary">Загрузить изображение</v-btn>
                                      <input
                                        type="file"
                                        style="display:none"
                                        ref="fileInput"
                                        accept="image/*"
                                        @change="onFilePicked"
                                        >
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-card-media
                                      :src="imageUrl"
                                      >
                                      </v-card-media>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-textarea
                                        v-model="description"
                                        auto-grow
                                        label="Описание"
                                        rows="1"
                                    ></v-textarea>
                                  </v-flex>
                              </v-layout>
                              <v-layout>
                                  <v-flex xs12 offset-xs7>
                                      <v-btn  type="submit" class='primary' :disabled="!formIsValid">
                                        Создать
                                      </v-btn>
                                  </v-flex>
                              </v-layout>
                          </v-form>
                      </v-container>
                  </v-card-text>
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
            addMenu: false,
            title: '',
            location: '',
            date: new Date().toISOString().slice(0,10),
            imageUrl:'',
            description:'',
            image: null
        }
    },
    computed:{
        formIsValid(){
            return this.title !== '' && this.location !== '' && this.imageUrl !== ''
        },
        
    },
    methods:{
        onNewTravel(){
            if(!this.formIsValid){
                return
            }
            if(!this.image){
                return
            }   
            const travel={
                title: this.title,
                location: this.location,
                date: this.date,
                image: this.image,
                description: this.description
            }
            this.$store.dispatch('newTravel', travel)
            this.$router.push('/travels')
        },
        onPickFile(){
            this.$refs.fileInput.click()
        },
        onFilePicked(event){
            const files = event.target.files
            let fileName = files[0].name
            if(fileName.lastIndexOf('.')<=0){
                return alert("Некорректное название файла")
            }               
            const fileReader = new FileReader()
            fileReader.addEventListener('load', ()=>{
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>

<style>
    .new-travel__title{
        margin-bottom: 30px;
        opacity: 0.5;
        text-align: center;
    }
</style>
