<template>
  <h1>Secret page</h1>
</template>

<script>
import authenticated from '../middleware/authenticated'

export default {
  middleware: authenticated,
  name: 'Secret'
}
</script>

<style scoped>

</style>
