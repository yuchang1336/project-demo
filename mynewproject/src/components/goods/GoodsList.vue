<template>
  <div>
    <div class="goods-list">

      <!-- 商品列表区域 -->
      <router-link tag="div" :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodlist" :key="item.id">
          <img :src="item.img_url" alt="">
          <h1 class="title">{{item.title}}</h1>
          <div class="info">
            <P class="price">
              <span class="new">￥{{item.sell_price}}</span>
              <span class="old">￥{{item.market_price}}</span>
            </P>
            <p class="sell">
              <span>热卖中</span>
              <span>剩{{item.stock_quantity}}件</span>
            </p>
          </div>
      </router-link>


      <mt-button type="danger" size="large" style="margin-top: 10px" @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'member',
  data () {
    return {
     page: 1,  //    默认显示第一页的数据
     goodlist: [],  //   商品列表   默认为一个空数组用来接收  解构出来的数据
    //  isloaded: false  //  节流阀  表示没有加载完毕，还有剩余数据
    }
  },
  created() {
    this.getGoodsListByPage()
  },
  methods: {
    async getGoodsListByPage() {
      const { data } = await this.$axios.get(
        "/api/getgoods?pageingdex=number"
      )
      if(data.status === 0){
        // if(data.message.length <= 0)
        // console.log(data.message)
        return this.goodlist = this.goodlist.concat(data.message)
      }
    },
    getMore() {
      // 如果为 ture ,表示数据已经加载完毕
      // if (this.isloaded) return;
      // 点击加载更多商品
      this.page++
      this.getGoodsListByPage()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.goods-list {
  // 设置父盒子为弹性盒模型，内部的子元素不会换行，如果想换行，可以使用下面的属性换行
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  padding-top: 0px;

  .goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 49%;
    border: 1px solid #ccc;
    margin-top: 7px;
    box-shadow: 0 0 7px #ccc;
    padding: 2px;
    

    img {
      width: 100%;
      // height: 170px;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      overflow: hidden;
      p {
        margin: 3px;
      }
      
      .price {
        text-align: left;
        .new {
          color: red;
          font-size: 16px;
          font-weight: bold;
          margin-right: 15px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
