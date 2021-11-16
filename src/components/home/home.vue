<template>
  <div class="home">
  	<mall-head>
  		<h1>首页</h1>
  	</mall-head>
  	<home-carousel></home-carousel>
  	<home-classify></home-classify>
  	<home-content></home-content>
  	<div class="beian">
  		<p>备案信息:</p>
  		<a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备20004900号</a>
  	</div>
  </div>
</template>

<script>
import Header from "../common/head.vue";
import Carousel from "./carousel.vue";
import Classify from "./home-classify.vue";
import Content from "./home-content.vue";
export default {
 	components:{
 		"mall-head":Header,
 		"home-carousel":Carousel,
 		"home-classify":Classify,
 		"home-content":Content
 	}
}
</script>

<style lang="less" scoped>
	.home{
		.beian{
			display:flex;
			flex-direction:row;
			justify-content:center;
			margin-bottom:60px;
			p{
				margin:0;
				padding:0;
				color:gray;
			}
			a{
				color:#bbb;
				text-decoration:none;
			}
		}
	}
</style>
