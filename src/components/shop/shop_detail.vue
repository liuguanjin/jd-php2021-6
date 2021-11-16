<template>
  <div class="shop_detail">
  	<div class="shop_header">
  		<div class="header_left">
  			<div class="img">
  				<img :src="'http://www.liuguanjin.top:8101'+shopDetail.shop_logo" alt="">
  			</div>
  			<div class="shop_name">
  				<p>{{shopDetail.shop_name}}</p>
  				<div class="star">
  					<span>店铺星级</span>
  					<div class="scope">
  						<el-rate
					  	v-model="value"
				 	 	disabled
					  	show-score
					  	text-color="#ff9900"
					  	score-template="{value}"
					  	>
						</el-rate>
  					</div>
  				</div>	
  			</div>
  		</div>
  		<div class="header_right">
  			<div class="collect">
  				<div class="collect-button" v-if="isCollect">
			 		<el-button 
			 		type="danger" 
			 		icon="el-icon-star-on" 
			 		round
			 		@click="collectShop(shopDetail.id)"
			 		>
			 			收藏
			 		</el-button>
			 		
  				</div>
  				<div class="collect-button" v-else>
  					<el-button 
			 		type="danger" 
			 		icon="el-icon-star-on" 
			 		round
			 		@click="cancelCollectShop(shopDetail.id)"
			 		>
			 			已收藏
			 		</el-button>
  				</div>
	  			<div class="collect-allnumer">
	  				{{shopDetail.collect}}名用户已收藏
	  			</div>
  			</div>
  			<div class="more">
  				<el-dropdown trigger="click" @command="handleCommand">
					<i class="el-icon-more"></i>
			      	<el-dropdown-menu slot="dropdown">
			        	<el-dropdown-item icon="el-icon-s-home" command="home">首页</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-search" command="classify">分类搜索</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-shopping-cart-2" command="cart">购物车</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-user" command="mine">个人中心</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-s-data" command="foot">足迹</el-dropdown-item>
			      	</el-dropdown-menu>
			    </el-dropdown>
  			</div>
  		</div>
  	</div>
  	<div class="shop_content">
  		<div class="goods" v-for="(item,index) in shopDetail.goods" :key="index">
  			<img :src="'http://www.liuguanjin.top:8101'+item.goods_logo" alt=""  @click="enterDetail(item.id)">
  			<p class="title"  @click="enterDetail(item.id)">{{item.goods_name}}</p>
  			<p class="price red">${{item.goods_price}}</p>
  			<p class="number red">剩余:{{item.goods_number}}</p>
  		</div>
  	</div>
  </div>
</template>

