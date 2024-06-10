import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/auth/login.vue";
import Register from "@/views/auth/Register.vue";
import Traders from "@/views/traders/Index.vue";
import Create from "@/views/traders/Create.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import AuthLayout from "@/components/layout/AuthLayout.vue";
import NotFound from "@/views/NotFound.vue";
import store from "@/store/index.js"

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/traders", name: "Traders", component: Traders },
      { path: "/traders/create", name: "TraderCreate", component: Create },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

 router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
}); 

export default router;
