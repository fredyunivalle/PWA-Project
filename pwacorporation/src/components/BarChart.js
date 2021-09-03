import axios from 'axios';
import { Bar } from '../BaseCharts'

export default {
  data : ()=>{
    return {
      labels : [],
      data: [],
    }
  },
  extends: Bar,
  async mounted () {
    const { data } = await axios.get("http://localhost:4000/users");
    var c=0;

    for(var i=0; i<this.data.length; i++){
      if(data[i].position in this.labels){
        continue
      }
      else{
        this.labels.push(data[i].position)
      }
    }
    console.log(this.data);
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Data',
          backgroundColor: '#E2A15D',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}