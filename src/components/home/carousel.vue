<template>
  <div class="carousel">
  	<!-- 首页轮播图 -->
	<el-carousel :interval="4000" type="card" height="200px">
	    <el-carousel-item v-for="(item,index) in carousels" :key="index">
	      	<img :src="item.imgSrc">
	    </el-carousel-item>
  	</el-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			carousels:[]
 		}
 	},
 	created(){
 		this.getCarousels();
 	},
 	methods:{
 		getCarousels(){
 			// 通过axios获取轮播图数据
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/img-src.json").then(response=>{
 				this.carousels = response.data;
 			})
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.carousel{
		width:100%;
		img{
			width:100%;
			height:100%;
		}
	}
</style>
