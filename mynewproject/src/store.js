import Vue from 'vue' 


// 创建 store 状态管理
import Vuex from 'vuex' 
Vue.use(Vuex)


//  每当项目初始话的时候，先从 localstorage 里面取出存储的数据
let car = JSON.parse(localStorage.getItem("cart") || '[]' )

const store = new Vuex.Store({
  state: {
    // state 类似于 组件对象中的 data 属性
    // 这个state 中存储数据，就是我们全局共享的数据
    // 在cart中，应该把每个商品存储为一个对象 { id, count, selected}
    cart: car
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
        // 为了持续化存储购物车的数量，可以把购物车的商品，序列化出来，存储到 localstorage 中
        localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    updateGoodsCount(state,goods) {
      // 更新传递过来的商品信息，更新购物车中商品的数量
      state.cart.some(item => {
        if(item.id == goods.id) {
          item.count = goods.count
          return true
        }
      })
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    // 根据 id 删除 vuex 中对应的商品
    delFromCart(state, id) {
      state.cart.some((item, i) => {
        if(item.id == id) {
          state.cart.splice(i, 1)
          return true
        }
      })
      localStorage.setItem("cart", JSON.stringify(state.cart))
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
    },
    idstr(state) {
      // 获取购物车中所有的商品的id字符串
      let arr = []
      state.cart.forEach(item => arr.push(item.id))
      return arr.join(',')
    },
    countObj(state) {
      let o = {}
      state.cart.forEach(item => o[item.id] = item.count)
      return o
      /* {  88: 3,
            90: 4
         } 
         返回的是勾选的商品数量
      */
    },
    selectedObj(state) {
      // id 对应的商品值被选中了
      let o = {}
      state.cart.forEach(item => o[item.id] = item.selected)
      return o
      /* {  88: 3,
            90: 4,
            selected: true
         } 
         返回的是默认值
      */
    }
  }
})


//  添加购买的数量刷新后会没有，需要保存到 localstorage 中， localstorage 保存的是字符串形式，
//  存储前先用JSON.stringify()方法将json对象转换成字符串形式
//  JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
//  localStorage.setItem("temp2", window.JSON.stringify(state.cart));
//  返回{"a":1,"b":2}


export default store



