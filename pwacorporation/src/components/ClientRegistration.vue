<template>
    <v-dialog
    :value="value" @input="$emit('input', $event)"
    max-width="700px"
    persistent
    >
    
    <v-card>
        <v-card-title>
        <span v-if="type === 'Natural'" class="text-h5"> Añadir persona natural</span>
        <span v-else class="text-h5"> Añadir persona jurídica</span>
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
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="phone" label = "Teléfono" type="number" min="0" filled> </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-if="type === 'Natural'" v-model="identification" label = "Cédula" type="number" min="0" filled> </v-text-field>
                <v-text-field v-else v-model="identification" label = "NIT" type="number" min="0" filled> </v-text-field>
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
   name: 'ClientRegistration',
   props:['value', 'type'],
   data(){
     return{
       name: '',
       email: '',
       phone: '',
       identification: ''
     }
   },
   methods:{
    register(){
        let json = {
          "name" : this.name,  
          "email" : this.email,
          "phone": this.phone,
          "identification": this.identification,
          "type": this.type
        };
        axios.post('http://localhost:4000/clients', json);
        this.closeDialogs();
    },
    closeDialogs(){
        this.name = "";
        this.email = "";
        this.phone = "";
        this.identification = "";
        this.$emit('closeDialogs')
    }
   },
}
</script>