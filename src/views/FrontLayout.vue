<template>
  <p>這是前台頁面</p>
  <router-link to="/">Home</router-link>|
  <router-link to="/about">About</router-link>|
   <router-link to="/products">產品列表</router-link>|
  <router-link to="/cart">購物車</router-link>|
   <router-link to="/admin">後台頁面</router-link>|
    <router-link to="/login">登入頁面</router-link>
  <hr>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  components: {
    RouterView,
  },
};
</script>
