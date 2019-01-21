import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Songs from '@/components/Songs'
import Race from '@/components/Race'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/songs/:songName/:slideNo',
      name: 'Songs',
      component: Songs
    },
    {
      path: '/race',
      name: 'Race',
      component: Race
    }
  ]
})
