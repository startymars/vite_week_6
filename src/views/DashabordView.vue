<template>
  <p>這是後台頁面唷</p>
  <router-link to="/">回前台</router-link>|
  <router-link to="/admin/adminOrder">後台訂單列表</router-link>|
  <router-link to="/admin/adminProducts">後台產品列表</router-link>|
  <a href="#" @click="logout">登出</a>
  <hr />
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router';

const { VITE_APP_URL } = import.meta.env;
export default {
  methods: {
    logout() {
      document.cookie = `week2Token=;expires=${new Date()};`;
      this.$router.push('/');
    },
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)week2Token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      this.$http.defaults.headers.common.Authorization = token;

      this.$http
        .post(`${VITE_APP_URL}/v2/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push('/login');
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    this.checkLogin();
  },
  components: {
    RouterView,
  },
};
</script>
