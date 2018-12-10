<template>
<v-app>
    <v-container>
      <v-layout align-center justify-center wrap row fill-height>
          <v-flex xs12 sm6>
              <v-layout row v-if="error">
                <v-flex xs12 >
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
            </v-layout>
              <v-card>
                  <v-card-text>
                      <v-container>
                          <v-form @submit.prevent="onSingup" ref="form" v-model="valid" lazy-validation>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field
                                        name="name"
                                        label="Введите Имя"
                                        id="name"
                                        v-model="name"
                                        type="name"
                                        required
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field
                                        name="email"
                                        label="Введите e-mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field
                                        name="password"
                                        label="Введите пароль"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field
                                        name="confirmPassword"
                                        label="Введите еще раз пароль"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
                                        required
                                        :rules ="[comparePasswords]"
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout>
                                  <v-flex xs12>
                                      <v-btn class='primary' type="submit"
                                        :disabled="loading"
                                        :loading="loading"
                                      >
                                      Зарегестрироваться</v-btn>
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
            valid: true,
            name:'',
            nameRules: [
                v => !!v || 'Введите имя'         
            ],
            email:'',
            emailRules: [
                v => !!v || 'Введите E-mail',
                v => /.+@.+/.test(v) || 'E-mail введен неверно'
            ],
            password:'',
            confirmPassword:''
        }       
    },
    computed:{
        comparePasswords(){
            return this.password !== this.confirmPassword ? "Пароли не совпадают" : ""
        },
        user(){
            return this.$store.getters.user
        },
        error(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    watch:{
        user(value){
            if(value!==null && value !==undefined){
                this.$router.push('/')
            }
        }
    },
    methods:{
        onSingup(){
            this.$store.dispatch('signUserUp', {name: this.name, email: this.email, password: this.password})
        },
        onDismissed(){
            this.$store.dispatch('clearError')
        }
    },

}
</script>

<style>

</style>

