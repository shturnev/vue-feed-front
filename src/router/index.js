import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store';


import home from '@/components/home'
import add_edit_note from '../components/add_edit_note'
import note from '../components/note'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/add',
      component: add_edit_note,
      meta: {admin: true}
    },
    {
      path: '/edit/:id',
      component: add_edit_note,
      meta: {admin: true}
    },
    {
      path: '/:id',
      component: note
    },
    {
      path: '/*',
      component: home
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.admin)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!store.state.private_key) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // всегда так или иначе нужно вызвать next()!
  }
})

export default router;
