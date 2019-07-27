<template>
  <nav class="panel">
    <p class="panel-heading">
      Guests
    </p>
    <nuxt-link class="panel-block" :key="guest.id" v-for="guest in guests" :to="{ name: 'guest-id', params: { id: guest._id }}">
      {{`${guest.firstname} ${guest.lastname}`}}
    </nuxt-link>
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
