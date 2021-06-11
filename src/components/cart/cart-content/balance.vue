<template>
	<div class="balance">
		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="head-center">结算</p>
  		</div>
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
		<div class="goods" v-for="(item,index) in goods">
			<div class="goods-shop">
				<i class="el-icon-s-shop"></i>
				<span>{{item.goods.shop.shop_name}}</span>
			</div>
			<div class="goods-message other">
				<img :src="'http://www.liuguanjin.top:8101'+item.goods.goods_logo" alt="正在加载">
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
				haveAddress:true,
				user_note:"",
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
			this.goods_ids = this.$route.query.goods_ids;
			for(var i = 0;i < this.goods_ids.length;i ++ ){
				if (this.goods_ids[i].number) {
					this.totalNumber += this.goods_ids[i].number;
				}
			}
			this.getGoods();
			if (this.$route.query.address) {
				this.address = this.$route.query.address;
			}else{
				this.getAddress();
			}
			if (this.address.length == 0) {
				this.haveAddress = false;
			}
		},
		methods:{
			...mapActions({
      			replaceCartArr:"replaceCartArr",
  			}),
			chooseAddress(){
				this.$router.push({name:'address',query:{id:this.user_id,goods_ids:this.goods_ids}});
			},
			commitOrder(){
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
						for(var i = 0;i < this.arr.length;i ++){
							for(var j = 0;j < this.goods_ids.length;j ++){
								if (this.arr[i].spec_goods_id == this.goods_ids[j].spec_goods_id) {
									this.arr.splice(i,1);
								}
							}
						}
						this.$router.push('ordersuccess');
					}else{
						this.$message({message:'提交订单失败，请重新结算',type:'warning'});
					}
				})
			},
			back(){
				this.$router.go(-1);
			},
			getGoods(){
				this.$homehttp({
		 			url:'balancegoods',
		 			method:'post',
		 			data:this.goods_ids
		 		}).then(result=>{
		 			const {code,msg,data} = result.data;
		 			if (code == 200) {
		 				for(var i = 0;i < data.length;i ++ ){
		 					if (typeof(data[i].spec_goods.price) == 'string') {
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
				this.$homehttp({
					url:'address?page=balance&user_id='+this.user_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.address = data;
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
		background-color:#eee;
		.flexColumnCenter();
	}
	.head{
	 	position: relative;
      	height:44px;
      	line-height:44px;
      	background-color:#f23030;
      	width:100%;
      	.back{
      		position:absolute;
      		left:20px;
      		height:44px;
    		line-height:44px;
    		font-size:20px;
      	}
  	 	.head-center{
	        text-align:center;
	        font-weight:bold;
	        margin:0;
  		}
	}
	.address{
		padding:10px 5px;
		margin-top:10px;
		border-radius:10px;
		width:95%;
		background-color:#fff;
		.flexRowCenter();
		position:relative;
		.left-location{
			width:10%;
			text-align:center;
			i{
				width:20px;
				height:20px;
				line-height:20px;
				text-align:center;
				background-color:red;
			}
		}
		.right-message{
			width:80%;
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
		border-radius:10px;
		width:95%;
		background-color:#fff;
		margin:10px 0;
		position:relative;
		padding:16px 5px;
		.flexColumnCenter();
		.other{
			width:60%;
			margin:10px 30px;
			.flexRowCenter();
			justify-content:space-between;
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
			align-self:flex-start;
			.flexRowCenter();
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
				cursor:pointer;
				color:#FF4400;
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
				margin:0 15px;
				.flexColumnCenter();
				align-items:flex-start;
				.goods-name{
					font-size:14px;
					height:40px;
					line-height:20px;
					overflow:hidden;
					margin-bottom:10px;
				}
				.spec-goods{
					font-size:14px;
					height:20px;
					line-height:20px;
					overflow:hidden;
					background-color:#Eee;
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
			font-size:18px;
			height:20px;
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