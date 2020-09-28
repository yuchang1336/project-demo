<template>
    <div class="goodsDesc-container">
        <h3 class="title">{{goodsDesc.title}}</h3>
        <hr>
        <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsDesc: {}
        }
    },
    created() {
        this.getGoodsDesc()
    },
    methods: {
        async getGoodsDesc() {
            const {data} = await this.$axios.get("/api/goods/getdesc/" + this.id)
            console.log(data)
            if(data.status === 0) {
                return this.goodsDesc = data.message[0]
            }
        }
    },
    props:["id"]
}
</script>

<style lang="scss">
.goodsDesc-container {
.title {
    font-size: 16px;
    margin: 10px 0;
    color: blue;
    text-align: center;
}
.content {
    img {
        width: 100%;
        height: 100%;
    }
}
}
</style>