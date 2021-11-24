<template>
  <div class="supermarket">
  	<div class="header">
  		<i class="el-icon-back back" @click="back" color="#9e9e9e"></i>
  		<div class="title">京东超市</div>
  		<div class="more">···</div>
  	</div>
  	<div class="carousel">
  		<el-carousel :interval="4000" type="card" height="200px">
		    <el-carousel-item v-for="(item,index) in carousels" :key="index">
		      	<img 
		      	:src="defaultImage" 
		 				v-real-img="item.imgSrc"
		      	>
		    </el-carousel-item>
	  	</el-carousel>
  	</div>
  	<div class="classify">
  		<div v-for="(item,index) in classifys" class="classify-item">
  			<img 
  			:src="defaultImage" 
 				v-real-img="item.imgSrc"
  			>
  			<span>{{item.title}}</span>
  		</div>
  	</div>
  	<div class="qianggou">
  		<div class="head">
  			<span>超市抢购</span>
  			<span>拼手速抢惊喜</span>
  		</div>
  		<div class="time">
  			<span :class="choose1?'active':'common'" @click="pm12">12:00</span>
  			<span :class="choose2?'active':'common'" @click="pm16">16:00</span>
  			<span :class="choose3?'active':'common'" @click="pm20">20:00</span>
  			<span :class="choose4?'active':'common'" @click="pm0">00:00</span>
  		</div>
  		<div class="qianggou-shop">
	  			<div class="item" v-for="(item,index) in arr12pm">
	  				<img 
	  				:src="defaultImage" 
 						v-real-img="item.imgSrc"
	  				>
	  				<p class="title">{{item.title}}</p>
	  				<p class="price-top">¥{{item.priceTop}}</p>
	  				<p class="price-bottom">¥{{item.priceBottom}}</p>
	  			</div>
	  		</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			carousels:[],
 			classifys:[],
 			choose1:true,
 			choose2:false,
 			choose3:false,
 			choose4:false,
 			arr12pm:[],
 			startX:0,
 			endX:0,
 			left:0,
 			moveFlag:false,
 			defaultImage:this.defaultImage,
 		}
 	},
 	created(){
 		this.getCarousels();
 		this.getClassify();
 		this.pm12();
 	},
 	methods:{
 		getCarousels(){
 			// 通过axios获取轮播图数据
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-carousel.json").then(response=>{
 				this.carousels = response.data;
 			})
 		},
 		getClassify(){
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-classify.json").then(response=>{
 				this.classifys = response.data;
 			})
 		},
 		pm12(){
 			this.left = 0;
 			this.choose1 = true;
 			this.choose2 = false;
 			this.choose3 = false;
 			this.choose4 = false;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		pm16(){
 			this.left = 0;
 			this.choose1 = false;
 			this.choose2 = true;
 			this.choose3 = false;
 			this.choose4 = false;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou-16pm.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		pm20(){
 			this.left = 0;
 			this.choose1 = false;
 			this.choose2 = false;
 			this.choose3 = true;
 			this.choose4 = false;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		pm0(){
 			this.left = 0;
 			this.choose1 = false;
 			this.choose2 = false;
 			this.choose3 = false;
 			this.choose4 = true;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		back(){
 			this.$router.go(-1);
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	*{margin:0;padding:0}
	.supermarket{
		background-color:#eee;
		.header{
			.flexRowCenter();
			justify-content:space-between;
			background-color:#fff;
			.back{
				height:44px;
				margin-left:10px;
				line-height:44px;
				cursor:pointer;
			}
			.title{
				height:44px;
				margin:0 70px;
				font-size:16px;
				line-height:44px;
				text-align:center;
				color:#333;
			}
			.more{
				height:44px;
				margin-right:10px;
				font-size:16px;
				line-height:44px;
				text-align:center;
			}
		}
		.carousel{
			width:100%;
			img{
				width:100%;
				height:100%;
			}
		}
		.classify{
			.flexRowCenter();
			justify-content:space-between;
			flex-wrap:wrap;
			margin-top:10px;
			background-color:#fff;
			.classify-item{
				.flexColumnCenter();
				width:20%;
				margin-bottom:10px;
				img{
					width:80%;
					margin-bottom:3px;
				}
				span{
					font-size:10px;
					text-align:center;
				}
			}
		}
		.qianggou{
			margin-top:10px;
			padding-left:15px;
			background-color:#fff;
			.head{
				span:nth-child(1){
					font-size:18px;
					font-weight:600;
				}
				span:nth-child(2){
					padding-left:5px;
					border-left:1px solid gray;
					font-size:14px;
					color:gray;
				}
			}
			.time{
				margin:10px 0; 
				span{
					padding:3px 20px;
					border-radius:20px;
					background-color:#eee;
				}
				.active{
					background-color:#FFA07F;
					color:white;
				}
			}
			.qianggou-shop{
				display:flex;
				flex-direction:row;
				align-items:center;
				flex-wrap:no-wrap;
				overflow-x: scroll;
				.item{
					width:35%;
					img{
						width:100%;
					}
					.title{
						overflow:hidden;
						width:100%;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
					.price-top{
						color:#ccc;
					}
				}
			}
			
		}
	}
</style>
