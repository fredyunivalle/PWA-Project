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
                               </v-btn>
                               
                               <v-btn @click="openDeleteDialog(user)">
                                 <v-icon>mdi-cancel</v-icon>
                                </v-btn>
                               
                               </td>
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


                  

                       <user-edit v-model="editDialog" @closeDialogs = "closeDialogs" :userData="currentUser"></user-edit>
                       <user-delete-panel v-model="dialogDelete" @closeDialogs = "closeDialogs" :userData="currentUser"></user-delete-panel>
                        
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
import UserEdit from '../components/UserEdit.vue';
import UserDeletePanel from '../components/UserDeletePanel.vue';
export default {
  components: { UserRegistration, UserEdit, UserDeletePanel },
   name: 'Users',
   data(){
     return{
       currentUser: '',
       users: [],
       dialog: false,
       editDialog: false,
       dialogDelete: false,
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
    deleteUser(){
        axios.delete('http://localhost:4000/users/'+ this.id);
        this.closeDialogs();
    },
    openEditDialog(user){
      this.editDialog = true;
      this.currentUser = user;
    },
    openDeleteDialog(user){
        this.dialogDelete = true;
        this.currentUser = user;
    },
    closeDialogs(){
        this.editDialog = false;
        this.dialog = false;
        this.dialogDelete = false;
        this.fetchUsers();
    }
   },
    beforeMount(){
      this.fetchUsers();
    }
}
</script>
