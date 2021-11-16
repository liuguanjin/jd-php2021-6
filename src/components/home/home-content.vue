<template>
  <div class="home-content">
  	<!-- 首页内容 -->
	<div class="content-item" v-for="(item,index) in homeContent">
		<img :src="'http://www.liuguanjin.top:8101'+item.goods_logo"  @click="enterDetail(item.id,$event)">
		<p class="title"  @click="enterDetail(item.id,$event)">{{item.goods_name}}</p>
		<div class="goods-bottom">
			<div class="price-number">
				<p class="price">${{item.goods_price}}</p>
				<p class="number">剩余:{{item.goods_number}}</p>
			</div>
			<p class="empty" v-if="false">空元素</p>
			<p class="shop_name" @click="enterShopDetail(item.shop.id)">{{item.shop.shop_name}}</p>
		</div>
	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			homeContent:[],
 			refreshing:false,
 			loading:false
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.getGoods();
 	},
 	methods:{
 		getGoods(){
 			this.$homehttp({
 				url:'goods'
 			}).then(result=>{
 				const {code,msg,data} = result.data;
 				if (code == 200) {
 					this.homeContent = data;
 				}else{
 					this.$message({message:msg,type:'warning'});
 				}
 			})
 		},
 		enterDetail(id,e){
 			// 进入商品详情界面
 			this.$router.push({name:"detail",query:{id:id}});
 		},
 		enterShopDetail(id){
 			this.$router.push({name:"shopDetail",query:{id:id}});
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.home-content{
		.flexRowCenter();
		justify-content:center;
		flex-wrap:wrap;
		margin-bottom:60px;
		background-color:#eee;
		.content-item{
			.flexColumnCenter();
			width:47%;
			margin-top:10px;
			margin-left:@commonMargin;
			border-radius:15px;
			background-color:#fff;
			img{
				width:100%;
				margin:0;
				cursor: pointer;
			}
			p.title:hover{
				color:#FF4400;
				cursor:pointer;
			}
			.title{
				overflow:hidden;
				height:40px;
				margin:5px;
				font-size:@textSize;
				line-height:20px;
			}
			.goods-bottom{
				.flexRowCenter();
				justify-content:space-between;
				width:100%;
				.price-number{
					.price{
						align-self:flex-start;
						margin:5px;
						font-size:14px;
						color:@mallColor;
					}
					.number{
						align-self:flex-start;
						margin:5px;
						font-size:14px;
						color:@mallColor;
					}
				}
				.shop_name{
					align-self:flex-end;
					margin:0;
					margin-right:10px;
					margin-bottom:5px;
					padding:0;
					font-size:14px;
				}
				p.shop_name:hover{
					color:#FF4400;
					text-decoration:underline;
					cursor:pointer;
				}
			}
		}
	}
</style>
