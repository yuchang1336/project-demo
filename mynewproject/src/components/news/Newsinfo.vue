<template>
  <div class="newsinfo">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="info">
    <span>时间： {{newsinfo.add_time|dateFormat}}</span>
    <span>次数：{{newsinfo.click}}</span>
    </p>
    <hr>

    <!-- 新闻的内容 -->
    <div v-html="newsinfo.content" class="content"></div>


    <!-- 评论区组件-->
    <!-- 父组件向子组件传值，通过属性绑定的形式,  把 那一篇 文章的id 传给评论区组件 -->
    <comment :newsid="id"></comment>  
  </div>
</template>

<script>
// 导入 Comment.vue 子组件
import comment from '../sub-components/Comment.vue'



export default {
  name: 'member',
  data () {
    return {
      newsinfo: {}, //创造一个  接收新闻详情数据  的空数组
      
    }
  },
  created() {
      // console.log(this.$route.params.id)  拿到路由的参数
      this.getNewsinfo()
  },
  props: ['id'],   //  在 index.js 中定义了使用 props, 在这接收了  文章列表中点击那一篇文章的  id


  // 给 Newsinfo 组件创建一个私有的子组件
  components: {
    comment
  },
  methods: {
    async getNewsinfo() {
      // 根据 id 去获取新闻的详情
      const { data } = await this.$axios.get("/api/getnew/"+ this.id)
      if(data.status === 0){
        return this.newsinfo = data.message[0]
         console.log(data.message)
      }else{
        console.log("数据没有拿到")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.newsinfo{
  padding: 5px;
  .title{
    font-size: 16px;
    text-align: center;
    color: red;
  }

  .info{
    display: flex;
    justify-content: space-between;
    color: #26a2ff;
  }
}
</style>
