import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import add_edit_note from '../components/add_edit_note'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/add',
      component: add_edit_note
    },
    {
      path: '/edit/:id',
      component: add_edit_note
    },
    {
      path: '/*',
      component: home
    }
  ]
})
