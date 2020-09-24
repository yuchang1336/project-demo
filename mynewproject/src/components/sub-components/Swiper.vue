<template>
  <div>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in lunbotu" :key="index">
            <img :src="item[imagename]" alt="" :class="[isfull?'img-full':'img-normal']">
        </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {},
    props: ['lunbotu','imagename','isfull'] // 将来， 谁使用这个 轮播图组件，就必须为其传递一个 轮播图组件 的数据，
    //同时，只能接收 img 属性的图片作为 轮播图展示出来
}
</script>

<style lang="scss" scoped>
.mint-swipe {
    height:180px;


    .mint-swipe-item{
        text-align: center;
        .img-full {
            // 如果给图片应用了这个类， 则图片的宽高都是撑满父元素的
            width: 100%;
            height: 100%;
        }
        .img-normal {
            // 如果图片应用了这个类，则图片的高度 100%， 宽度自适应，横向位置居中显示
            // width: 100%;
            height: 100%;
        }
    
    }
}
</style>