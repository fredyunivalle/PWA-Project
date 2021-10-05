<template>
<div>
    <br>
    <br>
    <div>
        <br>
        <h3>Cantidad de usuarios de acuerdo a su cargo</h3>
        <br>
        <br>
        <CasesBar
          :label="labels"
          :chart-data="confirmed" 
        ></CasesBar>
        <br>
        <h3>Cantidad de clientes de acuerdo a su tipo</h3>
        <br>
        <br>
        <CasesBar
          :label="labelsClient"
          :chart-data="confirmedClient" 
        ></CasesBar>
        <br>
        <br>
        <h3>Cantidad de tareas completadas por proyecto</h3>
        <br>
        <br>
        <v-combobox
          v-model="project"
          :items="items"
          label="Seleccione el ID del proyecto"
          dense
          filled
          clearable
        ></v-combobox>
        <br>
        <br>
        <CasesPie
          :label="labelsPie"
          :chart-data="dataPie" 
        ></CasesPie>
        <br>
        <br>
    </div>
</div>
</template>

<script>
const axios=require("axios")
import CasesBar from '@/components/CasesBar'
import CasesPie from '@/components/CasesPie'
export default {
     data : ()=> {
        return {
            labels : [],
            confirmed : [],
            labelsClient: [],
            confirmedClient: [],
            labelsPie: [],
            dataPie: [],
            aux: [],
            items: [],
            project: ['1'],
        }

    },
    components : {
        CasesBar,
        CasesPie
    },
    async mounted() {
      var etiquetas = new Array();
      await axios.get("http://localhost:4000/users")
      .then(response => {
        response.data.forEach(element => {
          etiquetas.push(element.position)
        });

        let probando = Array.from(new Set(etiquetas));
        let counts = {};
        etiquetas.forEach(function(x) {counts[x] = (counts[x] || 0) + 1;});

        for(var i=0; i<probando.length; i++){
            this.labels.push(probando[i])
            switch(probando[i]){
              case "Administrador":
                this.confirmed.push(counts.Administrador)
                break;
              case "Obrero":
                this.confirmed.push(counts.Obrero)
                break;
              case "Arquitecto":
                this.confirmed.push(counts.Arquitecto)
                break;
              case "Super user":
                this.confirmed.push(1)
                break;
            }
        }

      })

      var etiquetasClient = new Array();
      await axios.get("http://localhost:4000/clients")
      .then(response => {
        response.data.forEach(element => {
          etiquetasClient.push(element.type)
        });

        let probando = Array.from(new Set(etiquetasClient));
        let counts = {};
        etiquetasClient.forEach(function(x) {counts[x] = (counts[x] || 0) + 1;});

        for(var i=0; i<probando.length; i++){
          this.labelsClient.push(probando[i])
          switch(probando[i]){
            case "Natural":
              this.confirmedClient.push(counts.Natural)
              break;
            case "Legal":
              this.confirmedClient.push(counts.Legal)
              break;
          }
        }
      })

      await axios.get("http://localhost:4000/projects")
      .then(response => {
        response.data.forEach(element => {
          this.items.push(element.pk_project_id)
        });
      })

      await axios.get("http://localhost:4000/projects/tasks/"+this.project)
        .then(response => {
        response.data.forEach(element => {
          this.aux.push(element.completed)
        });
        let probando = Array.from(new Set(this.aux));
        let counts = {};
        this.aux.forEach(function(x) {counts[x] = (counts[x] || 0) + 1;});

        for(var i=0; i<probando.length; i++){
          this.labelsPie.push(probando[i])
          switch(probando[i]){
            case true:
              this.dataPie.push(counts.true)
              break;
            case false:
              this.dataPie.push(counts.false)
              break;
          }
        }
        console.log(this.dataPie);
      })
}   
}
</script>
