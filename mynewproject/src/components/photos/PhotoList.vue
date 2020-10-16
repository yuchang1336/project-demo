<template>
	<div>
		<!-- 图片分类区域 -->
	<div class="search">
		<div id="slider" class="mui-slider">
					<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
						<div class="mui-scroll">
							<span
							 :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
							  v-for="item in PhotoCategory"
							   :key="item.id"
							   @click="getPhotoByCategory(item.id)">
								{{item.title}}
							</span>
						</div>
					</div>
				</div>


		<!-- 图片的列表区域 -->
		<ul class="lazyul">
			<router-link tag="li" v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/' + item.id">
				<!-- 需要注意的是 v-lazy 指定的是图片的地址 -->
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-content">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
	
  </div>
	</div>
</template>

<script>
// 导入 mui 的JS文件， 就可以使用 mui 来初始化 滑动控件了
import mui from '@/assets/lib/js/mui.js'


export default {
  name: 'HelloWorld',
  data () {
    return {
		PhotoCategory: [],  // 设置所有图片分类数据
		photolist: []  //  图片列表
	}
  },
  created() {
	  this.getPhotoCategory(),
	  this.getPhotoByCategory(0)
  },
  methods: {
	async getPhotoCategory() {
	//   获取图片分类数据
		const {data} = await this.$axios.get("/api/getimgcategory")
		if(data.status === 0) {
			// console.log(data.message)
			// 后端返回数据中没有  顶部滑块  全部的数据，需要手动设置,使用 数组的 unshift 方法 
			data.message.unshift({title:'全部',id: 0})
			return this.PhotoCategory = data.message
		}
	},
	async getPhotoByCategory(id) {
		// 根据图片分类的 id 来获取图片的数据
		const {data} = await this.$axios.get("/api/getimages/" + id)
		if(data.status === 0) {
			return this.photolist = data.message
		}
	}
  },
  mounted() {
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mui-slider {
	touch-action: pan-x; 
}
.lazyul{
	// background-color: #000;
	margin: 0;
	padding: 10px;
	li {
		background-color: #ccc;
		text-align: center;
		box-shadow: 0 0 5px gray;
		position: relative;
		& + li {
			margin-top: 5px;
		}
		img{
			vertical-align: middle;
			width: 100%
		}
		img[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
		}
	}
}

.info {
	position: absolute;
	color: #fff;
	bottom: 0;
	background-color: rgba(0,0,0,0.5);
	max-height: 86px;
	overflow: hidden;
	.info-title {
		
		font-size: 14px;
	}
	.info-content {
		font-size: 13px;
		text-align: left;
		text-indent: 2em;
	}
}
</style>