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
            <div class="mui-card-header">商品购买</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <span style="margin: 10px"><del>￥2699</del></span>
                        销售价：
                        <span style="font-size: 16px;color: red;font-weight: bold">￥2200</span>
                    </p>
                    <p>
                        购买数量:
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
                   <p>库存货号：</p>
                   <p>库存情况：</p>
                   <p>上架时间：</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="small" plain>图文介绍</mt-button>
                <mt-button type="danger" size="small" plain>商品评论</mt-button>
            </div>
		</div>

    </div>
</template>


<script>
import swiper from '../sub-components/Swiper.vue'

export default {
    data() {
        return {
            lunbotu: []
        }
    },
    created() {
        this.getlunbotu()
    },
    methods: {
        async getlunbotu() {
           const { data } = await this.$axios.get("/api/getthumimages/" +  this.id)
        //    console.log(data.message)
           if(data.status === 0){
               return this.lunbotu = data.message
           } 
           console.log(this.lunbotu)
        }
    },
    props: ['id'],
    components: {
        swiper
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