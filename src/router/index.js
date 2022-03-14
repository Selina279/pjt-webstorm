import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "../views/Home.vue"
import Register from "../views/Register.vue";
import UserInfo from "../views/UserInfo.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    hidden:true
  }, {
    path:'/register',
    name:'register',
    component:Register,
    hidden:true
  }
]

const router = new VueRouter({
  routes
})

export default router
