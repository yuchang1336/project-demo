<template>
  <div>
    <div class="mint-swipe">
     <!-- 使用图片轮播图 -->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in pitures" :key="index">
            <img :src="item.img" alt="">
        </mt-swipe-item>
    </mt-swipe>
    </div> 


    <!--  九宫格布局 -->
     <ul class="mui-table-view mui-grid-view mui-grid-9">
	    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
	            <img src="@/assets/images/menu1.png" alt="">
	            <div class="mui-media-body">新闻资讯</div></router-link></li>
	    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
	            <img src="@/assets/images/menu2.png" alt="">
	            <div class="mui-media-body">图片分享</div></router-link></li>
	    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
	            <img src="@/assets/images/menu3.png" alt="">
	            <div class="mui-media-body">商品购买</div></router-link></li>
	    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	            <img src="@/assets/images/menu4.png" alt="">
	            <div class="mui-media-body">留言反馈</div></a></li>
	    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	            <img src="@/assets/images/menu5.png" alt="">
	            <div class="mui-media-body">视频专区</div></a></li>
	    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	            <img src="@/assets/images/menu6.png" alt="">
	            <div class="mui-media-body">联系我们</div></a></li>
	</ul> 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
      return {
        pitures:[]
      }
  },
  created() {
      this.getpictures()
  },
  methods: {
      async getpictures() {
        //   获取轮播图的方法
          const { data } = await this.$axios.get('/api/getlunbo')
          console.log(data)
          if(data.status === 0){
              this.pitures = data.message
          }else{
              console.log('数据没有拿到')
          }
      } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mint-swipe {
    height:180px;


    .mint-swipe-item{
        img{
            width: 100%;
            height: 100%;
        }
        &:nth-child(1){
            background-color: skyblue;
        }
        &:nth-child(2){
            background-color: pink;
        }
        &:nth-child(3){
            background-color: yellow;
        }
    }
}
.mui-grid-view{
       li {
           img{
                width: 60px;
                height: 60px;
           }
       }
    } 

.mui-grid-view.mui-grid-9{
    background-color: #fff;
}
</style>