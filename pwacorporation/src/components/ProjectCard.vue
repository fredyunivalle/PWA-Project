<template>
    <v-card min-width="600px" class="pa-md-3 mx-lg-auto elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>{{name}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>Descripción:</v-card-text>
            <v-textarea v-model="description" @change="updateProject"></v-textarea>
            <v-card-text>Tareas:</v-card-text>
            <v-list flat>
                <v-list-item
                v-for="(task, i) in tasks"
                :key="i">    
                    <task :taskInfo="task"></task>
                    <template>
                      <v-btn
                      color="red"
                      fab
                      dark
                      big
                      absolute
                      top
                      left
                      @click="deleteTask(task.pk_task_id)"
                      >
                      <v-icon>mdi-delete</v-icon>
                      </v-btn>
                  </template>
                </v-list-item>
            </v-list>
            <v-spacer></v-spacer>
            <v-row
            align="center"
            justify="space-around"
            >
              <template>
                  <v-btn
                  color="blue"
                  dark
                  medium
                  absolute
                  bottom
                  center
                  @click="createTask"
                  >
                  <v-icon>mdi-plus</v-icon>
                  Añadir tarea
                  </v-btn>
              </template>
            </v-row>
            <google-map :latitude= this.latitude :longitude= this.longitude :title="'Titulo Marcador'" @update = "updatePosition"></google-map>
    </v-card>
</template>

<script>
import axios from 'axios';
import Task from './Task.vue';
import GoogleMap from './GoogleMap.vue';
export default {
  components: { Task, GoogleMap },
   name: 'ProjectCard',
   props: ['projectInfo'],
   data(){
     return{
       tasks: [],
       name: this.projectInfo.name,
       description: this.projectInfo.description,
       projectId: this.projectInfo.pk_project_id,
       longitude: this.projectInfo.longitude,
       latitude: this.projectInfo.latitude,
       addTaskDialog: false
     }
   },
   methods:{
     updatePosition(longitude, latitude)
     {
       this.longitude = longitude;
       this.latitude = latitude;
       this.updateProject();
     },
     updateProject(){
      let json = {
          "name" : this.name,  
          "description" : this.description,
          "personInCharge": this.personInCharge,
          "longitude": this.longitude,
          "latitude": this.latitude
        };
        console.log(json);
        axios.put("http://localhost:4000/projects/" + this.projectId, json);
        console.log("¿Hola?");
    },
    fetchTasks() {
      axios.get("http://localhost:4000/projects/tasks/" + this.projectId).then(
        response => {
          this.tasks = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    createTask(){
        let json = {
          "name" : "Nueva tarea",  
          "description" : "",
          "completed": false
        };
        axios.post("http://localhost:4000/projects/tasks/" + this.projectId, json);
        this.fetchTasks();
    },
    deleteTask(id)
    {
        axios.delete("http://localhost:4000/projects/tasks/" + id).then(
            response => {
          this.fetchTasks();
        },
        error => {
          console.log(error);
        }
      );
    }
   },
    beforeMount(){
      this.fetchTasks();
    }
}
</script>
