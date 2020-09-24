<template>
  <div class="comment">
    <h4>发表评论--{{newsid}}</h4>
    <hr>
    <textarea placeholder="评论内容(最多为100字)" maxlength="100" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postMsg">发表</mt-button>


    <!-- 评论列表区域 -->
    <div class="cmt-list">
        <div class="cmt-item" v-for="(item, id) in cmlist" :key="id">
            <div class="cmt-item-title">第{{id+1}}楼&nbsp;用户：{{item.user_name}}&nbsp;发表时间：{{item.add_time|dateFormat}}</div>
            <div class="cmt-item-body">{{item.content}}</div>
        </div>
    </div>




    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
// 按需导入 Mint-ui ，导出所需要的弹框组件即可
import {Toast} from "mint-ui"


export default {
    props:['newsid'],    // 接收  Newsinfo 传来的  newsid
    data() {
        return {
            page: 1 ,//默认展示第一页的评论
            cmlist: [], // 定义  接收评论列表的数据  的一个空数组
            msg: ""  //  即将发表评论的内容
        }
    },
    created() {
        this.getCommentByPage()
    },
    methods: {
        async getCommentByPage() {
            const {data} = await this.$axios.get("/api/getcomments/" + this.newsid + "?pageindex=" + this.page)
            // console.log(data)
            if(data.status ===0 ){
                return this.cmlist = this.cmlist.concat(data.message)
            }
        },
        async postMsg() {
            // 点击发表评论内容
            // 如果用户没有发表评论内容，则阻止其发表评论
            if(this.msg.trim().length <= 0){
                return Toast("请填写评论内容")
            }
                // 发表评论的逻辑处理
                const { data } = await this.$axios.post('/api/postcomment/' + this.newsid, {content: this.msg.trim()})
                console.log(data)
            if(data.status === 0){
                //   刷新评论列表
                // 再次调用 getCommentByPage()  刷新列表
                // 获取评论之前，先把之前的评论清空
                // this.cmlist = []
                // this.getCommentByPage()


                // 为防止重新调用 getCommentByPage 方法的时候，把之前的所有评论清空的问题
                // 在客户端手动拼接一个评论的对象，并把这个 评论的对象， unshift  到 cmlist 中
                this.cmlist.unshift({
                    user_name: "匿名用户",
                    add_time: new Date(),
                    content: this.msg.trim()
                })
                this.msg = ""
            }
        },
        loadMore() {
            // 点击按钮加载更多的评论
            // 当触发这个加载更多方法的时候，应该让 page 页码+1 之后，再调用 getCommentByPage 方法
            this.page += 1
            this.getCommentByPage()
            // console.log("Ok")
        }
    }
}
</script>

<style lang="scss" scoped>
.comment{
    text-align: left;
    textarea{
        font-size: 14px;
        margin: 0;
    }
.cmt-list{
    .cmt-item{
        line-height: 30px;
        .cmt-item-title{
            margin-top: 5px;
            font-size: 14px;
            background-color: #ddd;
        }
        .cmt-item-body{
            text-indent: 2em;
        }

    }
}
}
</style>