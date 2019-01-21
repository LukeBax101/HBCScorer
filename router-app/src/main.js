// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SongsMenu from './components/SongsMenu'
import PointsMenu from './components/PointsMenu'
Vue.config.productionTip = false

// define
//var SongsMenu = Vue.extend()

// register
Vue.component('songs-menu', SongsMenu)
Vue.component('points-menu', PointsMenu)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
