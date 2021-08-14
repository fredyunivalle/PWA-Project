<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-account-circle  "
                              name="login"
                              label="Email"
                              type="text"
                              v-model="email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-on:click="login" color="primary" to="/">Iniciar sesión</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
         <template>
                  <v-row justify="center">
                     <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="400"
                     >
                        <v-card>
                           <v-card-title>Correo o contraseña incorrecta.</v-card-title>
                           <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                 color="blue-darken-1"
                                 text
                                 @click="dialog = false"
                              >
                                 Aceptar
                              </v-btn>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </v-row>
               </template>
      </v-content>
   </v-app>
</template>

<script>
import axios from 'axios';
export default {
   name: 'Login',
   props: {
      source: String,
   },
   data(){
     return{
       email: "",
       password: "",
       dialog: false
     }
   },

   methods:{
    login(){
        let json = {
          "email" : this.email,
          "password": this.password
        };
        axios.post('http://localhost:4000/login', json)
        .then( data =>{
          console.log(data.data);
           if(data.data.message == "Ok"){
              this.$router.push("/users");
           }else{
             this.dialog = true;
           }
        })
    }
  }
};
</script>

<style></style>
