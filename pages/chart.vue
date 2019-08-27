<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-select v-model="item" :items="items" @change="selectFunc" />
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
    chartTitle: 's',
    item: 'BMI',
    items: [
      'BMI',
      'Weight'
    ],
    series: [{
      name: 'BMI',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chartOptions: {
      theme: {
        // mode: 'dark',
        // palette: 'palette1',
        // monochrome: {
        //   enabled: false,
        //   color: '#255aee',
        //   shadeTo: 'light',
        //   shadeIntensity: 0.65
        // }
      },
      chart: {
        height: 350,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },
      // title: {
      //   text: 'd',
      //   align: 'left'
      // },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'datetime'
      }
      // xaxis: {
      //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      // }
    }
  }),
  created () {
    this.selectFunc()
  },
  methods: {
    selectFunc () {
      const tracks = this.$warehouse.get('user').tracks
      const data = []
      for (let i = 0; i < tracks.length; i++) {
        if (this.item === 'BMI') {
          this.chartOptions.title = { text: 'BMIs Trends by Month' }
          const point = { x: tracks[i].date, y: Math.round(tracks[i].bmi) }
          data.push(point)
        } else {
          this.chartOptions.title = { text: 'Weight Trends by Month' }
          const point = { x: tracks[i].date, y: Math.round(tracks[i].weight) }
          data.push(point)
        }
      }
      this.series[0].data = data
    }
  }

}
</script>
