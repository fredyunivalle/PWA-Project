<template>
    <v-dialog
        :value="value" @input="$emit('input', $event)"
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
                            <v-text-field v-model="clientData.name" label = "Nombre completo" filled> </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                            <v-text-field v-model="clientData.email" label = "Email" filled> </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="clientData.phone" label = "Teléfono" type="number" min="0" filled> </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-if="type === 'Natural'" v-model="clientData.identification" label = "Cédula" type="number" min="0" filled> </v-text-field>
                            <v-text-field v-else v-model="clientData.identification" label = "NIT" type="number" min="0" filled> </v-text-field>
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

<script>
import axios from 'axios';
export default {
   name: 'ClientEdit',
   props:['value', 'type', 'clientData'],

   methods:{
    editClient(){
        let json = {
          "name" : this.clientData.name,  
          "email" : this.clientData.email,
          "phone": this.clientData.phone,
          "identification": this.clientData.identification,
          "type": this.type
        };
        axios.put('http://localhost:4000/clients/'  + this.clientData.pk_client_id, json);
        this.closeDialogs();
    },
    closeDialogs(){
        this.$emit('closeDialogs')
    }
   },
}
</script>