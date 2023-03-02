<template>
<h2>{{product.title}}</h2>
<img :src="product.imageUrl" alt="" class="img-fluid">
<p>{{product.description}}</p>
</template>

<script>

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProducts() {
      const { id } = this.$route.params;
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err.data);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
