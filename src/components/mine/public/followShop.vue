<template>
	<!-- 关注店铺界面 -->
	<div class="follow-shop">
		<div class="header">
	  		<i class="el-icon-back back" @click="back"></i>
			<p>关注店铺</p>
		</div>
		<div 
		class="shop" 
		v-for="(item,index) in shopCollectDetail"
		:key="index"
		>
			<img 
			:src="defaultImage" 
 			v-real-img="'http://www.liuguanjin.top:8101'+item.shop_logo"
			>
			<div class="shop-right">
				<p class="shop-name" @click="enterShop(item.id)">{{item.shop_name}}</p>
				<span class="sign">店铺</span>
				<div class="goods">
					<div class="goods-item" v-for="(item1,index1) in item.goods">
						<img 
						:src="defaultImage" 
		 				v-real-img="'http://www.liuguanjin.top:8101'+item1.goods_logo"
						@click="enterGoods(item1.id)"
						>
					</div>
				</div>
			</div>
		</div>
		<div class="tips" v-if="isShowTips">
			您暂无关注店铺
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				shopCollectArr:[],
				shopCollectDetail:[],
				isShowTips:false,
				defaultImage:this.defaultImage,
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getShopCollectDetail(){
				var shop_collect_ids = [];
				for(var i = 0;i < this.shopCollectArr.length;i ++ ){
					var id = parseInt(this.shopCollectArr[i]);
					shop_collect_ids.push(id);
				}
				if (shop_collect_ids.length === 0) {
					this.isShowTips = true;
				}else{
					this.$homehttp({
						url:'collect-shop-detail',
						method:'post',
						data:shop_collect_ids
					}).then(result=>{
						const {code,msg,data} = result.data;
						if (code == 200 ) {
							this.shopCollectDetail = data;
						}
					})
					this.isShowTips = false;
				}
			},
			enterShop(id){
				this.$router.push({name:"shopDetail",query:{id:id}});
			},
			enterGoods(id){
				this.$router.push({name:"detail",query:{id:id}});
			}
		},
		created(){
			this.shopCollectArr = this.$route.query.shopCollectArr;
			this.getShopCollectDetail();
		},
	}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.follow-shop{
		.flexColumnCenter();
		padding-bottom:10px;
		background-color:#eee;
		.header{
			.flexRowCenter();
			justify-content:flex-start;
			width:100%;
			height:44px;
			background-color:white;
			line-height:44px;
			.back{
				margin-left:10px;
				font-size:16px;
				cursor: pointer;
			}
			p{
				margin:0 auto;
				font-size:15px;
			}
		}
		.shop{
			width:86%;
			.flexRowCenter();
			margin:10px 0;
			padding:10px 0;
			background-color:white;
			border-radius:20px;
			img{
				width:60px;
				height:60px;
				margin-left:10px;
				border:1px solid #eee;
			}
			.shop-right{
				.flexColumnCenter();
				align-items:flex-start;
				margin-left:10px;
				padding-left:10px;
				border-left:1px solid #eee;
				p{
					width:100%;
					margin:5px 0;
					padding:0;
				}
				span{
					height:16px;
					margin:5px 0;
					padding:3px;
					border:1px solid #FF4400;
					font-size:12px;
					line-height:16px;
					border-radius:10px;
				}
				p:hover{
					color:#FF4400;
					cursor:pointer;
				}
				.goods{
					display:flex;
					flex-direction:row;
					overflow:hidden;
					.goods-item{
						width:20%;
						img{
							width:80%;
							height:100%;
							cursor:pointer;
						}
					}
				}
			}
		}
	}
</style>