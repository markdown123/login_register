import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{ path: '/register', component: Register },
{
  path: '/login',
  component: Login

},
{
  path: '/home',
  component: Home
}

]

const router = new VueRouter({
  routes
})

export default router
