import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "UsersView" */ '../views/UsersView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "RegisterView" */ '../views/RegisterView.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Router guard with a simple check to see if a token is set.
  // If not, redirect to login.
  if (!['login', 'register'].includes(to.name) && !VueCookies.get("token")) next({ name: 'login' })
  else next()
})

export default router;
