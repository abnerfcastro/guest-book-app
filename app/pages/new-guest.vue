/<template>
  <div class="container">
    <h2 class="is-size-2">Welcome, {{resolveTitle()}}</h2>
    <p>Please fill out the form below.</p>
    <section class="section">
      <form @submit.prevent="addGuest">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input v-model="newGuest.firstname" class="input" type="text" name="firstname" placeholder="First Name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input v-model="newGuest.lastname" class="input" type="text" name="lastname" placeholder="Last Name" />
          </div>
        </div>
        <div class="field is-grouped has-top-margin-30">
          <div class="control">
            <input type="submit" value="Submit" class="button is-link" />
          </div>
          <div class="control">
            <button class="button is-danger" @click.prevent="cancel">Cancel</button>
          </div>
          <div class="control">
            <button class="button is-info" @click.prevent="getRandom">Generate Random</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import * as _s from 'underscore.string';

export default {
  data() {
    return {
      newGuest: {
        firstname: '',
        lastname: '',
        country: 'US'
      }
    }
  },
  methods: {
    resolveTitle() {
      const isNameSet = this.newGuest.firstname !== '' || this.newGuest.lastname !== '';
      return isNameSet ? `${this.newGuest.firstname} ${this.newGuest.lastname}`.trim() + '.' : 'new guest.';
    },
    async addGuest() {
      try {
        await this.$axios.$post('/api/', this.newGuest);
        this.$toast.success(`Guest ${this.newGuest.firstname} was successfully added.`);
        this.$router.push({ path: '/' });
      } catch (error) {
        this.$toast.error('Error while adding a new guest.')
      }
    },
    cancel() {
      this.newGuest.firstname = '';
      this.newGuest.lastname = '';
      this.$router.push({ path: '/' });
    },
    async getRandom() {
      try {
        const response = await this.$axios.$get('https://randomuser.me/api/');
        const guestinfo = response.results[0];
        let { first: firstname, last: lastname } = guestinfo.name;

        this.newGuest.firstname = this.capitalize(firstname);
        this.newGuest.lastname = this.capitalize(lastname);
        this.newGuest.country = guestinfo.nat;
      } catch (error) {
        this.$toast.error('Unable to generate random guest info.')
      }
    },
    capitalize(str) {
      return _s(str).trim().capitalize().value();
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px 500px;
}

.has-top-margin-30 {
  margin-top: 30px;
}
</style>

