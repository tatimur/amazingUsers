import Vue from 'vue'
import Router from 'vue-router'
import usersTable from '@/components/usersTable'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import UUID from "vue-uuid";
 

Vue.use(Router)
Vue.use(Element)
Vue.use(UUID)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'usersTable',
      component: usersTable
    }
  ]
})
