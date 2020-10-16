<template>
  <div class="photoinfo">
      <h3 class="title">{{photoinfo.title}}</h3>
      <p class="info">
        <span>发表时间： {{photoinfo.add_time | dateFormat}}</span>
        <span> 点击： {{photoinfo.click}}次</span>
      </p>
      <hr>

     <!-- 缩略图区域 -->
      <div class="thumb-img-list">
        <img :src="item.src" alt="" v-for="(item,i) in photolist" :key="i">
      </div>

      <!-- 内容区域 -->
      <div class="content" v-html="photoinfo.content"></div>

      <!-- 评论子组件 ,封装时传入的是 newsid，需要传 id 过去-->
      <comment :newsid="id"></comment>
  </div>
</template>

<script>
// 导入评论子组件
import comment from '@/components/sub-components/Comment.vue'

export default {
    data() {
        return {
            photoinfo: {},  // 图片信息
            photolist: []  //  缩略图数组
        }
    },
    created() {
        this.getPhotoinfo(),
        this.getThumbImg()
    },
    methods: {
        async getPhotoinfo() {
            // 当调用一个异步的方法的时候，这个异步方法的返回值是 promise 对象的时候，才可以使用 await 和 async
            const {data} = await this.$axios.get("/api/getimageinfo/" + this.id)
            if(data.status === 0) {
                return this.photoinfo = data.message[0]
            }
        },
        async getThumbImg() {
            // 获取图片的缩略图数据
            const {data} = await this.$axios.get("/api/getthumimages/" + this.id)
            if(data.status === 0) {
                console.log(data.message)
                return this.photolist = data.message
            }
        }
    },
    props: ["id"],
    components: {
        comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo {
    padding: 5px;
.title {
    font-size: 15px;
    text-align: center;
    margin: 10px;
    color: #007aff;
}
.info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}
.content {
    font-size: 15px;
    line-height: 30px;
    text-align: left;
    text-indent: 2em;
}
.thumb-img-list {
    img {
        width: 100px;
        
    }
}
}
</style>>
