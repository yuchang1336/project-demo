<template>
  <div id="app">

    <!-- 顶部 header 区域 -->
    <mt-header fixed title="商城">
      <!-- <router-link to="/" slot="left" > -->
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- </router-link> -->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    


    <!-- 中间的路由区域 -->

    <transition>
    <router-view></router-view>
    </transition>


    <!--  底部的tabbar 区域-->

    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shop">
				<!-- <span class=" mui-icon-extra mui-icon-extra-cart"></span> -->
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      flag: true   // 默认显示返回按钮
    }
  },
  methods: {
    goBack() {
      // 点击返回按钮，向后跳转
      this.$router.go(-1)
    },
    created() {
      if(this.$route.path === "/home") {
          this.flag = false
        }else{
          this.flag = true
        }
    },
    watch: {
      // 第一次，当页面刷新后，不会触发 watch 中监听的路由地址的变化
      '$route.path': function(newVal, oldVal) {
        if(newVal === "/home") {
          this.flag = false
        }else{
          this.flag = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // padding: 40px;
  padding-top: 40px;
  padding-bottom: 50px;
  overflow: hidden;
}

.v-enter{
  opacity: 0;
  // 让即将进入屏幕的页面向右偏移100%的宽度
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  // 让即将离开时屏幕的页面向左偏移100%的宽度
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-to{
  transition: all 1s ease;
}

.mint-header {
  z-index: 99;
}
</style>
