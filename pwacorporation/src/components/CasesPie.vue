<template>
  <canvas ref="myChart" width="700px" height="400"></canvas>
</template>

<script>
import Chart from 'chart.js';
export default {
  props: {
    label:  {
      type: Array
    },
    chartData:  {
      type: Array
    }
  },
  async mounted() {
    await new Chart(this.$refs.myChart, {
      type: 'pie',
      data: {
        labels: ["Not completed", "Completed"],
        datasets: [
        {
            label: 'Proyectos',
            backgroundColor: ['rgb(255, 99, 132)',
                             'rgb(54, 162, 235)',
                             'rgb(255, 205, 86)',
                             'rgb(179, 210, 58)'],
            data: this.chartData,
        }
        ],
        hoverOffset: 4
      }
    });
  }
}
</script>