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
                                <td><v-btn @click="openEditDialog(client)">
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


                       <template>
                         <v-dialog
                          v-model="editDialog"
                          max-width="700px"
                          persistent
                         >
                          <v-card>
                            <v-card-title>
                              <span class="text-h5"> Editar cliente</span>
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
                                    <v-text-field v-model="phone" label = "Teléfono" type="number" min="0" filled> </v-text-field>
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
                                @click="editClient"
                              >
                                Guardar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                         </v-dialog>
                       </template>
                        
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
                                <td><v-btn @click="openEditDialog(client)">
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


                       <template>
                         <v-dialog
                          v-model="editDialog"
                          max-width="700px"
                          persistent
                         >
                          <v-card>
                            <v-card-title>
                              <span class="text-h5"> Editar cliente</span>
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
                                    <v-text-field v-model="phone" label = "Teléfono" type="number" min="0" filled> </v-text-field>
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
                                @click="editClient"
                              >
                                Guardar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                         </v-dialog>
                       </template>
                        
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
export default {
  components: { ClientRegistration},
   name: 'Clients',
   data(){
     return{
       naturalClients: [],
       legalClients: [],
       dialogNatural: false,
       dialogLegal: false,
       editDialog: false,
       id: '',
       specificId: '',
       name: '',
       email: '',
       phone: '',
       identification: '',
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
    editClient(){
        let json = {
          "name" : this.name,  
          "email" : this.email,
          "phone": this.phone,
          "identification": this.identification
        };
        axios.put('http://localhost:4000/clients/' + this.id, json);
        this.closeDialogs();

    },
    openEditDialog(client){
        this.id = client.id
        this.editDialog = true;
        this.name = client.name;
        this.email = client.email;
        this.phone = client.phone;
    },
    closeDialogs(){
        this.editDialogNatural = false;
        this.dialogNatural = false;
        this.editDialogLegal = false;
        this.dialogLegal = false;
    }
   },
    beforeMount(){
      this.fetchNaturalClients();
      this.fetchLegalClients();
    }
}
</script>
