<template>
  	<!-- 商品详情页面 -->
  	<div class="detail" v-if="isShowDetail">
  		<!-- 详情显示主要组成 -->
	  	<div class="main">
	  		<!-- 头部 -->
		  	<my-head>
		  		<h1>商品详情</h1>
		  		<i class="el-icon-back back" @click="back"></i>
		  	</my-head>
		  	<!-- 详情中的商品图片 -->
		  	<el-carousel :interval="4000" height="400px" >
			    <el-carousel-item v-for="(item,index) in goodsDetail.goods_images" :key="index">
			      	<img :src="'http://www.liuguanjin.top:8101'+item.pics_sma" alt="正在加载">
			    </el-carousel-item>
		  	</el-carousel>
		  	<!-- 商品价格 -->
		  	<div class="price">
		  		<p class="price-a">¥{{goodsDetail.goods_price}}</p>
		  		<div class="price-b">
		  			<div>
		  				<i class="el-icon-bottom money"></i>
				  		<p>降价提醒</p>
		  			</div>
		  			<div @click="addToCollect(id)">
		  				<i class="el-icon-collection-tag money"></i>
		  				<p>收藏</p>
		  			</div>
		  		</div>
		  	</div>
		  	<!-- 商品标题 -->
		  	<div class="title">
		  		<p>{{goodsDetail.goods_name}}</p>
		  	</div>
		  	<!-- 商品数量选择 -->
		  	<div class="choose" @click="showAddnum">
		  		<p class="text">已选</p>
		  		<p class="choose-text">{{value_names}},{{buyNum}}个</p>
		  	</div>
		  	<!-- 住址 -->
		  	<div class="address" @click="isShowMap = true">
		  		<p class="address-text">送至</p>
		  		<p class="address-detail">{{address}}</p>
		  	</div>
		  	<!-- 百度地图部分 -->
	  		<div class="map" v-if="isShowMap" @click.self="isShowMap = false">
	  			<el-input v-model="addressKeyword" placeholder="请输入地址来直接查找相关位置"></el-input>
	  			<baidu-map
	  			class="bmView"
	  			:scroll-wheel-zoom="true"
	  			:center="location"
	  			:zoom="zoom"
	  			@click="getLocationPoint"
	  			ak="6MLto9zSkSW8O54V3IgXTnZkOlIB83qh"
	  			>
	  				<bm-view style="position:absolute;left:25%;bottom:20%;width:50%;height:400px;flex:1"></bm-view>
	  				<bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display:none"></bm-local-search>
				</baidu-map>
	  		</div>
		  	<!-- 运费 -->
		  	<div class="transition">
		  		<p class="transition-text">运费</p>
		  		<p class="transition-detail">免运费</p>
		  	</div>
		  	<!-- 商品保障 -->
		  	<div class="description">
		  		<p class="description-text">商家发货&售后</p>
		  		<p class="description-text">7天无理由退货</p>
		  		<p class="description-text">货到付款</p>
		  	</div>
		  	<div class="shop-message" @click="enterShopDetail(goodsDetail.shop.id)">
		  		<img :src="'http://www.liuguanjin.top:8101'+goodsDetail.shop.shop_logo" alt="">
		  		<p class="shop_name">{{goodsDetail.shop.shop_name}}</p>
		  	</div>
		  	<!-- 商品详情的tabbar -->
		  	<div class="detail-foot">
		  		<div class="foot-text">
		  			<div>
		  				<i class="el-icon-chat-dot-square"></i>
						<p>联系客服</p>
		  			</div>
		  			<div>
		  				<i class="el-icon-s-shop"></i>
						<p>进店</p>
		  			</div>
		  			<div class="cart-show" @click="goToCart">
		  				<i class="el-icon-shopping-cart-2"></i>
		  				<p>购物车</p>
		  				<i :class="cartNum===0?'none':'cartnumshow'">{{cartNum}}</i>
		  			</div>
		  		</div>
		  		<div class="foot-button">
		  			<el-button type="warning"  @click="showAddnum">加入购物车</el-button>
		  			<el-button type="danger">立即购买</el-button>
		  		</div>
		  	</div>
	  	</div>
	  	<!-- 商品加入购物车 -->
		<div class="addnum-box"  @click.self="hideAddnum"   v-show="isShowAddnum">
		  	<div class="addnum">
			  	<div class="addnum-head">
			  			<img :src="'http://www.liuguanjin.top:8101'+goodsDetail.goods_images[0].pics_sma" alt="">
			  			<div class="addnum-des">
			  				<p class="price">¥{{spec_goods_price}}</p>
			  				<div>
			  					<p class="text">已选</p>
			  					<p class="des">{{value_names}},{{buyNum}}个</p>
			  				</div>
			  			</div>
			  	</div>
			  	<div class="addnum-spec_goods">
			  		<div class="spec" v-for="(item,index) in goodsDetail.type.specs" :key="index">
			  			<span class="spec_name">{{item.spec_name}}:</span>
			  			<div class="spec_values">
			  				<span 
			  				v-for="(item1,index1) in item.spec_values" 
			  				@click="changeSpecgoods(item1.id,index,index1)"
			  				:class="spec_value_select[index][index1]?'selected':''"
			  				>
			  				{{item1.spec_value}}
			  				</span>
			  			</div>
			  		</div>
			  	</div>
			  	<div class="addnum-count">
			  		<p class="num-text">数量</p>
			  		<div class="modify">
		  				<i class="el-icon-minus" @click="goodsDel"></i>
			  			<p>{{buyNum}}</p>
		  				<i class="el-icon-plus" @click="goodsAdd"></i>
			  		</div>
			  	</div>
		  		<div class="addnum-foot">
		  			<el-button type="warning" @click="addToCart(id,buyNum)">加入购物车</el-button>
		  			<el-button type="danger">立即购买</el-button>
		  		</div>
			</div>
		</div>
		<!-- 加入购物车成功 -->
		<div class="addToCartSuccess common success" v-show="isShowSuccess">
			<i class="el-icon-check"></i>
			<p>添加至购物车成功</p>
		</div>
		<div class="addToColSuccess common success" v-show="isShowCollectSuccess">
			<i class="el-icon-check"></i>
			<p>添加至收藏夹成功</p>
		</div>
		<div class="addToColFailed common failed" v-show="isShowCollectFailed">
			<i class="el-icon-close"></i>
			<p>此商品已在收藏夹</p>
		</div>
		<div class="loginOrNot common failed" v-show="noLogin">
			<i class="el-icon-close"></i>
			<p>请先登录</p>
		</div>
	</div>
