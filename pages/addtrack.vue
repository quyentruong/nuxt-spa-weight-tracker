<template>
  <v-layout>
    <v-btn @click="setStore">
      Set
    </v-btn>
    <v-btn @click="getStore">
      Get
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'Addtrack',
  methods: {
    setStore () {
      this.$warehouse.set('user', { name: 'Marcus' })
    },
    getStore () {
      // eslint-disable-next-line no-console
      console.log(this.$warehouse.get('user'))
    }
  }
}
</script>

<style scoped>

</style>
