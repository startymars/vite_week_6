<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              v-model="temp.username"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              v-model="temp.password"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            v-on:click="login"
            type="button"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      temp: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${VITE_APP_URL}/v2/admin/signin`, this.temp)
        .then((res) => {
          const { token, expired } = res.data;
          console.log(token, expired);
          document.cookie = `week2Token=${token};expires=${new Date(expired)};`;
          this.$router.push('/admin');
        })
        .catch((err) => {
          console.dir(err);
          alert(err.response.data.message);
        });
    },
  },
};
</script>
