<template>
	<div class="addAddress">
		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="head-center">添加收货地址</p>
  		</div>
		<div class="consignee input-box gap">
			<span>收货人</span>
			<input type="text" placeholder="收货人" v-model="addAddressForm.consignee">
		</div>
		<div class="phone input-box gap">
			<span>手机号码</span>
			<input type="text" placeholder="手机号码" v-model="addAddressForm.phone">
		</div>
		<div class="area gap">
			<span>所在地区</span>
			<el-cascader
      		v-model="area"
		    :options="provinceList"
		    :props="areaProp"
    		clearable
    		@change="areaChange"
    		placeholder="所在地区"
    		>
    		</el-cascader>
		</div>
		<div class="address input-box gap">
			<span>详细地址</span>
			<input type="text" placeholder="详细地址:小区、门牌号" v-model="addAddressForm.address">
		</div>
		<div class="sign gap">
			<span>地址标签</span>
			<div class="sign-content" v-if="isSuccess">
				<span 
				class="sign-span" 
				v-for="(item,index) in sign"
				@click="chooseSign(index)"
				:key="index"
				>
					{{item}}
				</span>
				<span class="more-sign" @click="isShowAddsign = true">更多</span>
			</div>
			<div class="addsuccess" v-else  @click="isShowAddsign = true">
				<span>{{chooseSignText}}</span>
			</div>
		</div>
		<div class="is_default gap">
			<span>设为默认地址</span>
			<el-switch 
			v-model="addAddressForm.is_default"
			active-color="#13ce66"
			inactive-color="#eee">
			>
			</el-switch>
		</div>
		<div class="save gap">
			<el-button type="warning" @click="addAddress">保存</el-button>
		</div>
		<div class="add-sign gap" v-if="isShowAddsign">
			<div class="add-sign-bottom">
				<div class="add-header">
					选择地址标签
				</div>
				<div class="add-input">
					<span class="newsign-span">{{newsign}}</span>
					<input 
					type="text" 
					placeholder="可输入自定义标签"
					class="newsign" 
					v-model="newsign"
					>
					<span>√</span>
				</div>
				<span 
				class="add-defaultsign" 
				v-for="(item,index) in sign" 
				:key="index"
				@click="chooseSign(index)"
				>
					{{item}}
				</span>
				<el-button type="warning" @click="addSuccess">完成</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				addAddressForm:{
					user_id:"",
					consignee:"",
					phone:"",
					province:"",
					city:"",
					county:"",
					town:"",
					village:"",
					area:"",
					address:"",
					is_default:0,
					sign:"",
				},
				area:'',
				isShowAddsign:false,
				isSuccess:true,
				provinceList:[],
				newsign:"",
				chooseSignText:"",
				sign:['家','公司','学校'],
				areaProp:{
					lazy:true,
					value:'province_id',
					label:'province_name',
					lazyLoad:(node,resolve)=>{
						//console.log(node);
						const { level} = node;
						const { data } = node;
						if (level == 1){
							this.addAddressForm.area = '';
							this.addAddressForm.area += node.data.province_name;
							this.$homehttp({
								url:'city?province_id='+data.province_id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									province_name:item.city_name,
									province_id:item.city_id,
									city_id:item.city_id,
									leaf:level >= 4,
								}))
								//console.log(res);
								resolve(res);
							})
						} 
						if(level == 2) {
							this.addAddressForm.area += node.data.province_name;
							this.$homehttp({
								url:'county?city_id='+data.city_id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									province_name:item.county_name,
									province_id:item.county_id,
									county_id:item.county_id,
									leaf:level >= 4,
								}))
								//console.log(res);
								resolve(res);
							})
						}
						if(level == 3) {
							this.addAddressForm.area += node.data.province_name;
							this.$homehttp({
								url:'town?county_id='+data.county_id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									province_name:item.town_name,
									province_id:item.town_id,
									town_id:item.town_id,
									leaf:level >= 4,
								}))
								//console.log(res);
								resolve(res);
							})
						}
						if(level == 4) {
							this.addAddressForm.area += node.data.province_name;
							this.$homehttp({
								url:'village?town_id='+data.town_id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									province_name:item.village_name,
									province_id:item.village_id,
									village_id:item.village_id,
									leaf:level >= 4,
								}))
								//console.log(res);
								resolve(res);
							})
						}
					}
				}
			}
		},
		methods:{
			addAddress(){
				this.addAddressForm.sign = this.chooseSignText;
				console.log(this.addAddressForm);
				this.$homehttp({
					url:'address',
					method:'post',
					data:this.addAddressForm
				}).then(result=>{
					const {code,msg} = result.data;
					if (code == 200) {
						this.$message({message:'添加收货地址成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			chooseSign(index){
				this.isSuccess = false;
				this.chooseSignText = this.sign[index];
				this.newsign = '';
				setTimeout(()=>{
					this.isShowAddsign = false;
				},100)
			},
			areaChange(e){
				this.addAddressForm.province = e[0];
				this.addAddressForm.city = e[1];
				this.addAddressForm.county = e[2];
				this.addAddressForm.town = e[3];
				this.addAddressForm.village = e[4];
				this.$homehttp({
					url:'village?village_id='+e[4]
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.addAddressForm.area += data[0].village_name;
					}
				})
			},
			back(){
				this.$router.go(-1);
			},
			addSuccess(){
				this.isShowAddsign = false;
				if (this.newsign != "") {
					this.chooseSignText = this.newsign;
					this.isSuccess = false;
				}
			},
			getProvinceList(){
				this.$homehttp({
					url:'province'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.provinceList = data;
					}else{

					}
				})
			}
		},
		created(){
			this.addAddressForm.user_id = this.$route.query.user_id;
			this.getProvinceList();
		},
	}
</script>

<style lang="less" scoped>
	.addAddress{
		display:flex;
		flex-direction:column;
		align-items:center;
		input{
			margin-left:10px;
			font-size:16px;
			outline:none;
			border:none;
		}
		.gap{
			width:90%;
			margin:30px 0;
		}
		.head{
			width:100%;
		 	position: relative;
	      	background-color:#eee;
	      	height:44px;
	      	line-height:44px;
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
		.input-box{
			border-bottom:1px solid #eee;
			span{
				font-size:16px;
			}
			
		}
		.sign{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			.sign-content{
				display:flex;
				flex-direction:row;
				align-items:center;
			}
			.sign-span{
				display:inline-block;
				width:40px;
				height:40px;
				line-height:40px;
				text-align:center;
				border-radius:15px;
				border:1px solid black;
				background-color:#eee;
				overflow: hidden;
			}
			.more-sign{
				margin-left:10px;
			}
			.more-sign::after{
				content:"";
				display:inline-block;
				width:6px;
				height:6px;
				margin-left:5px;
				margin-bottom:1px;
				border-color:#777;
				border-style:solid;
				border-width:2px 2px 0 0;
				-webkit-transform:rotate(45deg);
				transform:rotate(45deg);
			}
			.addsuccess{
				span{
					display:inline-block;
					width:40px;
					height:40px;
					line-height:40px;
					text-align:center;
					border-radius:15px;
					border:1px solid black;
					background-color:#eee;
					overflow: hidden;
				}
			}
			.addsuccess::after{
				content:"";
				display:inline-block;
				width:6px;
				height:6px;
				margin-left:5px;
				margin-bottom:1px;
				border-color:#777;
				border-style:solid;
				border-width:2px 2px 0 0;
				-webkit-transform:rotate(45deg);
				transform:rotate(45deg);
			}
		}
		.area{
			margin:30px 0;
			.el-cascader{
				margin-left:10px;
			}
		}
		.is_default{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
		}
		.save{
			margin-top:10px;
			.el-button{
				width:100%;
				border-radius:10px;
			}
		}
		.add-sign{
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
			.add-sign-bottom{
				position:absolute;
				bottom:0;
				width:100%;
				display:flex;
				flex-direction:column;
				background-color:#fff;
				.add-header{
					width:100%;
					text-align:center;
				}
				.add-input{
					display:flex;
					flex-direction:row;
					align-items:center;
					justify-content:space-around;
					margin:20px 20px;
					input{
						margin:0 60px 0 60px;
						border-bottom:1px solid #eee;
					}
					span{
						display:inline-block;
						width:20px;
						height:20px;
						line-height:20px;
						text-align:center;
						overflow: hidden;
						color:red;
					}
					.newsign-span{
						border-radius:50%;
						border:1px solid black;
						background-color:#eee;
						color:black;
						width:40px;
						height:40px;
						line-height:40px;
					}
				}
				.add-defaultsign{
					margin:10px 0;
					border-bottom:1px solid #eee;
					text-align:center;
					padding-bottom:5px;
				}
				.el-button{
					border-radius:10px;
					margin:10px 0;
				}
			}
		}
	}
</style>