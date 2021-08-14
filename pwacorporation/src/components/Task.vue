<template>
    <v-card min-width="550px" class="pa-md-5 mx-lg-auto">
        <v-row>
            <v-col cols="2" sm="2" md="2">
                <v-card-text> Id: {{taskId}}</v-card-text>
            </v-col>
            <v-col cols="10" sm="10" md="10">
                <v-text-field
                    v-model = "name" @change="updateTask"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-checkbox v-model = "completed" label = "Completado" @change="updateTask"> </v-checkbox>
        <v-text-field
            placeholder="Descripción" v-model = "description" @change="updateTask"
          ></v-text-field>

        <v-card-text>Imágenes:</v-card-text>
        <v-list>
            <v-list-item
            v-for="(image, i) in images"
                :key="i">
                <v-img
                    max-height="400"
                    max-width="400"
                    :src="'http://localhost:4000/' + image.path">
                </v-img>
                <template>
                <v-btn
                color="red"
                fab
                dark
                small
                absolute
                top
                right
                @click="deleteImage(image.pk_id)"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
            </v-list-item>   
        </v-list> 

        <v-file-input 
            label="Añadir imagen"
            outlined
            dense
            small-ships
            @change="uploadImage($event)"
            >
        </v-file-input>
    </v-card>
</template>

<script>
import axios from 'axios';
export default {
   name: 'Task',
   props: ['taskInfo'],
   data(){
     return{
       images: [],
       name: this.taskInfo.name,
       description: this.taskInfo.description,
       completed: this.taskInfo.completed,
       taskId: this.taskInfo.pk_task_id,
       addTaskDialog: false,

       selectedFile: null
     }
   },
   methods:{
    fetchImages() {
      axios.get("http://localhost:4000/projects/tasks/images/" + this.taskId).then(
        response => {
          this.images = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    updateTask()
    {
        let json = {
          "name" : this.name,  
          "description" : this.description,
          "completed": this.completed
        };
        axios.put("http://localhost:4000/projects/tasks/" + this.taskId, json).then(
        response => {
          console.log(response.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    uploadImage(){
        this.selectedFile = event.target.files[0];
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        axios.post("http://localhost:4000/projects/tasks/images/" + this.taskId, fd).then(
            response => {
          this.selectedFile = null;
            this.fetchImages();
        },
        error => {
          console.log(error);
        }
      );
        
    },
    getPath(path){
           console.log("http://localhost:4000/" + path);
           return "http://localhost:4000/" + path;
    },
    deleteImage(id)
    {
        axios.delete("http://localhost:4000/projects/tasks/images/" + id).then(
            response => {
          this.selectedFile = null;
            this.fetchImages();
        },
        error => {
          console.log(error);
        }
      );
    },
   },
    beforeMount(){
        this.fetchImages();
    }
}
</script>