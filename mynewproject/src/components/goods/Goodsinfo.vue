<template>
    <div class="goodsinfo-container">

        <!-- 实现动画的小球 -->
        <!-- 钩子函数动画，这些钩子函数，都是通过事件绑定机制，绑定到 transition 元素上的 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>

        </transition>


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


                        <!-- goodsinfo_box 为子组件，通过 $emit 的方法，向 goodsinfo 这个父组件传值 -->
                        <nobox :max="goodsinfo.stock_quantity" @func="getSlectedCount"></nobox>
                    </p>
                    <div>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addTocart">加入购物车</mt-button>
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
                <mt-button type="danger" size="small" plain @click="goComment">商品评论</mt-button>
            </div>
		</div>

    </div>
</template>


<script>
import swiper from '../sub-components/Swiper.vue'

import {mapMutations} from 'vuex'   //   导入辅助函数 mapMutations

//   导入 数字框组件
import nobox from '../sub-components/Goodsinfo_nobox.vue'

export default {
    data() {
        return {
            lunbotu: [],    //  商品的轮播图
            goodsinfo: {},  //  商品的详情
            flag: false,     //  小球的显示与隐藏状态
            SlectedCount: 1   //  用户选择的商品购买的数量，默认为 1
        }
    },
    created() {
        this.getlunbotu(),
        this.getGoodsinfoById()
    },
    methods: {
        ...mapMutations(["addToCart"]),
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
        },
        goComment() {
            this.$router.push('/home/goodscomment/' + this.goodsinfo.id)
        },
        addTocart() {
            // 点击加入购物车
            this.flag = !this.flag
            // 调用 mutations 中的方法的 addToCart
            // this.$store.commit("addToCart"，{
            // id: this.id,
            // count: this.SlectedCount})
            // 直接调用 mutations 中映射出来的方法
            this.addToCart({id: this.id, count: this.SlectedCount})

        },
        beforeEnter(el) {
            // 入场动画开始之前，设置小球的起始状态
            el.style.transform = "translate(0,0)"
        },
        enter(el,done) {
            // 入场动画结束之后。小球的终止状态
            // transform    变换
            // translat     位移
            // transition   过渡效果
            el.offsetWidth

            // 动态获取小球的横纵坐标
            const ballPos = el.getBoundingClientRect()
            // console.log(ballPos)

            // 动态获取徽标的横纵坐标, 获取徽标的位置，和双向数据绑定没有关系，
            // 双数据绑定上不推荐操作 dom，所以可以直接普通的dom操作
            // Dom  操作优势： 不论要操作的元素属于哪个组件，只要这个元素属于document,那么就能获取到
            const badgePos = document.getElementById("badge").getBoundingClientRect()
            const left = badgePos.left - ballPos.left
            const top  = badgePos.top - ballPos.top
            // 动态设置小球 top 和 left的值
            el.style.transform = "translate("+left+"px,"+top+"px)"

            // 设置小球的入场的动画终止状态
            // el.style.transform = "translate(96px, 250px)"
            

            // 设置小球的过渡效果
            // 使用贝塞尔曲线，完成小球的回弹效果
            el.style.transition = "all 2s cubic-bezier(.44,-0.35,1,.52)"

            // 当入场动画完成后需要手动调用一下 done 回调函数, 直接跳过小球的出场动画
            done()
        },
        afterEnter(el) {
            // 入场动画结束之后的回调函数
            this.flag = !this.flag
        },
        getSlectedCount(c) {
            // 获取选择的商品的数量
            console.log('父组件中拿到了传递过来的值为:' + c)
            // 把用户最新选择的最新的数量值，保存到 data 中，方便用户点击加入到购物车按钮时候，把数量值同步到徽标中
            this.SlectedCount = c
        }



        // 小球动画有  bug 的问题的原因：
        // 小球动画的终点坐标，已经固定写死
        // 解决办法： 把小球  translate  的横纵坐标写活即可
        // 横纵坐标如何动态获取？   
        // 先动态获取小球的横纵坐标，再获取小球的横纵坐标，
        // 让徽标的横纵坐标 - 小球的横纵坐标得到的结果，就是小球的动态位移的距离  
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

    .ball {
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 373px;
        left: 145px;
        // 将来小球要通过动画位移运动到的位置
        // transform: translate(96px, 250px);
    }
}


</style>
