<template>
  <div class="member">

    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                <span>发表时间：{{item.add_time|dateFormat}}</span>
                <span>点击：{{item.click}}</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<script>

export default {
  name: 'Newslist',
  data () {
    return {
        newslist: [] //默认在页面中挂载一个空数组，表示新闻列表
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
      async getNewsList() {
        const { data } = await this.$axios.get("/api/getnewslist")
        if(data.status === 0 ){
            return this.newslist = data.message
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mui-media-body {
    h1 {
        font-size: 16px;
    }

    .mui-ellipsis{
        display: flex;
        justify-content: space-between;
        color: #26a2ff;
    }
}


</style>
