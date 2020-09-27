<template>
  <div>
      <h3>商品评论区</h3>
      <goodscommentbox :newsid="id"></goodscommentbox>
  </div>
</template>

<script>
import goodscommentbox from '../sub-components/Comment.vue'

export default {
    data() {
        return {

        }
    },
    methods: {
        
    },
    props: ['id'],
    components: {
        goodscommentbox
    }
}
</script>

<style lang="scss" scoped>

</style>