</template>

<script>
import myHead from "../../common/head.vue";
import {mapActions,mapGetters,mapState} from "vuex";
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import BmView from 'vue-baidu-map/components/map/MapView';
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch';
export default {
 data(){
 	return{
 		id:"",
 		isShowDetail:false,
 		goodsDetail:{

 		},
 		buyNum:1,
 		isShowAddnum:false,
 		open:false,
 		titleShow:true,
 		selOrCom:true,
 		smlSelOrCom:true,
 		isShowSuccess:false,
 		isShowCollectSuccess:false,
 		isShowCollectFailed:false,
 		noLogin:false,
 		value_names:"",
 		value_ids:"",
 		isShowMap:false,
 		addressKeyword:"",
 		location:{
 			lng:116.404,
 			lat:39.915
 		},
 		zoom:12.8,
 		address:"北京朝阳区三环到四环之间",
 		spec_value_select:[],
 		spec_goods_price:0,
 		spec_goods_id:""
 	}
 },
 computed:{
 	...mapGetters({
 		"cartNum":"allNum"
 	}),
 	...mapState({
 		arr:state => state.cart.cartArr,
 		collectArr:state => state.collect.collectArr,
 		footprintArr:state => state.footprint.foorprintArr
 	})
 },
 created(){
 	// 获取route传递的参数
 	this.id = this.$route.query.id;
 	var date = new Date();
 	let y = date.getFullYear();
	let m = date.getMonth()+1;
	m = m < 10 ? "0" + m : m;
	let d = date.getDate();
	d = d < 10 ? "0" + d : d;
	date = y + "-" + m + "-" + d;
 	this.addToFootprint({date:date,detail:[{id:this.id}]})
 	var userinfo = localStorage.getItem('userinfo');
  	if (userinfo != '' && userinfo != undefined && userinfo != null) {
    	userinfo = JSON.parse(userinfo)
   	 	var user_id = userinfo.user_id;
    	this.$homehttp({
      		url:'footprint/'+user_id,
      		method:'put',
      		data:this.footprintArr
    	}).then(result=>{

    	})
  	}
 },
 mounted(){
 	this.getGoodsDetail();
 },
 components:{
 	"my-head":myHead,
 	BaiduMap,
 	BmView,
 	BmLocalSearch
 },
 methods:{
 	...mapActions({
 		shopNumTotal:"totalShopNum",
 		addCollectGoods:"increCollectGoos",
 		addToFootprint:"addToFootprint",
 		calculate:"calculateAllMoney",
 		replaceCartDetail:"replaceCartDetail",
 	}),
 	changeSpecgoods(id,index,index1){
 		var value_ids_arr = [];
 		value_ids_arr = this.value_ids.split('_');
 		value_ids_arr[index] = id;
 		this.value_ids = value_ids_arr.join('_');
 		for(var i = 0;i < this.goodsDetail.spec_goods.length;i ++ ){
 			if (this.goodsDetail.spec_goods[i].value_ids == this.value_ids) {
 				for(var j = 0;j < this.spec_value_select[index].length;j ++ ){
		 			this.spec_value_select[index][j] = false;
		 		}
		 		this.spec_value_select[index][index1] = true;
 				this.value_names = this.goodsDetail.spec_goods[i].value_names;
 				this.spec_goods_price = this.goodsDetail.spec_goods[i].price;
 				this.spec_goods_id = this.goodsDetail.spec_goods[i].id;
 				break;
 			}
 		}
 	},
 	getLocationPoint(e){
 		this.lng = e.point.lng;
 		this.lat = e.point.lat;
 		let geoCoder = new BMap.Geocoder();
 		geoCoder.getPoint(this.addressKeyword,point=>{
 			this.selectedLng = point.lng;
 			this.selectedLat = point.lat;
 		});
 		geoCoder.getLocation(e.point,res=>{
 			this.address = res.address;
 			setTimeout(()=>{
	 			this.isShowMap = false;
 			},1000)
 		})
 	},
	back(){
		// 返回实现
		this.$router.go(-1);
	},
	getGoodsDetail(){
		this.$homehttp({
			url:'goodsdetail/' + this.id
		}).then(result=>{
			const {code,msg,data} = result.data;
			if (code == 200) {
				this.goodsDetail = data;
				this.value_names = data.spec_goods[0].value_names;
				this.value_ids = data.spec_goods[0].value_ids;
				this.spec_goods_id = data.spec_goods[0].id;
				for(var i = 0;i < data.type.specs.length;i ++){
					this.spec_value_select[i] = new Array();
					this.spec_value_select[i][0] = true;
				}
				this.spec_goods_price = data.goods_price;
 				this.isShowDetail=true;
			}else{
				this.$message({message:msg,type:warning})
			}
		})
	},
	showAddnum(){
		// 商品加入购物车的显示
		this.isShowAddnum = true;
	},
	hideAddnum(){
		// 商品加入购物车的隐藏
		this.isShowAddnum = false;
	},
	goodsDel(){
		// 商品数量减少
		if (this.buyNum <= 1) {
			this.buyNum = 1;
		}else{
			this.buyNum --;
		}
	},
	goodsAdd(){
		// 商品数量增加
		this.buyNum ++;
	},
	goToCart(){
		// 去购物车模块
		this.$router.push("/cart");
	},
	enterShopDetail(id){
		this.$router.push({name:"shopDetail",query:{id:id}});
	},
	addToCollect(id){
		var collectArr = this.collectArr;
		var userinfo = JSON.parse(localStorage.getItem('userinfo'));
		if (userinfo == '' || userinfo == undefined) {
			this.noLogin = true;
			setTimeout(()=>{
				this.noLogin = false;
			},2000)
		}else{
			var isInCollect = false;
			for(var i = 0;i < collectArr.length;i ++ ){
				if (collectArr[i] == id) {
					isInCollect = true;
				}
			}
			if (!isInCollect) {
				this.isShowCollectSuccess = true;
				this.addCollectGoods(id);
			}else{
				this.isShowCollectFailed = true;
			}
			setTimeout(()=>{
				this.isShowCollectSuccess = false;
				this.isShowCollectFailed = false;
			},2000)
		}
	},
	addToCart(id,number){
		var goodsNotInArr = true;
		var userinfo = JSON.parse(localStorage.getItem('userinfo'));
		var user_id = userinfo ? userinfo.user_id : 0;
		for(var i = 0;i < this.arr.length;i ++ ){
			if (this.arr[i].spec_goods_id == this.spec_goods_id && this.arr[i].goods_id == id) {
				this.arr[i].number += number;
				goodsNotInArr = false;
				break;
			}
		}
		if (goodsNotInArr) {
			if (typeof(this.arr) == 'string' ) {
				this.arr = [];
			}
			this.arr.push({user_id:user_id,goods_id:id,spec_goods_id:this.spec_goods_id,shop_is_selected:1,goods_is_selected:1,number:number});
		}
		this.$homehttp({
 			url:'cart',
 			method:'post',
 			data:this.arr
 		}).then(result=>{
 			const {code,msg,data} = result.data;
 			if (code == 200) {
 				for(var i = 0;i < data.length;i ++ ){
 					if (typeof(data[i].spec_goods.price) == 'string') {
		 				data[i].spec_goods.price = parseFloat(data[i].spec_goods.price);
 					}
 				}
 				this.replaceCartDetail(data);
 			}else{
 				this.$message({message:msg,type:'warning'});
 			}
 		})
		this.calculate();
		this.isShowSuccess = true;
		setTimeout(()=>{
			this.isShowSuccess = false;
		},2000)
	}
 }
}
</script>

