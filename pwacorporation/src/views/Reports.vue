<template>
<div>
    <br>
    <br>
    <div>
      <h1 style="text-align:center;" v-if="this.report=='Usuarios'">Cantidad de usuarios por posicion</h1>
      <h1 style="text-align:center;" v-else-if="this.report=='Clientes'">Cantidad de clientes de acuerdo a su tipo</h1>
      <h1 style="text-align:center;" v-else-if="this.report=='Proyectos terminados'">Cantidad de proyectos finalizados</h1>
      <h1 style="text-align:center;" v-else-if="this.report=='Tareas por proyecto'">Cantidad de tareas por proyecto</h1>
     
      <v-combobox
        v-model="report"
        :items="items"
        label="Reporte a crear"
        hide-selected
        solo
        chips
        clearable
      ></v-combobox>
        <br>
        <br>
        <CasesBar
        :label="labels"
        :chart-data="confirmed" 
        ></CasesBar>
        <br>
        <br>
    </div>
</div>
</template>

<script>
const axios=require("axios")
import CasesBar from '@/components/CasesBar'
export default {
     data : ()=> {
        return {
            labels : [],
            confirmed : [],
            report:[],
            items:[
              'Usuarios',
              'Clientes',
              'Proyectos terminados',
              'Tareas por proyecto',
            ],
        }

    },
    components : {
        CasesBar
    },
    async created() {
      const { data } = await axios.get("http://localhost:4000/users");
          
          for(var i=0;i<20;i++){
          this.labels.push(data[i].position)
          this.confirmed.push(data[i].id)
          }
        
    }   
}
</script>
