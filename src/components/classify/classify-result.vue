<template>
	<div class="classify-result">
		<my-head>
  			<h1>搜索结果</h1>
  			<i class="el-icon-back back" @click="back"></i>
  		</my-head>
  		<div 
  		v-for="(item,index) in searchResultArr"
  		:key="index"
  		class="search-goods" 
  		>
  			<img 
  			:src="defaultImage" 
 			v-real-img="'http://www.liuguanjin.top:8101'+item.goods_logo" 
  			@click="toDetail(item.id)"
  			>
  			<div class="shop-text">
  				<p class="shop-title" @click="toDetail(item.id)">{{item.goods_name}}</p>
  				<p class="shop-price">￥{{item.goods_price}}</p>
  				<p class="shop-name" @click="enterShopDetail(item.shop.id)">{{item.shop.shop_name}}</p>
  			</div>
  		</div>
  		<div class="search-goods-little" v-if="isLittle">
  			<p class="little-tips">{{littleTips}}</p>
  		</div>
	</div>
</template>

<script>
import myHead from "../common/head.vue";
export default {
	data(){
		return {
			searchResultArr:[],
			search_input:'',
			isLittle:true,
			littleTips:'',
			defaultImage:this.defaultImage,
		}
	},
	created(){
		this.search_input = this.$route.query.search_input;
	 	this.getSearchResultArr();
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
		getSearchResultArr(){
			this.$homehttp({
				url:'search-result?search_input='+this.search_input
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.searchResultArr = data;
				}
			})
		},
		enterShopDetail(id){
 			this.$router.push({name:"shopDetail",query:{id:id}});
 		},
	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.classify-result{
		border-top:1px solid #e5e5e5;
		background-color:#eee;
		.back{
			cursor: pointer;
		}
		.search-goods{
			.flexRowCenter();
			width:95%;
			margin:0 auto;
			margin-top:10px;
			padding:10px 0;
			background-color:#fff;
			border-radius:15px;
			img{
				height:100px;
				margin-left:5px;
				cursor: pointer;
			}
			.shop-text{
				.flexColumnCenter();
				align-items:flex-start;
				margin-left:5px;
				p{
					margin:3px 0;
					padding:0;
				}
				.shop-title{
					overflow:hidden;
					height:30px;
					line-height:15px;
					cursor: pointer;
				}
				.shop-price{
					font-size:18px;
					color:#E93B75;
				}
				.shop-name{
					font-size:8px;
					color:gray;
					cursor: pointer;
				}
			}
		}
	}
</style>