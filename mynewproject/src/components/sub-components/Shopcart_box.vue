<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 监听文本框的 change 事件， 来动态获取选择到的数量 -->
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="nobox" @change="countedChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../assets/lib/js/mui.js'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    mounted(){
        // console.log(this.max)
        // 当组件挂载到页面中之后，初始化  数字框
        mui(".mui-numbox").numbox()
    },
    methods: {
        // 获取选择的商品数量
        countedChanged() {
            const val = parseInt(this.$refs.nobox.value)
            console.log("数字改变了" + val)

            // 调用 mapMutations 的方法，更新购物车下面的数量值，动态变化
            this.updateGoodsCount({id: this.id, count: val})

        },
        ...mapMutations(['updateGoodsCount'])
    },
    props: ["initcount","id"]

}
</script>

<style lang="scss" scoped>

</style>