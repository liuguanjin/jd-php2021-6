<template>
	<div class="balance">
		<!-- 前台结算界面 -->
		<!-- 结算头部 -->
		<div class="header">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="head-center">结算</p>
  		</div>
  		<!-- 结算界面的收货地址 -->
		<div class="address" @click="chooseAddress">
			<div class="left-location">
				<i class="el-icon-location-outline"></i>
			</div>
			<div class="right-message" v-if="haveAddress">
				<div class="message-top">
					<span>{{address.consignee}}</span>
					<span>{{address.phone}}</span>
				</div>
				<div class="message-bottom">
					<span>{{address.area+address.address}}</span>
				</div>
			</div>
			<div class="right-message" v-else>
				暂无收货地址，请先添加
			</div>
		</div>
		<!-- 结算的商品 -->
		<div class="goods" v-for="(item,index) in goods">
			<div class="goods-shop">
				<i class="el-icon-s-shop"></i>
				<span>{{item.goods.shop.shop_name}}</span>
			</div>
			<div class="goods-message other">
				<img 
				:src="defaultImage" 
	 			v-real-img="'http://www.liuguanjin.top:8101'+item.goods.goods_logo"
				>
				<div class="goods-detail">
					<span class="goods-name">{{item.goods.goods_name}}</span>
					<span class="spec-goods">{{item.spec_goods.value_names}}</span>
				</div>
				<div class="goods-price">
					<span>¥{{item.spec_goods.price}}</span>
					<span>×{{goods_ids[index].number}}</span>
				</div>
			</div>
			<div class="transport other after">
				<span>配送方式</span>
				<span>普通配送</span>
				<span>快递 免邮</span>
			</div>
			<div class="freight-insurance other after">
				<span>运费险</span>
				<span>卖家赠送,退换货可陪</span>
			</div>
			<div class="shop-discount other after">
				<span>店铺优惠</span>
				<span></span>
				<span></span>
			</div>
			<div class="invoice other after">
				<span>开具发票</span>
				<span>本次不开具发票</span>
			</div>
			<div class="order-remarks other">
				<span>订单备注</span>
				<input type="text" placeholder="选填,请先和商家协商一致" v-model="user_note">
			</div>
			<div class="cost">
				<span>共{{goods_ids[index].number}}件,小计:¥{{item.spec_goods.price*goods_ids[index].number}}</span>
			</div>
		</div>
		<!-- 结算右下角统计 -->
		<div class="place-order">
			<span>共{{totalNumber}}件,小计:¥{{totalPrice}}</span>
			<el-button type="danger" round @click="commitOrder">提交订单</el-button>
		</div>
	</div>
</template>

