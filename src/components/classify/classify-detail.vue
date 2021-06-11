<template>
  <div class="classify-detail">
  	<my-head>
  		<h1>分类详情</h1>
  		<i class="el-icon-back back" @click="back"></i>
  	</my-head>
  	<div 
  	v-for="(item,index) in categoryDetailArr"
  	:key="index"
  	class="shop-classify" 
  	@click="toDetail(item.id)"
  	>
  		<img :src="'http://www.liuguanjin.top:8101'+item.goods_logo" alt="">
  		<div class="shop-text">
  			<p class="shop-title">{{item.goods_name}}</p>
  			<p class="shop-price">￥{{item.goods_price}}</p>
  			<p class="shop-name">{{item.shop.shop_name}}</p>
  		</div>
  	</div>
  </div>
</template>

<script>
import myHead from "../common/head.vue";
export default {
	data(){
		return {
			categoryDetailArr:[],
			id:0,
		}
	},
 	created(){
 		this.id = this.$route.query.id;
	 	this.getCategoryDetailArr();
 	},
 	components:{
 		"my-head":myHead
 	},
 	methods:{
 		back(){
			// 返回实现
			this.$router.go(-1);
		},
		toDetail(id){
			this.$router.push({name:"detail",query:{id:id}});
		},
		getCategoryDetailArr(){
			this.$homehttp({
				url:'category-detail/'+this.id
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.categoryDetailArr = data;
				}else{

				}
			})
		}
 	}
}
</script>

<style lang="less" scoped>
@import url("../less/common.less");
	.classify-detail{
		background-color:#eee;
		padding-bottom:10px;
		.shop-classify{
			width:95%;
			margin:0 auto;
			margin-top:10px;
			background-color:#fff;
			padding:10px 0;
			border-radius:15px;
			.flexRowCenter();
			img{
				margin-left:5px;
				height:100px;
			}
			.shop-text{
				margin-left:5px;
				.flexColumnCenter();
				align-items:flex-start;
				p{
					margin:3px 0;
					padding:0;
				}
				.shop-title{
					height:30px;
					line-height:15px;
					overflow:hidden;
				}
				.shop-price{
					color:#E93B75;
					font-size:18px;
				}
				.shop-name{
					color:gray;
					font-size:8px;
				}
			}
		}
	}
</style>
