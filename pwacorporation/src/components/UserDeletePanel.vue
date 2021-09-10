<template>
        <v-row justify="center">
            <v-dialog
            :value="value" @input="$emit('input', $event)"
            persistent
            max-width="290"
            >
            <v-card>
            <v-card-title class="text-h5">
                ¿Desea eliminar este usuario?
            </v-card-title>
            <v-text-field v-model="userData.name"  filled disabled> </v-text-field>
            <v-card-text>Una vez eliminado el usuario no podrá recuperarse la informacion</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                    color="green darken-1"
                    text
                    @click="closeDialogs"
                    >
                    Cancelar
                    </v-btn>
                    <v-btn
                    color="green darken-1"
                    text
                    @click="deleteUser"
                    >
                    Seguir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios';
export default {
   name: 'UserEdit',
   props:['value', 'userData'],
   methods:{
    deleteUser(){
        axios.delete('http://localhost:4000/users/'+ this.userData.id);
        this.closeDialogs();
    },
    closeDialogs(){
        this.$emit('closeDialogs')
    },
   },
}
</script>