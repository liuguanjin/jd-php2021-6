<template>
	<!-- 后台登录界面 -->
	<div class="admin-login">
		<div class="header">
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
		  	<el-form-item label="验证码" class="verify">
			    <el-input placeholder="请输入验证码" @blur="inputVerify" v-model="loginForm.code">
			    </el-input>
			    <span class="verify-code" @click="generateVerify"><img :src="'http://www.liuguanjin.top:8101'+verify.src" alt="正在加载"></span>
		  	</el-form-item>
		</el-form>
		<div class="button">
			<el-button type="primary" @click="login">登录</el-button>
		    <el-button type="success" @click="regist">注册</el-button>
		</div>
	</div>
</template>

<script>
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
	 			this.$http({
	 				url:'adminlogin',
	 				method:'post',
	 				data:this.loginForm
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
 				this.uanmePrompt = "";
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
 			//通过后端获取验证码
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
	.admin-login{
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		width:100%;
		p{
			margin:0;
			paddding:0;
		}
		.header{
			position: relative;
			width:100%;
			height:44px;
			background-color:#eee;
			line-height:44px;
		    p{
			 	margin:0;
		        text-align:center;
			 	font-weight:bold;
		    }
		    .back{
		    	position:absolute;
				left:10px;
				height:44px;
				margin-left:10px;
				font-size:20px;
				line-height:44px;
				cursor: pointer;
		    }
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
				.flexRowCenter();
				.el-form-item__content{
					margin-left:10px !important;
				}
				.el-input{
					margin:20px 0;
				}
				span{
					height:40px;
					margin-left:10px;
					img{
						height:40px;
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