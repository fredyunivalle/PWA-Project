<template>
    <v-dialog
    :value="value" @input="$emit('input', $event)"
    max-width="700px"
    persistent
    >
    
    <v-card>
        <v-card-title>
        <span class="text-h5"> Crear proyecto</span>
        </v-card-title>
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-text-field v-model="name" label = "Nombre del proyecto" filled> </v-text-field>
            </v-col>
            </v-row>
            <v-col>
            <v-row>
            <select v-model="personincharge" outlined>
                <option disabled value="Seleccione el ID de el encargado">Seleccione un ID</option>
                <option v-for="(user, index) in users" :key="index">
                    {{user.name}}
                </option>
            </select>
            <span>El ID de el encargado es {{ personincharge }}</span>
            </v-row>
            </v-col>
            <v-row>
            <v-col cols="12">
                <v-text-field v-model="description" label = "Descripción" filled> </v-text-field>
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
            @click="register"
        >
            Guardar
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>



<script>
import axios from 'axios';
export default {
   name: 'ProjectRegistration',
   props:['value'],
   data(){
     return{
       name: '',
       description: '',
       personincharge:[],
       users:[],
     }
   },
   computed:{
       formatearUsuarios(){
           return Object.values(this.users);
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
    register(){
        let json = {
          "name" : this.name,  
          "description" : this.description,
          "personInCharge": this.personincharge,
        };
        
        axios.post('http://localhost:4000/projects', json);
        this.closeDialogs();
    },
    closeDialogs(){
        this.name = "";
        this.description = "";
        this.personincharge = "";
        this.$emit('closeDialogs')
    }
   },
    beforeMount(){
        this.fetchUsers();
    }
}
</script>