<template>
	<!-- 后台登录界面 -->
	<div id="admin-login">
		<div class="tips">
			<i class="el-icon-back back" @click="toHomeLogin"></i>
	        <p>您需要登录才能继续访问</p>
		</div>
		<!-- 登录界面logo -->
	  	<div class="logo">
	  		<img src="https://person-use.oss-cn-shenzhen.aliyuncs.com/images/cart-login/1.jpg" alt="">	
	  	</div>
		<el-form ref="form" :model="loginForm" label-width="80px">
		  	<el-form-item label="用户名">
		    	<el-input placeholder="请输入您的账号" @blur="inputVerify" v-model="loginForm.username">
		    	</el-input>
		    	<p :class="show?'prompt-show':'prompt-none'">{{uanmePrompt}}</p>
		  	</el-form-item>
		  	<el-form-item label="密码">
			    <el-input placeholder="请输入您的密码" @blur="inputVerify" show-password v-model="loginForm.password">
			    </el-input>
		  	</el-form-item>
		  	<el-form-item label="验证码">
			    <el-input placeholder="请输入验证码" @blur="inputVerify" v-model="loginForm.code">
			    </el-input>
			    <span class="ver-code" @click="generateVerify"><img :src="verify.src" alt="正在加载"></span>
		  	</el-form-item>
		  	</el-form-item>
		</el-form>
		<div class="button">
			<el-button type="primary" @click="login">登录</el-button>
		    <el-button type="success" @click="regist">注册</el-button>
		</div>
	</div>
</template>

<script>
import qs from 'qs';
export default {
	mounted(){
		if (localStorage.getItem('token')&&
			localStorage.getItem('token') != '' &&
			localStorage.getItem('token') != 'undefind') {
				this.$router.push({path:"/admin"});
		}
	},
 	data(){
 		return {
 			loginForm:{
 				username:"",
 				password:"",
 				code:"",
 			},
 			uanmePrompt:"",
 			show:false,
 			verify:"",
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.generateVerify();
 		this.loginForm.username="";
		this.loginForm.password="";
		this.loginForm.code="";
 	},
 	methods:{
 		login(){
 			this.inputVerify();
 			if(this.show === false){
 				this.loginForm.uniqid = this.verify.uniqid;
 				var loginForm = qs.stringify(this.loginForm);
	 			this.$http({
	 				url:'adminlogin',
	 				method:'post',
	 				data:loginForm
	 			}).then(result=>{
	 				var callbackcode = result.data.code;
	 				var msg = result.data.msg;
	 				var admininfo = result.data.data;
	 				if (callbackcode == 200) {
	 					this.$router.push("/admin");
	 					this.$message({message:'登录成功',type:'success'});
	 					var token = admininfo.token;
	 					admininfo = JSON.stringify(admininfo);
	 					localStorage.setItem("admininfo",admininfo);
	 					localStorage.setItem("token",token);
	 				}else{
	 					this.uanmePrompt = msg;
	 					this.show = true;
	 				}
	 			})
	 			this.generateVerify();
 			}
 		},
 		inputVerify(){
 			//输入框的判断
 			var username = this.loginForm.username;
 			var password = this.loginForm.password;
 			var code = this.loginForm.code;
 			if (username == "") {
 				this.uanmePrompt = "请输入用户名";
				this.show = true;
 			}else if(password == ""){
 				this.show = true;
 				this.uanmePrompt = "密码不能为空";
 			}else if(code == ""){
 				this.show = true;
 				this.uanmePrompt = "验证码不能为空";
 			}else{
 				this.show = false;
			}
 		},
 		regist(){
 			//注册按钮点击跳转到注册界面
 			this.$router.push({path:"/adminRegist"});
 		},
 		generateVerify(){
 			/*//随机验证码的生成
 			var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 			var yzm = "";
 			for(var i = 0;i < 4;i ++ ){
 				var index = parseInt(Math.random()*str.length);
 				yzm += str.charAt(index);
 			}
 			this.verify = yzm;*/
 			this.$http({
 				url:'captcha',
 			}).then(result=>{
	 				var { data } = result.data;
	 				this.verify = data;
 			})
 		},
 		toHomeLogin(){
 			this.$router.push({'path':'/mine'});
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	#admin-login{
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		width:100%;
		.tips{
			width:100%;
			position: relative;
			background-color:#eee;
			height:44px;
			line-height:44px;
		    p{
		        text-align:center;
			 	font-weight:bold;
			 	margin:0;
		    }
		    .back{
		    	position:absolute;
				margin-left:10px;
				left:10px;
				height:44px;
				line-height:44px;
				font-size:20px;
		    }
		}
		.logo{
			width:100%;
			.flexRowCenter();
			justify-content:center;
			img{
				width:100px;
				height:100px;
				border-radius:50%;
			}
		}
		.el-form{
			width:100%;
			/deep/ .el-form-item{
				.flexRowCenter();
				.el-input{
					margin:20px 0;
				}
				span{
					margin-left:10px;
					height:40px;
					img{
						height:40px;
					}
				}
				/deep/ .el-form-item__content{
					margin-left:0 !important;
					.flexRowCenter();
					p{
						paddding:0;
						margin:0;
						margin-left:15px;
						color:red;
					}
				}
			}
		}
		.button{
			width:65%;
			.el-button{
				width:45%;
			}
		}
	}
</style>