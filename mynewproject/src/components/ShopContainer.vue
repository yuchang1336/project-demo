<template>
<div class="shopcart">
    <div class="goods-list">
      <div class="mui-card" v-for="item in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner goods-item">

            <!-- 选择器开关 -->
            <!-- 双向数据绑定 selectedObj 中的 true or false-->
					  <mt-switch size="small" v-model="selectedObj[item.id]" @change="changeSelect(item.id, selectedObj[item.id])"></mt-switch>




            <!-- 图片 -->
            <img :src="item.thumb_path" alt="">
            <!-- 信息区域 -->
            <div class="info">
              <h1>
                {{item.title}}
                <!-- ------{{countObj[item.id]}} -->
              </h1>
              <div class="goodsinfo">
                <span class="price">￥{{item.sell_price}}</span>



              <!-- 表示这条商品的数量，将这个参数传给 nobox 选择框-->
                <nobox :initcount="countObj[item.id]" :id="item.id"></nobox>

                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>
					</div>
				</div>
			</div>
    </div>


<!-- 结算区域 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class="danger">{{selectedCount}}</span>件，总价<span  class="danger">￥{{amount}}</span></p>
            </div>
            <mt-button type="danger">结算</mt-button>
					</div>
				</div>


        <!-- {{JSON.stringify(selectedObj)}} -->
		</div>
</div>
</template>

<script>
import nobox from '@/components/sub-components/Shopcart_box.vue'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
     goodsList: []  // 商品列表
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      if(this.idstr.length <= 0) return    //
      const {data} = await this.$axios.get("/api/goods/getshopcarlist/" + this.idstr)
      console.log(data)
      if(data.status === 0 ) {
        return this.goodsList = data.message
      }
    },
    del(id) {
      // 删除商品
      // 只从界面上删除数据,还需要调用方法删除  vuex 中的数据
      console.log(id)
      this.goodsList.some((item, i) => {
        if(item.id == id) {
          this.goodsList.splice(i, 1)
          return true
        }
      })
      this.delFromCart(id)
    },
    ...mapMutations(['delFromCart','changeSelectState']),
    
    changeSelect(id,select) {
      // 更改开关的状态
      console.log(id+"-------"+select)
      this.changeSelectState({id, selected: select})
    }
  },
  components: {
    nobox
  },
  computed: {
    ...mapGetters(["idstr","countObj","selectedObj","selectedCount","amount"])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shopcart {
  background-color: #eee;
  overflow: hidden;

  .goods-item {
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 14px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goodsinfo {
        display: flex;
        justify-content: space-between;
        .price {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }


.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left  {
    text-align: left;

    .danger {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }

  }
}

}
</style>
