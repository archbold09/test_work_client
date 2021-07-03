import Vue from 'vue';
import VueRouter from 'vue-router';

/* Layouts */
import LayoutDashboard from '@/layouts/LayoutDashboard/Index.vue';

/* Views */
import Home from '@/views/Home/Index.vue';
import Error404 from '@/views/Error404/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: LayoutDashboard },
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
