<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <div class="h5" v-if="product.price === product.origin_price">
            {{ product.price }} 元
          </div>
          <div v-else>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5">現在只要 {{ product.price }} 元</div>
          </div>
        </td>
        <td>
          <router-link
            :to="`./product/${product.id}`"
            class="btn btn-outline-secondary"
            :disabled="product.id === loadingItem"
            >查看詳細內頁</router-link
          >
          <button
            type="button"
            class="btn btn-primary"
            @click="addToCart(product.id)"
            :disabled="product.id === loadingItem"
          >
            <i
              class="fas fa-spinner fa-pulse"
              v-if="loadingItem === product.id"
            ></i>
            加入購物車
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      loadingItem: '',
    };
  },
  methods: {
    getProducts() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data);
        });
    },
    addToCart(id) {
      const data = {
        product_id: id,
        qty: 1,
      };
      this.loadingItem = id;
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(res.data.message);
          this.cartStatus = true;
          this.loadingItem = '';
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  components: {
    RouterLink,
  },
  mounted() {
    this.getProducts();
  },
};
</script>
