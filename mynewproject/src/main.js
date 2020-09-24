// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'




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
  router,
  components: { App },
  template: '<App/>'
})
