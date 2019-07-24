<template>
  <nav class="panel">
    <p class="panel-heading">
      Guests
    </p>
    <a class="panel-block" :key="guest.id" v-for="guest in guests">
      {{`${guest.firstname} ${guest.lastname}`}}
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Guests',
  props: [
    "guests"
  ]
}
</script>

<style>

</style>
