<template>
  <div id="login-container">
    <b-card class="main-form">
      <img alt="Vue logo" src="@/assets/logo.png" />
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            size="lg"
            placeholder="name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            size="lg"
            type="password"
            placeholder="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button class="button" type="submit" variant="success">
          ログイン
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$router.push("/home");
      // Login
    },
  },
};
</script>

<style lang="scss" scoped>
#login-container {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > .main-form {
    max-width: 500px;
    margin: 0 auto;
    .form-group {
      margin-bottom: 1em;
    }
    .button {
      width: 100%;
    }
  }
}
</style>
