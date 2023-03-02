<template>
  <div class="text-center" v-if="!cartStatus">
    <p>目前購物車沒有任何商品</p>
  </div>
  <template v-else>
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
  <hr />
  <div class="my-5 row justify-content-center">
    <v-form
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="createOrder"
      >{{ errors }}
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          rules="email|required"
          placeholder="請輸入 Email"
          v-model="form.user.email"
        ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          :rules="isPhone"
          v-model="form.user.tel"
        ></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </v-form>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      cart: [],
      cartStatus: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需為正確的手機號碼格式';
    },
    getCarts() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          console.log('取得購物車', res.data.data);
          this.cart = res.data.data;
          if (res.data.data.carts.length) {
            this.cartStatus = true;
          } else {
            this.cartStatus = false;
          }
        })
        .catch((err) => {
          alert(err.data);
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
          alert(err.data.message);
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
        });
    },
    deleteCarts() {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          console.log(res.data.message);
          this.cartStatus = false;
          this.getCarts();
        })
        .catch((err) => {
          alert(err.data);
        });
    },
    createOrder() {
      const order = this.form;
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, { data: order })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.form.message = '';
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
