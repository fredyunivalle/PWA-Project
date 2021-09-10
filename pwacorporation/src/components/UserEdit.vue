<template>
    <v-dialog
    :value="value" @input="$emit('input', $event)"
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
                <v-text-field v-model="userData.name" label = "Nombre completo" filled> </v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="12">
                <v-text-field v-model="userData.email" label = "Email" filled> </v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="12">
                <v-text-field v-model="userData.password" label = "Contraseña" type = "password" filled> </v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="userData.phone" label = "Teléfono" type="number" min="0" filled> </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="userData.identification" label = "Cédula" type="number" min="0" filled> </v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-combobox
                v-model="userData.position"
                :items="items"
                label="Posición"
                dense
                filled
                clearable
            ></v-combobox>
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

<script>
import axios from 'axios';
export default {
   name: 'UserEdit',
   props:['value', 'userData'],
   data(){
     return{
         items:[
         'Administrador',
         'Arquitecto',
         'Obrero',
       ],
     }
   },
   methods:{
    editUser(){
        let json = {
          "name" : this.userData.name,  
          "email" : this.userData.email,
          "password": this.userData.password,
          "phone": this.userData.phone,
          "identification": this.userData.identification,
          "position": this.userData.position
        };
        console.log(json);
        axios.put('http://localhost:4000/users/' + this.userData.id, json);
        this.closeDialogs();
    },
    closeDialogs(){
        this.$emit('closeDialogs')
    },
   },
}
</script>