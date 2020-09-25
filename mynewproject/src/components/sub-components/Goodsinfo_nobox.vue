<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" />
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
        console.log(this.max)
        // 当组件挂载到页面中之后，初始化  数字框
        mui(".mui-numbox").numbox()
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