<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm10 md8>
                 <v-container>
                    <v-row>
                    <v-card class="elevation-12">
                      <v-col cols="12">
                        <v-list-item
                        v-for="(project, i) in projects"
                        :key="i">
                        <project-card :projectInfo="project"></project-card>
                        <v-spacer></v-spacer>
                        <template>
                          <v-btn
                          color="red"
                          fab
                          dark
                          big
                          absolute
                          top
                          right
                          @click="deleteProject(project.pk_project_id)"
                          >
                          <v-icon>mdi-delete</v-icon>
                          </v-btn>
                      </template>
                        </v-list-item>
                      </v-col>

                      <project-registration v-model="dialog" @closeDialogs = "closeDialogs"> </project-registration>

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
                    </v-card>
                    </v-row>
                 </v-container>
                   
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';
import ProjectRegistration from '../components/ProjectRegistration.vue';

export default {
  components: { ProjectCard, ProjectRegistration },
   name: 'Projects',
   data(){
     return{
       projects: [],
       dialog: false,
       editDialog: false,
       id: '',
       name: '',
       email: '',
       password: '',
       phone: '',
       identification: ''
     }
   },
   methods:{
    fetchProjects() {
      axios.get("http://localhost:4000/projects").then(
        response => {
          this.projects = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    addProject(){
      let json = {
          "name" : "Nuevo proyecto",  
          "description" : "",
          "personInCharge": 1
        };
        axios.post("http://localhost:4000/projects", json);
        this.fetchProjects();
    },
    deleteProject(id)
    {
        axios.delete("http://localhost:4000/projects/" + id).then(
            response => {
          this.fetchProjects();
        },
        error => {
          console.log(error);
        }
      );
    },
    closeDialogs(){
      this.dialog = false;
      this.editDialog = false;
    },
   },
   beforeMount(){
      this.fetchProjects();
    }
}
</script>