<style lang="less" scoped>
@import url("../../less/common.less");
	ul{
		list-style:none;
	}
	.common{
		width:120px;
		height:100px;
		background-color:rgba(0,0,0,0.7);
		border:1px solid rgba(255,255,255,0.7);
		position:absolute;
		top:70%;
		left:50%;
		margin-left:-50px;
		margin-top:-50px;
		.flexColumnCenter();
		z-index:101;
		justify-content:center;
		p{
			margin:0 auto;
			padding:0;
		}
		i{
			padding:10px;
			border-radius:50%;
			font-size:16px;
		}
	}
	.success{
		p{
			color:white;
		}
		.el-icon-check{
			color:white;
			border:1px solid #fff;
		}
	}
	.failed{
		p{
			color:red;
		}
		.el-icon-close{
			color:red;
			border:1px solid red;
		}
	}
	.loginOrNot{
		p{
			color:red;
		}
		.el-icon-close{
			color:red;
			border:1px solid red;
		}
	}
	.map{
		margin:0 auto;
		max-width:800px;
		width:100%;
		height:100%;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		background-color:rgba(0,0,0,0.7);
		z-index:100;
		transition:all 1s;
		.bmView{
			background-color:#fff;
		}
		.el-input{
			width:50%;
			background-color:#fff;
			position:absolute;
			left:25%;
			bottom:25%;
			z-index:10;
		}
	}
	.addnum-box{
		margin:0 auto;
		max-width:800px;
		width:100%;
		height:100%;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		background-color:rgba(0,0,0,0.7);
		z-index:100;
		transition:all 1s;
		.addnum{
			position:absolute;
			bottom:0;
			width:100%;
			.flexColumnCenter();
			justify-content:space-between;
			background-color:#fff;
			.addnum-head{
				align-self:flex-start;
				.flexRowCenter();
				img{
					margin-left:10px;
					width:90px;
					height:90px;
					align-self:flex-start;
				}
				.addnum-des{
					margin-left:10px;
					height:90px;
					.flexColumnCenter();
					.price{
						align-self:flex-start;
						color:@mallColor;
						margin-left:5px;
					}
					div{
						.flexRowCenter();
						p{
							margin:0;
							margin-left:5px;
							font-size:12px;
							height:20px;
							line-height:20px;
						}
						.des{
							over-flow:hidden;
						}
						.text{
							color:gray;
						}
					}
				}
			}
			.addnum-spec_goods{
				align-self:flex-start;
				display:flex;
				flex-direction:column;
				.spec{
					.spec_name{
						font-size: 13px;
					    color: #262626;
					    margin: 0 18px;
					    font-weight: 700;
					    height: 40px;
					    line-height: 40px
					}
					.spec_values{
						display:flex;
						flex-direction:row;
						flex-wrap:wrap;
						padding: 0 6px;
					    overflow: hidden;
					    span{
					    	padding: 0 18px;
						    min-width: 20px;
						    max-width: 270px;
						    overflow: hidden;
						    height: 30px;
						    line-height: 30px;
						    float: left;
						    text-align: center;
						    margin-left: 12px;
						    margin-bottom: 10px;
						    font-size: 11px;
						    color: #262626;
						    background: #f2f2f2;
						    border-radius: 15px;
					    }
					    .selected{
						    background:black;
						    color:white;
					    }
					}
				}
			}
			.addnum-count{
				margin-top:10px;
				width:100%;
				.flexRowCenter();
				justify-content:space-between;
				.num-text{
					margin-left:5px;
					color:gray;
					height:30px;
					line-height:30px;
				}
				.modify{
					.flexRowCenter();
					margin-right:5px;
					.el-icon-minus{
						background-color:#f7f7f7;
						margin-right:5px;
						flex:1;
						height:30px;
						line-height:30px;
						text-align:center;
					}
				 	.el-icon-plus{
				 		background-color:#f7f7f7;
						margin-right:5px;
						flex:1;
						height:30px;
						line-height:30px;
						text-align:center;
				 	}
					p{
						width:50px;
						text-align:center;
						flex:2;
						margin-right:5px;
						background-color:#f7f7f7;
						height:30px;
						line-height:30px;
					}
				}
			}
			.addnum-foot{
				width:100%;
				.flexRowCenter();
				.el-button{
					width:50%;
					margin-left:0;
				}
			}
		}
	}
	.detail{
		margin:0 auto;
		max-width:800px;
		height:100%;
		margin-bottom:60px;
		.main{
			width:100%;
			height:100%;
			/deep/ .el-carousel__container{
				img{
					width:100%;
					height:400px;
				}
			}
			.price{
				width:100%;
				height:40px;
				.price-a{
					float:left;
					font-size:24px;
					height:40px;
					line-height:40px;
					color:@mallColor;
					margin:0;
				}
				.price-b{
					margin:0;
					color:gray;
					.el-icon-bottom{
						margin:0;
						width:15px;
						height:15px;
						font-size:15px;
						line-height:15px;
					}
					.el-icon-collection-tag{
						margin:0;
						width:15px;
						height:15px;
						font-size:15px;
						line-height:15px;
					}
					float:right;
					height:40px;
					text-align:center;
					.flexRowCenter();
					div{
						margin-right:5px;
						text-align:center;
						.flexColumnCenter();
						p{
							margin:0;
						}
					}
				}
			}
			.title{
				border-top:1px solid #eee;
				margin-bottom:5px;
				p{
					font-size:16px;
					font-weight:600;
				}
			}
			.choose{
				border-top:1px solid #eee;
				margin-bottom:5px;
				.flexRowCenter();
				.text{
					margin:0 8px;
					color:gray;
				}
				.choose-text{

				}
			}
			.detail-foot{
				margin:0 auto;
				max-width:800px;
				position:fixed;
				bottom:0;
				left:0;
				right:0;
				height:50px;
				z-inde:10;
				background-color:#fff;
				.flexRowCenter();
				.foot-text{
					width:48%;
					height:100%;
					.flexRowCenter();
					div{
						height:100%;
						color:gray;
						width:33.3%;
						.flexColumnCenter();
						justify-content:center;
						.el-icon-chat-dot-square{
							margin-bottom:5px;
						}
						.el-icon-s-shop{
							margin-bottom:5px;
						}
						.el-icon-shopping-cart-2{
							margin-bottom:5px;
						}
						p{
							margin:0;
							font-size:10px;
							line-height:50%;
						}
					}
					.cart-show{
						position:relative;
						.none{
							display:none;
							position:absolute;
							top:-5px;
							right:10px;
							width:15px;
							height:15px;
							border-radius:50%;
							background-color:red;
							text-align:Center;
							line-height:15px;
							font-size:8px;
							color:#fff;
						}
						.cartnumshow{
							position:absolute;
							top:8px;
							right:15px;
							width:15px;
							height:15px;
							border-radius:50%;
							background-color:red;
							text-align:Center;
							line-height:15px;
							font-size:8px;
							color:#fff;
						}
					}
				}
				.foot-button{
					width:52%;
					height:100%;
					.flexRowCenter();
					.el-button{
						margin:0;
						padding:0;
						height:50px;
						width:50%;
						font-size:12px;
						height:100%;
						line-height:56px;
					}
				}
			}
			.address{
				border-top:1px solid #eee;
				margin-bottom:5px;
				.flexRowCenter();
				.address-text{
					color:gray;
					margin:0 8px;
				}
			}
			.transition{
				border-top:1px solid #eee;
				margin-bottom:5px;
				.flexRowCenter();
				.transition-text{
					color:gray;
					margin:0 8px;
				}
			}
			.description{
				border-top:1px solid #eee;
				margin-bottom:5px;
				.flexRowCenter();
				p{
					margin-left:8px;
				}
				p::before{
					content:"";
					display:inline-block;
					width:12px;
					height:12px;
					background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTOU5O+Q5POU5POQ4O+U4PN80P+M4O+Q4O+Q4POQ5POQ4OuQ4O+Q4O+I4PuQ5PJxkAycAAAAPdFJOUwAf+VSoeAvzws7ka7miLboUzckAAADJSURBVBjTY2BgYGCMWVR5VIABDBid/gPBFwjP/JOzQKKtfjGIzf3fEUSJ/N8AJO21Iao3fQbqqA+AcLi/CzCwfGGAAn8HBnlFMIttBoP4R4b4C2BOzk8G3q8M5w3AnPsLGZj/MKwHW8b6/QED4y8G/QQQx14ZSHwCcWYkMOtvAHOAyvqnPf8KcuMvkAGZP9eDjAQaEO/AwDb/D0gj0GiQpRnTQIYIfUR1DopDGexVIZygz8ieC4B6WyzRBOJtBkZ/pAABBZUWOKgAispF5e7ibycAAAAASUVORK5CYII=) no-repeat;
					background-size:12px auto;
					vertical-align: middle;
					margin-top:-2px;
				}
			}
			.shop-message{
				border-top:1px solid #eee;
				margin-bottom:5px;
				.flexRowCenter();
				img{
					width:50px;
					height:50px;
					margin-right:10px;
				}
			}
		}
	}
</style>
