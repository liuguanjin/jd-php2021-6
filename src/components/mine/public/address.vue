<template>
  	<div class="address">
  		<div class="header">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="head-center">我的收货地址</p>
      		<p @click="addAddress" class="add-address">添加新地址</p>
  		</div>
  		<div class="address-content">
  			<div 
  			class="address-li" 
  			v-for="(item,index) in addressList"
  			:key="index"
  			>
  				<div class="li-span">
	  				<span class="sign">{{item.sign}}</span>
  				</div>
  				<div class="address-message" @click="chooseAddress(index)">
  					<div class="message-header">
  						<span class="consignee">{{item.consignee}}</span>
  						<span class="phone">{{item.phone}}</span>
  					</div>
  					<div class="message-footer">
  						<span 
  						:class="item.is_default == 1 ?'default':'common'">
							{{item.is_default == 1?'默认':item.sign}}
  						</span>
  						<span class="address-text">{{item.area+item.address}}</span>
  					</div>
  				</div>
  				<span class="edit li-span" @click="editAddress(item.id)">编辑</span>
  			</div>
  		</div>
  	</div>
</template>

<script>
	export default {
		created(){
			if (this.$route.query.id) {
				this.user_id = this.$route.query.id;
			}
			if (this.$route.query.goods_ids) {
				this.goods_ids = this.$route.query.goods_ids;
			}
			if (this.$route.query.fromBalance) {
				this.fromBalance = true;
			}
			this.getAddress();
		},
		/*
		beforeRouteEnter(to,from,next){
			if (from.path == '/balance') {
				next(vm=>{
					vm.fromBalance = true;
				})
			}else{
				next(vm=>{
					vm.fromBalance = false;
				})
			}
		},
		*/
		data(){
			return {
				user_id:0,
				addressList:[],
				fromBalance:false,
				goods_ids:[],
			}
		},
		methods:{
			chooseAddress(index){
				if (this.fromBalance) {
					this.$router.push({name:'balance',query:{address:this.addressList[index],goods_ids:this.goods_ids}})
				}
			},
			back(){
				if (this.fromBalance) {
					var arr = this.addressList.filter((element,index,self)=>{
									if (element.is_default == 1) {
										return true;
									}
									return false;
								})
					if (arr.length == 0) {
						arr = this.addressList[0];
					}else{
						arr = arr[0];
					}
					this.$router.push({name:'balance',query:{address:arr,goods_ids:this.goods_ids}})
				}else{
					this.$router.push({name:'setting',query:{id:this.user_id}});
				}
			},
			addAddress(){
				if (this.fromBalance) {
					this.$router.push({name:'addAddress',query:{user_id:this.user_id,fromBalance:true,goods_ids:this.goods_ids}}); 
				}else{
					this.$router.push({name:'addAddress',query:{user_id:this.user_id}});
				}
			},
			getAddress(){
				this.$homehttp({
					url:'address?user_id='+this.user_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.addressList = data;
					}else{

					}
				})
			},
			editAddress(id){
				if (this.fromBalance) {
					this.$router.push({name:'editAddress',query:{id:id,user_id:this.user_id,fromBalance:true,goods_ids:this.goods_ids}}); 
				}else{
					this.$router.push({name:'editAddress',query:{id:id,user_id:this.user_id}});
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.address{
		.header{
		 	position: relative;
	      	height:44px;
	      	background-color:#eee;
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
		        font-weight:bold;
		        text-align:center;
      		}
      		.add-address{
      			position:absolute;
      			right:10px;
      			top:0;
      			height:44px;
		        margin:0;
        		line-height:44px;
        		font-size:16px;
		        text-align:center;
		        cursor: pointer;
      		}
		}
		.address-content{
			display:flex;
			flex-direction:column;
			justify-content:center;
			align-items:center;
			.address-li{
				display:flex;
				flex-direction:row;
				justify-content:center;
				align-items:center;
				width:100%;
				margin:22px 0;
				padding-bottom:10px;
				border-bottom:1px solid #eee;
				.sign{
					display:inline-block;
					overflow: hidden;
					width:25px;
					height:25px;
					background-color:#eee;
					line-height:25px;
					border-radius:50%;
				}
				.li-span{
					width:12%;
					height:20px;
					line-height:20px;
					text-align:center;
				}
				.address-message{
					width:76%;
					cursor: pointer;
					.message-header{
						.consignee{
							margin-right:10px;
							font-size:16px;
						}
						.phone{
							font-size:12px;
							color:#888;
						}
					}
					.message-footer{
						span{
							padding:0 8px;
							font-size:12px;
							text-align:center;
						}
						.default{
							background-color:#FFD6CC;
							color:#FF603F;
						}
						.common{
							background-color:#eee;
							color:#8f8f8f;
						}
						.address-text{
							font-size:14px;
						}
					}
				}
				.edit{
					border-left:1px solid #eee;
					cursor: pointer;
				}
			}
		}
	}
</style>