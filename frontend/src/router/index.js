import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { useAuthStore } from '../stores/authStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'exact-active-class',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
      path: "/home",
      name: "home",
      component: () => import('../views/Home.vue') ,
      meta: {
        auth: true
      }
    },
    {
      path: "/blogs",
      name: "blogs",
      component: () => import('../views/Blogs.vue') ,
      meta: {
        auth: true
      }
    },
    {
      path: "/create",
      name: "create",
      component : () => import('../views/Create.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component : () => import('../views/Profile.vue'),
      meta: {
        auth: true
      }
    }
  ]
});

const currentUser = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const token = authStore.user;
    resolve(token);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/")
    }
  } else {
    next();
  }
})
export default router