<script>
	import myHead from "../common/head.vue";
	export default {
		data(){
			return {
				id:"",
				shopDetail:{
					shop_logo:"",
					shop_name:"",
					goods:[

					],
				},
				value:4.5,
				//该用户下已收藏的店铺
				shopCollectArr:[],
				isCollect:true
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.getShopDetail();
			this.getCollectShopArr();
			
		},
		methods:{
			//点击···更多时的跳转
			handleCommand(command){
				switch(command){
					case 'foot':
						this.$router.push('/foot')
						break;
					case 'classify':
						this.$router.push('/classify')
						break;
					case 'cart':
						this.$router.push('/cart')
						break;
					case 'mine':
						this.$router.push('/mine')
						break;
					default:
						this.$router.push('/home')
				}
			},
			//获取该店铺的详情
			getShopDetail(){
				this.$homehttp({
					url:'shopdetail/'+this.id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.shopDetail = data;
						this.value = parseFloat((data.score/data.score_people).toFixed(1));
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//返回上一个界面
			back(){
				this.$router.go(-1);
			},
			//进入商品详情界面
			enterDetail(id){
	 			// 进入商品详情界面
	 			this.$router.push({name:"detail",query:{id:id}});
 			},
 			//获取该用户已收藏的店铺列表
 			getCollectShopArr(){
				var userinfo = JSON.parse(localStorage.getItem('userinfo'));
 				if (userinfo != '' && userinfo != undefined && userinfo != null) {
					var user_id = userinfo.user_id;
	 				this.$homehttp({
	 					url:'collect-shop?user_id='+user_id
	 				}).then(result=>{
	 					const {code,msg,data} = result.data;
	 					if (code == 200) {
	 						this.shopCollectArr = data.shop_ids;
	 						if(this.shopCollectArr.includes(this.id.toString())){
								this.isCollect = false;
							}
	 					}else{

	 					}
	 				})
 				}
 			},
 			//收藏店铺
 			collectShop(id){
				var userinfo = JSON.parse(localStorage.getItem('userinfo'));
 				if (userinfo == '' || userinfo ==undefined || userinfo == null) {
 					this.$message({message:'请先登录',type:'warning'});
 				}else{
 					var user_id = userinfo.user_id;
	 				this.shopDetail.collect += 1;
	 				this.shopDetail.user_id = user_id;
	 				this.shopCollectArr.push(id.toString());
	 				this.shopDetail.shop_ids = this.shopCollectArr;
	 				this.$homehttp({
	 					url:'collect-shop/'+id,
	 					method:'put',
	 					data:this.shopDetail
	 				}).then(result=>{
	 					const {code,msg,data} = result.data;
	 					if (code == 200) {
	 						this.$message({message:'收藏成功',type:'success'});
	 						this.isCollect = false;
	 					}
	 				})
 				}
 			},
 			//取消收藏
 			cancelCollectShop(id){
 				var userinfo = JSON.parse(localStorage.getItem('userinfo'));
 				if (userinfo == '' || userinfo ==undefined || userinfo == null) {
 					this.$message({message:'请先登录',type:'warning'});
 				}else{
 					var user_id = userinfo.user_id;
	 				this.shopDetail.collect -= 1;
	 				this.shopDetail.user_id = user_id;
	 				for(var i = 0;i < this.shopCollectArr.length;i ++ ){
	 					if (this.shopCollectArr[i] == id.toString()) {
	 						this.shopCollectArr.splice(i,1)
	 					}
	 				}
	 				this.shopDetail.shop_ids = this.shopCollectArr;
	 				this.$homehttp({
	 					url:'collect-shop/'+id,
	 					method:'put',
	 					data:this.shopDetail
	 				}).then(result=>{
	 					const {code,msg,data} = result.data;
	 					if (code == 200) {
	 						this.$message({message:'取消收藏成功',type:'success'});
	 						this.isCollect = true;
	 					}
	 				})
 				}
 			},
		}
	}
</script>

<style lang="less" scoped>
	.shop_detail{
		margin-bottom:60px;
		background-color:#eee;
		font-size:14px;
		.shop_header{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			background-color:#400553;
			.header_left{
				display:flex;
				flex-direction:row;
				align-items:center;
				margin:10px;
				img{
					width:60px;
				}
				.shop_name{
					margin-left:10px;
					p{
						color:white;
					}
					p:after{
						content:"";
						display:inline-block;
						width:6px;
						height:6px;
						margin-left:5px;
						margin-bottom:1px;
						border-color:#fff;
						border-style:solid;
						border-width:2px 2px 0 0;
						-webkit-transform:rotate(45deg);
						transform:rotate(45deg);
					}
					.star{
						display:flex;
						flex-direction:row;
						color:white;
					}
				}
			}
			.header_right{
				display:flex;
				flex-direction:row;
				align-items:center;
				margin-right:10px;
				.collect{
					display:flex;
					flex-direction:column;
					align-items:center;
					margin-right:10px;
					.collect-allnumer{
						margin-top:10px;
						color:white;
					}
				}
				.more{
					cursor: pointer;
					.el-dropdown{
						color:white;
					}
				}
			}
		}
		.shop_content{
			display:flex;
			flex-direction:row;
			justify-content:center;
			align-items:center;
			flex-wrap:wrap;
			margin-top:10px;
			.goods{
				display:flex;
				flex-direction:column;
				justify-content:space-between;
				align-items:center;
				width:45%;
				margin:0 10px 10px 10px;
				border-radius:15px;
				background-color:white;
				img{
					width:80%;
					cursor: pointer;
				}
				.title{
					overflow:hidden;
					height:40px;
					margin:5px;
					font-size:14px;
					line-height:20px;
					cursor: pointer;
				}
				.red{
					align-self:flex-start;
					margin:5px;
					font-size:16px;
					line-height:16px;
					color:red;
				}
			}
		}
	}
</style>