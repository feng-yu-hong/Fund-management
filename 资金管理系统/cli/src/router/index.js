import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Hom from '../views/Hom.vue'
import Infoshow from '../views/Infoshow.vue'
import FundList from '../views/FundList.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/',redirect: '/Home',name: 'Home',component: Home},


  { path: '/Home',
    name: 'home',
    component: Home,
    children: [{
        path: "",
        component: Hom
      },
      {
        path: '/hom',
        name: "hom",
        component: Hom
      },
      {
        path: '/infoshow',
        name: 'infoshow',
        component: Infoshow
      },
      {
        path: '/fundlist',
        name: 'fundlist',
        component: FundList
      }
    ]
  },




  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },


  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode:'history',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next('/login')
  }
})



export default router