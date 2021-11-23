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
			      	<img 
			      	:src="defaultImage" 
		 			v-real-img="'http://www.liuguanjin.top:8101'+item.pics_sma"
			      	>
			    </el-carousel-item>
		  	</el-carousel>
		  	<div class="top">
		  		<!-- 商品价格 -->
			  	<div class="price">
			  		<p class="price-a">¥{{goodsDetail.goods_price}}</p>
			  		<div class="price-b">
			  			<div>
			  				<i class="el-icon-bottom money"></i>
					  		<p>降价提醒</p>
			  			</div>
			  			<div @click="addToCollect(id)" class="add-collect">
			  				<i class="el-icon-collection-tag money"></i>
			  				<p>收藏</p>
			  			</div>
			  		</div>
			  	</div>
			  	<!-- 商品标题 -->
			  	<div class="title">
			  		<p>{{goodsDetail.goods_name}}</p>
			  	</div>
		  	</div>
		  	<div class="center">
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
		  	</div>
		  	<div class="evaluate">
		  		<div class="evaluate-top">
		  			<div class="evaluate-top-left">
		  				<span>评价</span>
		  				<span>{{evaluateData.length}}</span>
		  			</div>
		  			<div class="evaluate-top-right">
		  				<span @click="toGoodsEvaluate()">
		  					好评度{{haopingPercent}}
		  					<i 
		  					class="el-icon-arrow-right"
		  					>
		  					</i>
	  					</span>
		  			</div>
		  		</div>
		  		<!-- 商品页只展示至多两个评论 -->
		  		<div class="evaluate-content">
		  			<div class="none-evaluate" v-if="evaluateData.length == 0">
		  				暂无评价
		  			</div>
		  			<div v-else>
		  				<div class="evaluate-item">
		  					<div 
		  					class="evaluate-item-top">
		  						<div class="evaluate-item-top-left">
		  							<img 
		  							class="avatar"
		  							:src="defaultImage" 
		 							v-real-img="'http://www.liuguanjin.top:8101'+evaluateData[0].avatar"
		 							>
		  							<span 
		  							class="nickname"
		  							>
		  								{{evaluateData[0].nickname}}
		  							</span>
			  						<el-rate
				  					v-model="evaluateData[0].evaluate_describe_score"
				  					disabled
				  					>
									</el-rate>
		  						</div>
		  						<div class="evaluate-item-top-right">
		  							{{evaluateData[0].create_time}}
		  						</div>
		  					</div>
							<div 
							class="evaluate-item-img"
							v-if='evaluateData[0].evaluate_images.length!=0'
							>
								<img
								v-for="(item,index) in evaluateData[0].evaluate_images" 
								:src="defaultImage" 
		 						v-real-img="'http://www.liuguanjin.top:8101'+item.pics_sma"
								>
							</div>
							<div class="evaluate-item-content">
								{{evaluateData[0].content}}
							</div>
		  				</div>
		  				<div class="evaluate-item" v-if="evaluateData.length >= 2">
		  					<div 
		  					class="evaluate-item-top">
		  						<div class="evaluate-item-top-left">
		  							<img 
			  						class="avatar"
			  						:src="defaultImage" 
			 						v-real-img="'http://www.liuguanjin.top:8101'+evaluateData[1].avatar"
			 						>
				  					<span 
				  					class="nickname"
				  					>
				  						{{evaluateData[1].nickname}}
				  					</span>
				  					<el-rate
					  				v-model="evaluateData[1].evaluate_describe_score"
					  				disabled
					  				>
									</el-rate>
	  							</div>
		  						<div class="evaluate-item-top-right">
		  							{{evaluateData[1].create_time}}
		  						</div>
							</div>
							<div 
							class="evaluate-item-img"
							v-if='evaluateData[1].evaluate_images.length!=0'
							>
								<img
								v-for="(item,index) in evaluateData[1].evaluate_images" 
								:src="defaultImage" 
		 						v-real-img="'http://www.liuguanjin.top:8101'+item.pics_sma"
								>
							</div>
							<div class="evaluate-item-content">
								{{evaluateData[1].content}}
							</div>
		  				</div>
		  			</div>
		  		</div>
		  		<div class="evaluate-footer" @click="toGoodsEvaluate()">
		  			<span>查看全部评价</span>
		  		</div>
		  	</div>
		  	<div class="shop-message">
		  		<div class="shop-message-top">
		  			<img 
		  			:src="defaultImage" 
	 				v-real-img="'http://www.liuguanjin.top:8101'+goodsDetail.shop.shop_logo"
	 				@click="enterShopDetail(goodsDetail.shop.id)"
		  			>
		  			<div class="shop-message-top-right">
		  				<p 
		  				class="shop_name" 
		  				@click="enterShopDetail(goodsDetail.shop.id)"
		  				>
			  				{{goodsDetail.shop.shop_name}}
			  			</p>
			  			<p class="shop_star">
			  				店铺星级
			  				<el-rate
			  				v-model="goodsDetail.shop.score/goodsDetail.shop.score_people"
			  				disabled
			  				>
							</el-rate>
			  			</p>
		  			</div>
		  		</div>
		  		<div class="shop-message-center">
		  			<div class="shop-message-center-left">
		  				<p>{{goodsDetail.shop.collect}}</p>
		  				<p>粉丝人数</p>
		  			</div>
		  			<div class="shop-message-center-center">
		  				<p>{{goodsDetail.shop.goods_num}}</p>
		  				<p>全部商品</p>
		  			</div>
		  			<div class="shop-message-center-right">
		  				<div class="describe">
		  					<span>评价</span>
		  					{{goodsDetail.shop.describe_score/goodsDetail.shop.score_people}} | {{(goodsDetail.shop.describe_score/goodsDetail.shop.score_people) > 4.5 ? '高' : '低'}}
		  				</div>
		  				<div class="logistics">
		  					<span>物流</span>
		  					{{goodsDetail.shop.logistics_score/goodsDetail.shop.score_people}} | {{(goodsDetail.shop.logistics_score/goodsDetail.shop.score_people) > 4.5 ? '高' : '低'}}
		  				</div>
		  				<div class="server">
		  					<span>服务</span>
	  						{{goodsDetail.shop.server_score/goodsDetail.shop.score_people}} | {{(goodsDetail.shop.server_score/goodsDetail.shop.score_people) > 4.5 ? '高' : '低'}}
		  				</div>
		  			</div>
		  		</div>
		  		<div class="shop-message-bottom">
		  			<p>
		  				<i class="el-icon-star-off"></i>
		  				收藏店铺
		  			</p>
		  			<p 
		  			@click="enterShopDetail(goodsDetail.shop.id)"
		  			>
		  				<i class="el-icon-s-shop"></i>
		  				进入店铺
		  			</p>
		  		</div>
		  		
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
			  			<img 
			  			:src="defaultImage" 
		 				v-real-img="'http://www.liuguanjin.top:8101'+goodsDetail.goods_images[0].pics_sma"
			  			>
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
 		defaultImage:this.defaultImage,
 		location:{
 			lng:116.404,
 			lat:39.915
 		},
 		zoom:12.8,
 		address:"北京朝阳区三环到四环之间",
 		spec_value_select:[],
 		spec_goods_price:0,
 		spec_goods_id:"",
 		//评论内容的数组
 		evaluateData:[],
 		//好评率
 		haopingPercent:'100%',
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
 	/*
 	var date = new Date();
 	let y = date.getFullYear();
	let m = date.getMonth()+1;
	m = m < 10 ? "0" + m : m;
	let d = date.getDate();
	d = d < 10 ? "0" + d : d;
	date = y + "-" + m + "-" + d;
	*/
	//获取精确到秒的时间戳
	var date = parseInt(new Date().getTime()/1000);
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
 	this.getGoodsDetail();
  	this.getEvaluate();
 },
 mounted(){
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
 	getEvaluate(){
 		this.$homehttp({
 			url:'goods-evaluate/'+this.id
 		}).then(result=>{
 			const {code,msg,data} = result.data;
 			if(code == 200){
 				this.evaluateData = data.data;
 			}
 		})
 	},
 	getHaoPingPercent(){
 		this.$homehttp({
 			url:'goods-haoping_percent/'+this.id
 		}).then(result=>{
 			const {code,msg,data} = result.data;
 			if(code == 200){
 				this.haopingPercent = data;
 			}
 		})
 	},
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
	//去商品评论界面
	toGoodsEvaluate(){
		this.$router.push({name:'goodsEvaluate',query:{id:this.id}})
	},
	//获取商品详情
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
	p{
		margin: 0;
		padding: 0;
	}
	.back{
		cursor: pointer;
	}
	.common{
		position:absolute;
		top:70%;
		left:50%;
		.flexColumnCenter();
		justify-content:center;
		z-index:101;
		width:120px;
		height:100px;
		margin-left:-50px;
		margin-top:-50px;
		border:1px solid rgba(255,255,255,0.7);
		background-color:rgba(0,0,0,0.7);
		p{
			margin:0 auto;
			padding:0;
		}
		i{
			padding:10px;
			font-size:16px;
			border-radius:50%;
		}
	}
	.success{
		p{
			color:white;
		}
		.el-icon-check{
			border:1px solid #fff;
			color:white;
		}
	}
	.failed{
		p{
			color:red;
		}
		.el-icon-close{
			border:1px solid red;
			color:red;
		}
	}
	.loginOrNot{
		p{
			color:red;
		}
		.el-icon-close{
			border:1px solid red;
			color:red;
		}
	}
	.map{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		z-index:100;
		width:100%;
		max-width:800px;
		height:100%;
		margin:0 auto;
		background-color:rgba(0,0,0,0.7);
		transition:all 1s;
		.bmView{
			background-color:#fff;
		}
		.el-input{
			position:absolute;
			left:25%;
			bottom:25%;
			z-index:10;
			width:50%;
			background-color:#fff;
		}
	}
	.addnum-box{
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		z-index:100;
		width:100%;
		max-width:800px;
		height:100%;
		margin:0 auto;
		background-color:rgba(0,0,0,0.7);
		transition:all 1s;
		.addnum{
			position:absolute;
			bottom:0;
			.flexColumnCenter();
			justify-content:space-between;
			width:100%;
			background-color:#fff;
			.addnum-head{
				.flexRowCenter();
				align-self:flex-start;
				img{
					align-self:flex-start;
					width:90px;
					height:90px;
					margin-left:10px;
				}
				.addnum-des{
					.flexColumnCenter();
					height:90px;
					margin-left:10px;
					.price{
						align-self:flex-start;
						margin-left:5px;
						color:@mallColor;
					}
					div{
						.flexRowCenter();
						p{
							height:20px;
							margin:0;
							margin-left:5px;
							font-size:12px;
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
				display:flex;
				flex-direction:column;
				align-self:flex-start;
				.spec{
					.spec_name{
					    height: 40px;
					    margin: 0 18px;
						font-size: 13px;
					    font-weight: 700;
					    line-height: 40px;
					    color: #262626;
					}
					.spec_values{
						display:flex;
						flex-direction:row;
						flex-wrap:wrap;
					    overflow: hidden;
						padding: 0 6px;
					    span{
						    float: left;
						    overflow: hidden;
						    min-width: 20px;
						    max-width: 270px;
						    height: 30px;
						    margin-left: 12px;
						    margin-bottom: 10px;
					    	padding: 0 18px;
						    background: #f2f2f2;
						    font-size: 11px;
						    line-height: 30px;
						    color: #262626;
						    text-align: center;
						    border-radius: 15px;
						    cursor: pointer;
					    }
					    .selected{
						    background:black;
						    color:white;
					    }
					}
				}
			}
			.addnum-count{
				.flexRowCenter();
				justify-content:space-between;
				width:100%;
				margin-top:10px;
				.num-text{
					height:30px;
					margin-left:5px;
					line-height:30px;
					color:gray;
				}
				.modify{
					.flexRowCenter();
					margin-right:5px;
					.el-icon-minus{
						flex:1;
						height:30px;
						margin-right:5px;
						background-color:#f7f7f7;
						text-align:center;
						line-height:30px;
						cursor: pointer;
					}
				 	.el-icon-plus{
						flex:1;
						height:30px;
						margin-right:5px;
				 		background-color:#f7f7f7;
						text-align:center;
						line-height:30px;
						cursor: pointer;
				 	}
					p{
						flex:2;
						width:50px;
						height:30px;
						margin-right:5px;
						background-color:#f7f7f7;
						text-align:center;
						line-height:30px;
					}
				}
			}
			.addnum-foot{
				.flexRowCenter();
				width:100%;
				.el-button{
					width:50%;
					margin-left:0;
				}
			}
		}
	}
	.detail{
		max-width:800px;
		height:100%;
		margin:0 auto;
		margin-bottom:60px;
		.main{
			background-color:#eee;
			/deep/ .el-carousel__container{
				img{
					width:100%;
					height:400px;
				}
			}
			.top{
				padding-bottom:10px;
				border-bottom-right-radius:30px;
				border-bottom-left-radius:30px;
				background-color:#fff;
				.price{
					height:40px;
					padding:0 20px;
					.price-a{
						float:left;
						height:40px;
						margin:0;
						font-size:24px;
						line-height:40px;
						color:@mallColor;
					}
					.price-b{
						.flexRowCenter();
						float:right;
						height:40px;
						margin:0;
						text-align:center;
						color:gray;
						.el-icon-bottom{
							width:15px;
							height:15px;
							margin:0;
							font-size:15px;
							line-height:15px;
						}
						.el-icon-collection-tag{
							width:15px;
							height:15px;
							margin:0;
							font-size:15px;
							line-height:15px;
						}
						div{
							.flexColumnCenter();
							margin-right:5px;
							text-align:center;
							p{
								margin:0;
							}
						}
						.add-collect{
							cursor: pointer;
						}
					}
				}
				.title{
					margin-top:10px;
					padding:0 20px;
					p{
						font-size:16px;
						font-weight:600;
					}
				}
			}
			.center{
				margin-top:20px;
				padding:0 10px;
				background-color:#fff;
				border-radius:30px;
				p{
					margin:10px 0;
				}
				.choose{
					.flexRowCenter();
					margin-bottom:5px;
					border-top:1px solid #eee;
					cursor: pointer;
					.text{
						margin:0 8px;
						color:gray;
					}
					.choose-text{

					}
				}
				.address{
					.flexRowCenter();
					margin-bottom:5px;
					border-top:1px solid #eee;
					.address-text{
						margin:0 8px;
						color:gray;
					}
					.address-detail{
						cursor: pointer;
					}
				}
				.transition{
					.flexRowCenter();
					margin-bottom:5px;
					border-top:1px solid #eee;
					.transition-text{
						margin:0 8px;
						color:gray;
					}
				}
				.description{
					.flexRowCenter();
					margin-bottom:5px;
					border-top:1px solid #eee;
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
			}
			.detail-foot{
				position:fixed;
				bottom:0;
				left:0;
				right:0;
				.flexRowCenter();
				z-index:10;
				max-width:800px;
				height:50px;
				margin:0 auto;
				background-color:#fff;
				.foot-text{
					.flexRowCenter();
					width:48%;
					height:100%;
					div{
						.flexColumnCenter();
						justify-content:center;
						width:33.3%;
						height:100%;
						color:gray;
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
						cursor: pointer;
						.none{
							display:none;
							position:absolute;
							top:-5px;
							right:10px;
							width:15px;
							height:15px;
							background-color:red;
							text-align:Center;
							font-size:8px;
							line-height:15px;
							color:#fff;
							border-radius:50%;
						}
						.cartnumshow{
							position:absolute;
							top:8px;
							right:15px;
							width:15px;
							height:15px;
							background-color:red;
							text-align:Center;
							font-size:8px;
							line-height:15px;
							color:#fff;
							border-radius:50%;
						}
					}
				}
				.foot-button{
					.flexRowCenter();
					width:52%;
					height:100%;
					.el-button{
						width:50%;
						height:100%;
						margin:0;
						padding:0;
						font-size:12px;
						line-height:56px;
					}
				}
			}
			.shop-message{
				display:flex;
				flex-direction:column;
				margin:30px 0;
				padding:20px 0 0 20px;
				background-color: #fff;
				border-radius:30px;
				.shop-message-top{
					display:flex;
					img{
						width:50px;
						height:50px;
						margin-right:10px;
						cursor: pointer;
					}
					.shop-message-top-right{
						.shop_name{
							cursor: pointer;
						}
						.shop_star{
							display:flex;
							margin-top:10px;
							font-size:12px;
						}
					}
					
				}
				.shop-message-center{
					display:flex;
					flex-direction:row;
					justify-content:space-around;
					align-items:center;
					margin:10px 0;
					color:gray;	
					.shop-message-center-left{
						display:flex;
						flex-direction:column;
						justify-content:center;
					}
					.shop-message-center-center{
						display:flex;
						flex-direction:column;
						justify-content:center;
						align-items:center;
					}
					.shop-message-center-right{
						font-size:10px;
						text-align:left;
						color:#e4393c;
						span{
							margin-right:5px;
							color:gray;
						}
					}
				}
				.shop-message-bottom{
					display:flex;
					justify-content:center;
					p{
						margin-right:10px;
						padding:5px;
						border:1px solid #8c8c8c;
						border-radius:15px;
						font-size:12px;
						color:#333;
						cursor: pointer;
					}
				}
			}
			.evaluate{
				margin-top:20px;
				padding-top:20px;
				background-color:#fff;
				border-radius:30px;
				.evaluate-top{
					display:flex;
					flex-direction:row;
					justify-content:space-between;
					align-items:center;
					width:100%;
					.evaluate-top-left{
						margin-left: 20px;
						padding-left: 10px;
						border-left: 2px solid red;
						font-size:16px;
					}
					.evaluate-top-right{
						margin-right:20px;
						font-size:12px;
						color:gray;
						cursor: pointer;
						i{
							color:black;
						}
					}
				}
				.evaluate-content{
					.none-evaluate{
						margin:0 20px 10px 20px;
						text-align:center;
					}
					.evaluate-item{
						margin:30px 0;
						.evaluate-item-top{
							display:flex;
							flex-direction:row;
							justify-content:space-between;
							align-items:center;
							margin:0 20px 10px 20px;
							.avatar{
								width:30px;
								height:30px;
								border:1px solid black;
								border-radius:50%;
							}
							.nickname{
								margin:0 10px;
							}
							.evaluate-item-top-right{
								margin-right:20px;
								color:gray;
							}
						}
						.evaluate-item-img{
							margin-left:20px;
							img{
								width:100px;
								height:100px;
							}
						}
						.evaluate-item-content{
							margin-left:20px;
						}
					}
				}
				.evaluate-footer{
					display:flex;
					flex-direction:row;
					justify-content:center;
					span{
						display:inline-block;
						height:25px;
						margin-bottom:18px;
						padding:0 5px 0 10px;
						border:1px solid gray;
						font-size:12px;
						color:#262626;
						line-height:25px;
						text-align:center;
						border-radius:15px;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
