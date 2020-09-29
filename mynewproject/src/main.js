// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1.导入 vuex  
// 2.安装 vuex 到 vue 上
// 3.创建一个公共状态对象
// import Vuex from 'vuex' 
// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     // state 类似于 组件对象中的 data 属性
//     // 这个state 中存储数据，就是我们全局共享的数据
//     count: 0  //全局中共享了一个 count 值
//   },
//   mutations: {

//   },
//   getters: {

//   }
// })
import store from './store.js'  //  导入状态管理对象


// 导入 mint-ui
import Mint from 'mint-ui'
Vue.use(Mint)


// 导入 mui中的样式
import './assets/lib/css/mui.css'
import './assets/lib/css/mui.min.css'
import './assets/lib/css/icons-extra.css'

// 按需导入 mint-ui 中的组件
import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'



// 配置 axios
import axios from 'axios'


// 引入文件并执行里面的代码，所以不需要暴露 export 在 filter 中
import './filter.js'


// 把 axios 挂载到 vue 的原型对象上
Vue.prototype.$axios= axios.create({
  baseURL:'http://www.liulongbin.top:3005/'
  // 在全局中设置 axios 的请求根路径，这样一来，在发送请求时，就可以不用写 根地址 了
})





Vue.component(Header.name, Header)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,  //  4.将创建的共享状态对象，挂载到 Vue 实例中，这样，所有的组件，就可以直接从 store 中获取全局的数据了
  router,
  components: { App },
  template: '<App/>'
})
