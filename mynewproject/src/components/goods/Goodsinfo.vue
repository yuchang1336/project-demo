<template>
    <div class="goodsinfo-container">

<!-- 轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotu="lunbotu" :imagename="'src'" :isfull="false"></swiper>
                </div>
            </div>
		</div>

<!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner pullleft">
                    <p class="price">
                        市场价：
                        <span style="margin: 10px"><del>￥{{goodsinfo.market_price}}</del></span>
                        销售价：
                        <span style="font-size: 16px;color: red;font-weight: bold">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量:

                        <!-- 由于goodsinfo是通过Ajax动态获取来的，  但是，Ajax是异步获取请求，需要消耗时间
                        ，因此， 可能导致这样的  情况 ： box组件 先于 Ajax 渲染出来 ，此时，组件被渲染的时候，  
                        goodsinfo 为空对象， 因此，传递到子组件中的 stock_quantity 是 undefined-->
                        <!-- 这里的  max 为 库存量 -->
                        <nobox :max="goodsinfo.stock_quantity"></nobox>
                    </p>
                    <div>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </div>
                </div>
            </div>
		</div>

<!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner pullleft">
                   <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                   <p>商品货号：{{goodsinfo.goods_no}}</p>
                   <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <!--  设置跳转商品详情的路由地址-->
                <!-- <router-link :to="'/home/goodsdesc/' + goodsinfo.id">
                <mt-button type="primary" size="small" plain>图文介绍</mt-button>
                
                </router-link> -->

                <!-- 使用编程式导航，就是使用 JS 的代码的方式，来实现路由的跳转
                    元素导航： 使用 router-link 元素实现的导航
                
                 -->
                <mt-button type="primary" size="small" plain @click="getDesc">图文介绍</mt-button>
                <mt-button type="danger" size="small" plain>商品评论</mt-button>
            </div>
		</div>

    </div>
</template>


<script>
import swiper from '../sub-components/Swiper.vue'

//   导入 数字框组件
import nobox from '../sub-components/Goodsinfo_nobox.vue'

export default {
    data() {
        return {
            lunbotu: [],
            goodsinfo: {}
        }
    },
    created() {
        this.getlunbotu(),
        this.getGoodsinfoById()
    },
    methods: {
        async getlunbotu() {
           const { data } = await this.$axios.get("/api/getthumimages/" +  this.id)
           console.log(data.message)
           if(data.status === 0){
               return this.lunbotu = data.message
           } 
           console.log(this.lunbotu)
        },
        async getGoodsinfoById() {
            const { data } = await this.$axios.get("/api/goods/getinfo/" + this.id)
            if( data.status === 0) {
                console.log(data.message)
                return this.goodsinfo = data.message[0]
            }
        },
        getDesc() {
            // 点击按钮 跳转到 商品的描述页面
            // 注意 在 this 这个组件身上 ，有 this.$route 和 this.$router
            //  this.$route 是专门用来获取路由中的参数的
            //  this.$router 是专门来实现编程式导航的
            // console.log(this)  找 $router
            this.$router.push('/home/goodsdesc/' + this.goodsinfo.id)
        }
    },
    props: ['id'],
    components: {
        swiper,
        nobox
    }
}
</script>


<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;




    .pullleft {
        text-align: left;
    }
}

</style>