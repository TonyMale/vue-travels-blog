<template>
    <v-app>
        <v-container>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 sm6>
                    <v-layout wrap row  v-if="error">
                        <v-flex xs12>
                            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                        </v-flex>
                    </v-layout>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent="onSingin" ref="form" v-model="valid" lazy-validation>
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
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-btn class='primary' type="submit"
                                                :disabled="loading"
                                                :loading="loading"
                                            >Войти</v-btn>
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
            email:'',
            emailRules: [
                v => !!v || 'Введите E-mail',
                v => /.+@.+/.test(v) || 'E-mail введен неверно'
            ],
            password:'',
        }       
    },
    computed:{
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
        onSingin(){
            this.$store.dispatch('signUserIn', { email: this.email, password: this.password})
        },
        onDismissed(){
            this.$store.dispatch('clearError')
        }
    },

}
</script>

<style>

</style>


