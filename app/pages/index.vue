<template>
  <div class="container">
    <Guests :guests="guests" />
  </div>
</template>

<script>
import Guests from '../components/Guests'

export default {
  components: {
    Guests
  },
  data() {
    return {
      guests: []
    }
  },
  async created() {
    try {
      this.guests = await this.$axios.$get('/api');
      console.log(this.guests);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
} */
</style>
