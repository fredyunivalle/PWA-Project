<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm10 md8>
                 <v-row>
                   <v-col xs12 sm12 md6>
                  <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                        <v-toolbar-title>Personas naturales</v-toolbar-title>
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
                                v-for="(client, index) in naturalClients"
                                :key="index"
                                >
                                <td>{{ client.name }}</td>
                                <td>{{ client.email }}</td>
                                <td><v-btn @click="openEditNaturalDialog(client)">
                                 <v-icon>mdi-pencil</v-icon>
                               </v-btn></td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                       
                       <client-registration type = "Natural" v-model="dialogNatural" @closeDialogs = "closeDialogs"> </client-registration>

                       <template>
                            <v-btn
                            color="blue"
                            fab
                            dark
                            big
                            absolute
                            bottom
                            right
                            @click="dialogNatural = true"
                            >
                            <v-icon>mdi-plus</v-icon>
                            </v-btn>
                         </template>


                       <clients-edit type = "Natural" v-model="editNaturalDialog" @closeDialogs = "closeDialogs" :clientData="currentClient"></clients-edit>
                        
                     </v-card-text>
                    </v-card>
                   </v-col>






                   <v-col xs12 sm12 md6>
                  <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                        <v-toolbar-title>Personas jurídicas</v-toolbar-title>
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
                                v-for="(client, index) in legalClients"
                                :key="index"
                                >
                                <td>{{ client.name }}</td>
                                <td>{{ client.email }}</td>
                                <td><v-btn @click="openEditLegalDialog(client)">
                                 <v-icon>mdi-pencil</v-icon>
                               </v-btn></td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                       
                       <client-registration type = "Legal" v-model="dialogLegal" @closeDialogs = "closeDialogs"> </client-registration>

                       <template>
                            <v-btn
                            color="blue"
                            fab
                            dark
                            big
                            absolute
                            bottom
                            right
                            @click="dialogLegal = true"
                            >
                            <v-icon>mdi-plus</v-icon>
                            </v-btn>
                         </template>


                       <clients-edit type = "Legal" v-model="editLegalDialog" @closeDialogs = "closeDialogs" :clientData="currentClient"></clients-edit>
                        
                     </v-card-text>
                    </v-card>
                   </v-col>
                 </v-row>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from 'axios';
import ClientRegistration from '../components/ClientRegistration.vue';
import ClientsEdit from '../components/ClientsEdit.vue';
export default {
  components: { ClientRegistration, ClientsEdit},
   name: 'Clients',
   data(){
     return{
       naturalClients: [],
       legalClients: [],
       dialogNatural: false,
       dialogLegal: false,
       editNaturalDialog: false,
       editLegalDialog: false,
       currentClient: ""
     }
   },
   methods:{
    fetchNaturalClients() {
      axios.get("http://localhost:4000/clients/natural").then(
        response => {
          this.naturalClients = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    fetchLegalClients() {
      axios.get("http://localhost:4000/clients/legal").then(
        response => {
          this.legalClients = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },

    openEditNaturalDialog(client){
        this.currentClient = client
        this.editNaturalDialog = true;
    },
    openEditLegalDialog(client){
        this.currentClient = client
        this.editLegalDialog = true;
    },
    closeDialogs(){
        this.editNaturalDialog = false;
        this.dialogNatural = false;
        this.editLegalDialog = false;
        this.dialogLegal = false;
    }
   },
    beforeMount(){
      this.fetchNaturalClients();
      this.fetchLegalClients();
    }
}
</script>
