<template>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="deleteCarts">
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCartItem(item)"
              :disabled="item.id === loadingItem"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="item.id === loadingItem"
                :disabled="item.id === loadingItem"
              ></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <!-- <div class="text-success">
                      已套用優惠券
                    </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select
                name=""
                id=""
                class="form-control"
                v-model="item.qty"
                @change="updateCartItem(item)"
                :disabled="item.id === loadingItem"
              >
                <option :value="i" v-for="i in 20" :key="i + '12345'">
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
          <td class="text-end">
            {{ item.product.price }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    getCarts() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          console.log('取得購物車', res.data.data);
          this.cart = res.data.data;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    updateCartItem(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id;
      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, {
          data,
        })
        .then((res) => {
          console.log('更新購物車', res.data);
          this.getCarts();
          this.loadingItem = '';
        })
        .catch((err) => {
          console.log(err.data.message);
        });
    },
    deleteCartItem(item) {
      this.loadingItem = item.id;
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          console.log('刪除購物車品項', res.data);
          this.getCarts();
          this.loadingItem = '';
        })
        .catch((err) => {
          console.log(err.data.message);
        });
    },
    deleteCarts() {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          console.log(res.data.message);
          this.getCarts();
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
