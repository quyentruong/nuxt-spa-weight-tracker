<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    series: [{
      name: 'BMI',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chartOptions: {
      theme: {
        mode: 'dark',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      },
      chart: {
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  }),
  created () {
    const tracks = this.$warehouse.get('user').tracks
    const data = []
    for (let i = 0; i < tracks.length; i++) {
      data.push(Math.round(tracks[i].bmi))
    }
    this.series[0].data = data
  }

}
</script>
