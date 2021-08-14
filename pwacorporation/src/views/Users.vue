<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm10 md8>
                  <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                        <v-toolbar-title>Usuarios</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                         <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">
                                    Nombre
                                </th>
                                <th class="text-left">
                                    Correo
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="(user, index) in users"
                                :key="index"
                                >
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td><v-btn @click="openEditDialog(user)">
                                 <v-icon>mdi-pencil</v-icon>
                               </v-btn></td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                       
                       <user-registration v-model="dialog" @closeDialogs = "closeDialogs"> </user-registration>

                       <template>
                            <v-btn
                            color="blue"
                            fab
                            dark
                            big
                            absolute
                            bottom
                            right
                            @click="dialog = true"
                            >
                            <v-icon>mdi-plus</v-icon>
                            </v-btn>
                         </template>


                       <template>
                         <v-dialog
                          v-model="editDialog"
                          max-width="700px"
                          persistent
                         >
                          <v-card>
                            <v-card-title>
                              <span class="text-h5"> Editar usuario</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field v-model="name" label = "Nombre completo" filled> </v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field v-model="email" label = "Email" filled> </v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field v-model="password" label = "Contraseña" type = "password" filled> </v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="phone" label = "Teléfono" type="number" min="0" filled> </v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="identification" label = "Cédula" type="number" min="0" filled> </v-text-field>
                                  </v-col>
                                </v-row>

                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="closeDialogs"
                              >
                                Cerrar
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="editUser"
                              >
                                Guardar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                         </v-dialog>
                       </template>
                        
                     </v-card-text>
                    </v-card>
                   
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from 'axios';
import UserRegistration from '../components/UserRegistration.vue';
export default {
  components: { UserRegistration },
   name: 'Users',
   data(){
     return{
       users: [],
       dialog: false,
       editDialog: false,
       id: '',
       name: '',
       email: '',
       password: '',
       phone: '',
       identification: ''
     }
   },
   methods:{
    fetchUsers() {
      axios.get("http://localhost:4000/users").then(
        response => {
          this.users = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    editUser(){
        let json = {
          "name" : this.name,  
          "email" : this.email,
          "password": this.password,
          "phone": this.phone,
          "identification": this.identification
        };
        axios.put('http://localhost:4000/users/' + this.id, json);
        this.closeDialogs();

    },
    openEditDialog(user){
        this.id = user.id
        this.editDialog = true;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.phone = user.phone;
        this.identification = user.identification;
    },
    closeDialogs(){
        this.editDialog = false;
        this.dialog = false;
    }
   },
    beforeMount(){
      this.fetchUsers();
    }
}
</script>
