<template>
	<!-- 关注店铺界面 -->
	<div class="follow-shop">
		<div class="head">
	  		<i class="el-icon-back back" @click="back"></i>
			<p>关注店铺</p>
		</div>
		<div 
		class="shop" 
		v-for="(item,index) in shopCollectDetail"
		:key="index"
		>
			<img :src="'http://www.liuguanjin.top:8101'+item.shop_logo" alt="正在加载">
			<div class="shop-right">
				<p class="shop-name" @click="enterShop(item.id)">{{item.shop_name}}</p>
				<span class="sign">店铺</span>
				<div class="goods">
					<div class="goods-item" v-for="(item1,index1) in item.goods">
						<img 
						:src="'http://www.liuguanjin.top:8101'+item1.goods_logo" alt="正在加载"
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
				console.log(shop_collect_ids);
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
		background-color:#eee;
		padding-bottom:10px;
		.head{
			width:100%;
			.flexRowCenter();
			background-color:white;
			justify-content:flex-start;
			height:44px;
			line-height:44px;
			.back{
				font-size:16px;
				margin-left:10px;
			}
			p{
				margin:0 auto;
				font-size:15px;
			}
		}
		.shop{
			width:86%;
			.flexRowCenter();
			background-color:white;
			border-radius:20px;
			margin:10px 0;
			padding:10px 0;
			img{
				width:60px;
				height:60px;
				border:1px solid #eee;
				margin-left:10px;
			}
			.shop-right{
				.flexColumnCenter();
				align-items:flex-start;
				margin-left:10px;
				border-left:1px solid #eee;
				padding-left:10px;
				p{
					width:100%;
					margin:5px 0;
					padding:0;
				}
				span{
					margin:5px 0;
					border:1px solid #FF4400;
					border-radius:10px;
					padding:3px;
					font-size:12px;
					height:16px;
					line-height:16px;
				}
				p:hover{
					cursor:pointer;
					color:#FF4400;
				}
				.goods{
					overflow:hidden;
					display:flex;
					flex-direction:row;
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