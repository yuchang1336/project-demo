<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 监听文本框的 change 事件， 来动态获取选择到的数量 -->
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="nobox" @change="countedChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../assets/lib/js/mui.js'
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
            const val = this.$refs.nobox.value
            console.log("数字改变了" + val)

            // 每当 nobox 子组件的  count 值变化的时候,要立即把最新的数量值传递给   goodsinfo 父组件，这样每当点击加入购物车按钮时
            // 就能把最新的 count 值同步到购物车的徽标中，这样就涉及到父子组件之间的传值了，子组件向父组件传递数据
            this.$emit("func", parseInt(val))
        }
    },
    props: ["max"], //  接收父组件传递过来的库存量 max
    watch: { 
        // 使用场景：  监听单个虚拟数据
        max: function(newvalue, oldvalue) {
            // 不论外界传递给 no_box 的 max 值到底是什么
            // 最终，最后传递的 那个 max 值，肯定是一个 合法的数值
            console.log(newvalue+'---'+ oldvalue)
            // 每当 监听到 max 值的变化，不论这个值是否合法，我们都重新为 数字框  使用 mui 中的 JS-API ,来手动设置最大值


            mui('.mui-numbox').numbox().setOption('max',newvalue)
        }
    }

}
</script>

<style lang="scss" scoped>

</style>