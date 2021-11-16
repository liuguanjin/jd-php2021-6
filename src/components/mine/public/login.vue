<template>
  <div class="main">
  	<!-- 登录界面logo -->
  	<div class="logo">
  		<img src="https://person-use.oss-cn-shenzhen.aliyuncs.com/images/cart-login/1.jpg" alt="">	
  	</div>
  	<!-- 账号注册框 -->
  	<el-form ref="form" :model="loginForm" label-width="80px">
	  	<el-form-item label="用户名">
	    	<el-input placeholder="请输入您的账号" @blur="leaveInput" v-model="loginForm.username">
	    	</el-input>
	    	<p :class="show?'prompt-show':'prompt-none'">{{uanmePrompt}}</p>
	  	</el-form-item>
	  	<el-form-item label="密码">
		    <el-input placeholder="请输入您的密码" @blur="leaveInput" show-password v-model="loginForm.password">
		    </el-input>
	  	</el-form-item>
	  	<el-form-item label="验证码" class="verify">
		    <el-input placeholder="请输入验证码" @blur="leaveInput" v-model="loginForm.code">
		    </el-input>
		    <span class="verify-code" @click="generateVerify"><img :src="verify.src.indexOf('/')===0?'http://www.liuguanjin.top:8101'+verify.src:verify.src" alt="正在加载"></span>
	  	</el-form-item>
	</el-form>
	<div class="button">
		<el-button type="primary" @click="login">登录</el-button>
	    <el-button type="success" @click="regist">注册</el-button>
	    <el-button type="warning" @click="admin">管理员</el-button>
	</div>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
 	data(){
 		return {
 			loginForm:{
 				username:"",
 				password:"",
 				code:"",
 			},
 			uanmePrompt:"",
 			show:false,
 			verify:{src:'',uniqid:0},
 			isAllowLogin:false,
 		}
 	},
 	computed:{
 		...mapState({
 			arr : state => state.cart.cartArr
 		})
 	},
 	created(){
 		// 生命周期方法
 		this.generateVerify();
 	},
 	methods:{
 		...mapActions({
 			replaceCartArr:"replaceCartArr",
		 	replaceCollectArr:"replaceCollectArr",
	      	replaceCollectNum:"replaceCollectNum",
	      	replaceFootprintArr:"replaceFootprintArr",
	      	replaceFootprinttNum:"replaceFootprinttNum",
 		}),
 		leaveInput(){
 			//输入框的判断
 			var username = this.loginForm.username;
 			var password = this.loginForm.password;
 			var code = this.loginForm.code;
 			if (username == "") {
 				this.uanmePrompt = "请输入用户名";
				this.show = true;
				this.isAllowLogin = false;
 			}else if(password == ""){
 				this.show = true;
 				this.uanmePrompt = "密码不能为空";
				this.isAllowLogin = false;
 			}else if(code == ""){
 				this.show = true;
 				this.uanmePrompt = "验证码不能为空";
				this.isAllowLogin = false;
 			}else{
 				this.show = false;
 				this.uanmePrompt = "";
				this.isAllowLogin = true;
			}
 		},
 		login(){
 			if (this.isAllowLogin) {
 				this.loginForm.uniqid = this.verify.uniqid;
 				this.$http({
 					url:'homeLogin',
 					method:"post",
 					data:this.loginForm
 				}).then(result=>{
 					const {code,msg,data} = result.data;
	 				if (code == 200) {
	 					var userinfo = {};
	 					userinfo = JSON.stringify(data);
	 					localStorage.setItem("userinfo",userinfo);
	 					this.$homehttp({
	 						url:'cart/'+data.user_id
	 					}).then(result=>{
	 						const {code,msg,data} = result.data;
	 						if (code == 200) {
	 							this.replaceCartArr(data);
	 						}else{
	 							this.replaceCartArr([]);
	 						}
	 					})
	 					this.$homehttp({
				          	url:'collect/'+data.user_id
				        }).then(result=>{
				          	const {code,msg,data} = result.data;
				          	if (code == 200) {
				            	this.replaceCollectArr(data);
				            	this.replaceCollectNum(data.length);
				          	}else{

				          	}
				        })
				        this.$homehttp({
				          	url:'footprint/'+data.user_id
				        }).then(result=>{
				          	const {code,msg,data} = result.data;
				          	if (code == 200) {
				            	this.replaceFootprintArr(data);
				            	var num = 0;
				            	for(var i = 0;i < data.length;i ++ ){
				              		for(var j = 0;j < data[i].detail.length; j ++){
				              		}
				              		num += j;
				            	}
				            	this.replaceFootprinttNum(num);
				          	}else{

				          	}
				        })
	 					this.$message({message:'登录成功',type:'success'});
	 					this.$router.push({name:'logsuc',query:{id:data.user_id}});
	 				}else{
	 					this.uanmePrompt = msg;
	 					this.show = true;
	 				}
 				})
 			}
 			this.generateVerify();
 		},
 		regist(){
 			//注册按钮点击跳转到注册界面
 			this.$router.push({path:"/regist"});
 		},
 		generateVerify(){
 			this.$http({
				url:'captcha'
			}).then(result=>{
				var {data,code,msg} = result.data;
				if (code == 200) {
					this.verify = data;
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
 		},
 		//去后台管理界面
 		admin(){
 			this.$router.push({path:'/adminLogin'});
 		}
 	}
}
</script>
<style lang="less" scoped>
	@import url("../../less/common.less");
	.main{
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		width:100%;
		p{
			margin:0;
			paddding:0;
		}
		.logo{
			.flexRowCenter();
			justify-content:center;
			width:100%;
			margin-top:20px;
			img{
				width:100px;
				height:100px;
				border-radius:50%;
			}
		}
		.prompt-show{
			color:red;
		}
		
		.el-form{
			width:100%;
			.verify{
				/deep/ .el-form-item__content{
					display:flex;
					flex-direction:row;
					align-items:center;
				}
			}

			/deep/ .el-form-item{
				display:flex;
				flex-direction:row;
				align-items:center;
				flex-wrap:nowrap;
				.el-form-item__content{
					margin-left:10px !important;
				}
				label{
					text-align:right;
				}
				.el-input{
					margin:20px 0;
				}
				span{
					height:40px;
					margin-left:20px;
					img{
						height:40px;
					}
				}
			}

		}
		.button{
			width:70%;
			.el-button{
				width:26%;
			}
		}
	}
</style>

