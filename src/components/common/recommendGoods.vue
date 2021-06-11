<template>
	<!-- 推荐商品 -->
	<div class="recommend-goods">
		<!-- 推荐商品提示栏 -->
		<div class="recommend-tips">
			<p class="gray-tips">猜你喜欢</p>
		</div>
		<!-- 推荐的商品 -->
		<div class="goods">
			<div class="content-item" v-for="(item,index) in goods">
				<img :src="'http://www.liuguanjin.top:8101'+item.goods_logo"  @click="enterDetail(item.id,$event)">
				<p class="title"  @click="enterDetail(item.id,$event)">{{item.goods_name}}</p>
				<div class="goods-bottom">
					<div class="price-number"  @click="enterDetail(item.id,$event)">
						<p class="price">${{item.goods_price}}</p>
						<p class="number">剩余:{{item.goods_number}}</p>
					</div>
					<p class="empty" v-if="false">空元素</p>
					<p class="shop_name" @click="enterShopDetail(item.shop.id)">{{item.shop.shop_name}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				goods:[],
			}
		},
		methods:{
			getGoods(){
				var userinfo = localStorage.getItem('userinfo');
				userinfo = JSON.parse(userinfo)
				var user_id = 0;
				if (userinfo != null && userinfo != '' && userinfo != undefined) {
					user_id = userinfo.user_id;
				}
				this.$homehttp({
					url:'recommend-goods/'+user_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.goods = data;
					}
					console.log(this.goods);
				})
			},
			enterDetail(id,e){
	 			// 进入商品详情界面
	 			this.$router.push({name:"detail",query:{id:id}});
 			},
 			enterShopDetail(id){
 				this.$router.push({name:"shopDetail",query:{id:id}});
 			}
		},
		created(){
			this.getGoods();
		}
	}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.goods{
		.flexRowCenter();
		justify-content:center;
		flex-wrap:wrap;
		margin-bottom:60px;
		.content-item{
			background-color:#fff;
			border-radius:15px;
			margin-top:10px;
			margin-left:@commonMargin;
			.flexColumnCenter();
			width:47%;
			img{
				width:100%;
				margin:0;
			}
			p.title:hover{
				cursor:pointer;
				color:#FF4400;
			}
			.title{
				font-size:@textSize;
				line-height:20px;
				height:40px;
				overflow:hidden;
				margin:5px;
			}
			.goods-bottom{
				width:100%;
				.flexRowCenter();
				justify-content:space-between;
				.price-number{
					.price{
						font-size:14px;
						align-self:flex-start;
						color:@mallColor;
						margin:5px;
					}
					.number{
						font-size:14px;
						align-self:flex-start;
						color:@mallColor;
						margin:5px;
					}
				}
				.shop_name{
					margin:0;
					padding:0;
					font-size:14px;
					align-self:flex-end;
					margin-bottom:5px;
					margin-right:10px;
				}
				p.shop_name:hover{
					cursor:pointer;
					text-decoration:underline;
					color:#FF4400;
				}
			}
		}
	}
</style>