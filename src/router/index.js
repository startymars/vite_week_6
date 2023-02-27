import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/DashabordView.vue'),
    children: [
      {
        path: 'adminProducts',
        component: () => import('../views/admin/AdminProducts.vue'),
      },
      {
        path: 'adminOrder',
        component: () => import('../views/admin/AdminOrder.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
