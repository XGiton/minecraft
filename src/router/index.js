import Vue from 'vue'
import Router from 'vue-router'
import CreateArticle from '@/components/CreateArticle'
import Photography from '@/components/Photography'
import Program from '@/components/Program'
import Essay from '@/components/Essay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/photography',
      name: 'Photography',
      component: Photography
    },
    {
      path: '/program',
      name: 'Program',
      component: Program
    },
    {
      path: '/essay',
      name: 'Essay',
      component: Essay
    },
    {
      path: '/article/create',
      name: 'CreateArticle',
      component: CreateArticle
    },
    {
      path: '*',
      redirect: '/photography'
    }
  ]
})