<script>
	import {mapActions,mapState} from "vuex";
	export default {
		data(){
			return {
				user_id:0,
				goods_ids:[],
				goods:[],
				address:{

				},
				totalNumber:0,
				totalPrice:0,
				haveAddress:false,
				user_note:"",
				defaultImage:this.defaultImage,
			}
		},
		computed:{
		 	...mapState({
		 		arr:state => state.cart.cartArr,
		 	})
		 },
		created(){
			var userinfo = JSON.parse(localStorage.getItem('userinfo'));
			if (userinfo != undefined && userinfo != '' && userinfo != null) {
				this.user_id = userinfo.user_id;
			}
			//得到从上级界面传下来结算的商品id
			this.goods_ids = this.$route.query.goods_ids;
			//商品的总数
			for(var i = 0;i < this.goods_ids.length;i ++ ){
				if (this.goods_ids[i].number) {
					this.totalNumber += this.goods_ids[i].number;
				}
			}
			//得到结算商品的信息及总价
			this.getGoods();
			//如果从选择地址中返回 则界面中的地址改为选择地址界面选中的地址
			if (this.$route.query.address) {
				this.address = this.$route.query.address;
				this.haveAddress = true;
			}else{
				//如果从购物车中返回 则界面中的地址改为用户默认地址
				this.getAddress();
			}
		},
		methods:{
			...mapActions({
      			replaceCartArr:"replaceCartArr",
  			}),
			chooseAddress(){
				//跳转到选择收货地址界面
				this.$router.push({name:'address',query:{id:this.user_id,goods_ids:this.goods_ids,fromBalance:true}});
			},
			commitOrder(){
				//提交结算的订单
				var order_date = new Date();
				var sNow = "";
				sNow += order_date.getFullYear();
				sNow += (order_date.getMonth()+1);
				sNow += order_date.getDate();
				sNow += order_date.getHours();
				sNow += order_date.getMinutes();
				sNow += order_date.getSeconds();
				sNow += order_date.getMilliseconds();
				var order_sn = sNow;
				var order_data = {order_sn:order_sn,user_id:this.user_id,order_status:0,consignee:this.address.consignee,address:this.address.area+this.address.address,phone:this.address.phone,goods_price:this.totalPrice,order_amount:this.totalPrice,total_amount:this.totalPrice,goods_ids:this.goods_ids,user_note:this.user_note}
				this.$homehttp({
					url:'order',
					method:'post',
					data:order_data
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'提交订单成功',type:'success'});
						//结算后购物车中的商品清除
						for(var i = 0;i < this.arr.length;i ++){
							for(var j = 0;j < this.goods_ids.length;j ++){
								if (this.arr[i].spec_goods_id == this.goods_ids[j].spec_goods_id) {
									this.arr.splice(i,1);
								}
							}
						}
						//跳转到结算成功界面
						this.$router.push('ordersuccess');
					}else{
						this.$message({message:'提交订单失败，请重新结算',type:'warning'});
					}
				})
			},
			back(){
				//返回购物车
				this.$router.push('/cart');
			},
			getGoods(){
				//根据商品id发起请求 获取商品信息
				this.$homehttp({
		 			url:'balancegoods',
		 			method:'post',
		 			data:this.goods_ids
		 		}).then(result=>{
		 			const {code,msg,data} = result.data;
		 			if (code == 200) {
		 				for(var i = 0;i < data.length;i ++ ){
		 					if (typeof(data[i].spec_goods.price) == 'string') {
		 						//根据规格商品价格得到总价
				 				data[i].spec_goods.price = parseFloat(data[i].spec_goods.price);
				 				this.totalPrice += (data[i].spec_goods.price *  this.goods_ids[i].number)
		 					}
		 				}
		 				this.goods = data;
		 			}else{
		 				this.$message({message:msg,type:'warning'});
		 			}
		 		})
			},
			getAddress(){
				//根据用户id获取用户保存的收获地址
				this.$homehttp({
					url:'address?page=balance&user_id='+this.user_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.address = data;
						this.haveAddress = true;
					}else{
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.balance{
		.flexColumnCenter();
		background-color:#eee;
	}
	.header{
	 	position: relative;
      	width:100%;
      	height:44px;
      	background-color:#f23030;
      	line-height:44px;
      	.back{
      		position:absolute;
      		left:20px;
      		height:44px;
    		font-size:20px;
    		line-height:44px;
    		cursor: pointer;
      	}
  	 	.head-center{
	        margin:0;
	        text-align:center;
	        font-weight:bold;
  		}
	}
	.address{
		position:relative;
		.flexRowCenter();
		width:95%;
		margin-top:10px;
		padding:10px 5px;
		background-color:#fff;
		border-radius:10px;
		.left-location{
			width:10%;
			text-align:center;
			i{
				width:20px;
				height:20px;
				background-color:red;
				text-align:center;
				line-height:20px;
			}
		}
		.right-message{
			width:80%;
			cursor: pointer;
		}
	}
	.address:after{
		content:"";
		display:inline-block;
		position:absolute;
		right:5%;
		width:8px;
		height:8px;
		border-color:#000;
		border-style:solid;
		border-width:2px 2px 0 0;
		-webkit-transform:rotate(45deg);
		transform:rotate(45deg);
	}
	.goods{
		position:relative;
		.flexColumnCenter();
		width:95%;
		margin:10px 0;
		padding:16px 5px;
		background-color:#fff;
		border-radius:10px;
		.other{
			.flexRowCenter();
			justify-content:space-between;
			width:60%;
			margin:10px 30px;
		}
		.after:after{
			content:"";
			display:inline-block;
			width:6px;
			height:6px;
			border-color:#aaa;
			border-style:solid;
			border-width:2px 2px 0 0;
			-webkit-transform:rotate(45deg);
			transform:rotate(45deg);
		}
		.goods-shop{
			.flexRowCenter();
			align-self:flex-start;
			.el-icon-s-shop{
				width:15px;
				height:15px;
				margin:0 3px;
				color:gray;
			}
			span{
				font-size:18px;
				font-weight:600;
			}
			span:hover{
				color:#FF4400;
				cursor:pointer;
			}
		}
		.goods-message{
			.flexRowCenter();
			align-items:flex-start;
			width:95%;
			img{
				width:100px;
				height:100px;
			}
			.goods-detail{
				.flexColumnCenter();
				align-items:flex-start;
				margin:0 15px;
				.goods-name{
					overflow:hidden;
					height:40px;
					margin-bottom:10px;
					font-size:14px;
					line-height:20px;
				}
				.spec-goods{
					overflow:hidden;
					height:20px;
					background-color:#Eee;
					font-size:14px;
					line-height:20px;
				}
			}
			.goods-price{
				.flexColumnCenter();
			}
		}
		.cost{
			position:absolute;
			right:20px;
			bottom:0;
			height:20px;
			font-size:18px;
			line-height:20px;
			color:red;
		}
		.order-remarks{
			input{
				outline:none;
				border:none;
				border-bottom:1px solid #eee;
				text-align:center;
			}
		}
	}
	.place-order{
		align-self:flex-end;
		margin:10px 0;
		margin-right:2.5%;
	}
</style>