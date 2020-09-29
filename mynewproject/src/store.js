import Vue from 'vue' 


// 创建 store 状态管理
import Vuex from 'vuex' 
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // state 类似于 组件对象中的 data 属性
    // 这个state 中存储数据，就是我们全局共享的数据
    // 在cart中，应该把每个商品存储为一个对象 { id, count }
    cart: []
  },
  mutations: {
    addToCart(state, goods) {
        // 将商品添加到购物车
        // 如果购物车中，之前曾经有这个商品，只更新数量即可，如果没有直接 push
        // this.state.cart.push(goods)
        let flag = false
        state.cart.some( item => {
            if(item.id === goods.id) {
                // 如果找到了对应的商品，则更新数量
                item.count += goods.count
                flag = true
                // 终止后续循环
                return true
            }
        })
        // 如果没有找到之前添加的商品则直接 push 到购物车中
        if(!flag) {
            state.cart.push(goods)
        }
        localStorage.setItem("cart", window.JSON.stringify(state.cart))
    }
  },
  getters: {
    //   徽标中的商品数量
    totalcount(state) {
        let c = 0
        state.cart.forEach( item => {
            c += item.count
        })
        return c
    }
  }
})


//  添加购买的数量刷新后会没有，需要保存到 localstorage 中， localstorage 保存的是字符串形式，
//  存储前先用JSON.stringify()方法将json对象转换成字符串形式
//  JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
//  localStorage.setItem("temp2", window.JSON.stringify(state.cart));
//  返回{"a":1,"b":2}


export default store



