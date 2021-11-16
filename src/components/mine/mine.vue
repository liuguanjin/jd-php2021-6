<template>
  <div class="mine">
    <!-- 个人中心头部 -->
  	<div class="header">
      <i class="el-icon-back back" @click="back"></i>
      <p>您需要登录才能继续访问</p>
    </div>
    <!-- 个人中心内容 -->
    <mine-login></mine-login>
  </div>
</template>

<script>
// 引入头部及内容
import Header from "../common/head.vue";
import Login from "./public/login.vue";
export default {
	methods:{
		back(){
      // 返回的实现
			this.$router.go(-1);
		}
	},
 	components:{
 		"mall-head":Header,
    "mine-login":Login
 	}
}
</script>

<style lang="less" scoped>
  @import url("../less/common.less");
  .mine{
    margin-bottom:60px;
    .header{
      position: relative;
      height:44px;
      background-color:#eee;
      line-height:44px;
      p{
        margin:0;
        font-weight:bold;
        text-align:center;
      }
      .back{
        position:absolute;
        left:10px;
        height:44px;
        margin-left:10px;
        font-size:20px;
        line-height:44px;
      }
    }
  }
</style>
