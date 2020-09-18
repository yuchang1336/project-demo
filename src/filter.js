import Vue from 'vue'
// 安装 moment 时间过滤的插件
import moment from 'moment'





// 定义全局的时间过滤器
Vue.filter("dateFormat", function(dataStr){
    // 在过滤器的处理函数中必须 return 一个东西， 这样才是一个合法的过滤器
    return moment(dataStr).format("YYYY-MM-DD HH:mm:ss")
  })