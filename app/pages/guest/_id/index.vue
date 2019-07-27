<template>
  <div class="container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li class="is-active"><a href="#" aria-current="page">{{guest._id}}</a></li>
    </ul>
    </nav>
    <h2 class="is-size-3">{{ getFullName() }}</h2>
    <p>{{ getFullName() }} visited us on {{ guest.date }} from {{ guest.country }}.</p>
    <small>User Id: {{ $route.params.id }}</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guest: {}
    }
  },
  async created() {
    this.guest = await this.$axios.$get(`/api/${this.$route.params.id}`);
  },
  methods: {
    getFullName() {
      return `${this.guest.firstname} ${this.guest.lastname}`;
    }
  }
};
</script>

<style>
</style>
