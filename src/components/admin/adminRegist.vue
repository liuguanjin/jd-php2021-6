<template>
  <div id="admin-regist">
  	<!-- 注册界面头部 -->
  	<div class="regist-title">
  		<i class="el-icon-back back" @click="back"></i>
  		<p>注册</p>
  	</div>
    <!-- 注册界面logo -->
  	<div class="logo">
  		<img src="https://person-use.oss-cn-shenzhen.aliyuncs.com/images/cart-login/1.jpg" alt="">	
  	</div>
  	<!-- 账号注册框 -->
  	<el-form ref="form" :model="registerForm" label-width="80px">
	  	<el-form-item label="用户名">
	    	<el-input placeholder="请输入您的账号" @blur="leaveUname" v-model="registerForm.username">
	    	</el-input>
	    	<p :class="show?'prompt-show':'prompt-none'">{{uanmePrompt}}</p>
	  	</el-form-item>
	  	<el-form-item label="密码">
		    <el-input placeholder="请输入您的密码" @blur="leaveUpwd" show-password v-model="registerForm.password">
		    </el-input>
	  	</el-form-item>
	  	<el-form-item label="确认密码">
		    <el-input placeholder="请确认您的密码" @blur="leaveReUpwd" show-password v-model="reUpwd">
		    </el-input>
	  	</el-form-item>
	  	<el-form-item label="验证码">
		    <el-input placeholder="请输入验证码" v-model="registerForm.code">
		    </el-input>
		    <span class="ver-code" @click="generateVerify"><img :src="verify.src" alt="正在加载"></span>
	  	</el-form-item>
	  	</el-form-item>
	</el-form>
  	<!-- 注册按钮 -->
  	<div class="button">
	    <el-button type="warning" @click="regist">注册</el-button>
	</div>
  	
  </div>
</template>

<script>
import myHead from "../common/head.vue";
export default {
	components:{
 		"my-head":myHead,
 	},
 	data(){
 		return {
 			uanmePrompt:"",
 			show:false,
 			verify:"",
 			reUpwd:"",
 			isAllowRegist:false,
 			registerForm:{
 				username:"",
 				password:"",
 				code:"",
 			},
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.generateVerify();
 	},
 	methods:{
 		leaveUname(){
 			//用户名注册限制
 			var uname = this.registerForm.username;
 			if (uname == "") {
 				this.uanmePrompt = "用户名不允许为空";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}
 			var Reg = /[^\u4E00-\u9FA5\w]/;
 			var result = Reg.test(uname);
 			if (result) {
 				this.uanmePrompt = "用户名仅支持中英文、数字和下划线，且不能为纯数字";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}else{
 				this.isAllowRegist = true;
 			}
 			var numReg = /\D/;
 			var numRes = numReg.test(uname);
 			if ( ! numRes) {
 				this.uanmePrompt = "用户名仅支持中英文、数字和下划线，且不能为纯数字";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}else{
 				this.isAllowRegist = true;
 			}
 			var length = 0;
 			for(var i = 0;i < uname.length;i ++){
 				var reg = /[\u4E00-\u9FA5]/;
 				var res = reg.test(uname[i]);
 				if (res) {
 					length += 2;
 				}else{
 					length += 1;
 				}
 			}
 			if (length > 14) {
 				this.uanmePrompt = "用户名不能超过7个汉字或14个字符";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}else{
 				this.isAllowRegist = true;
 			}
 		},
 		leaveUpwd(){
 			//密码注册限制
 			var upwd = this.registerForm.password;
 			if (upwd == "") {
 				this.uanmePrompt = "密码不允许为空";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}
 			var Reg = /^[a-zA-Z]\w{5,17}$/;
 			var result = Reg.test(upwd);
 			if (!result) {
 				this.uanmePrompt = "密码仅支持以字母开头，长度在6-18之间，只能包含字母、数字、下划线";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}else{
 				this.isAllowRegist = true;
 			}
 		},
 		leaveReUpwd(){
 			//验证两次密码是否相同
 			if (this.reUpwd == "") {
 				this.show = true;
 				this.uanmePrompt = "确认密码不允许为空";
 				this.isAllowRegist = false;
 			}else if (this.reUpwd != this.registerForm.password){
 				this.show = true;
 				this.uanmePrompt = "两次密码不一致";
 				this.isAllowRegist = false;
 			}else{
 				this.isAllowRegist = true;
 			}
 		},
 		regist(){
 			//账号密码符合限制后，验证码不为空允许注册
 			this.leaveUname();
 			this.leaveUpwd();
 			this.leaveReUpwd();
			console.log(this.registerForm,this.reUpwd,this.isAllowRegist);
 			if(this.registerForm.code==''){
 				this.show = true;
 				this.uanmePrompt = "验证码不能为空";
 				this.isAllowRegist = false;
 				this.generateVerify();
 			}else{
 				this.isAllowRegist = true;
 			}
 			if (this.isAllowRegist) {
 				this.registerForm.uniqid = this.verify.uniqid;
 				this.$http({
 					url:'adminregister',
 					method:'post',
 					data:this.registerForm
 				}).then(result=>{
 					const {code,msg,data} = result.data;
 					if (code == 200) {
 						this.$message({message:'注册成功,请用此账号登录',type:'success'});
 						setTimeout(()=>{
	 						this.$router.push('/adminLogin');
 						},2000)
 					}else{
 						this.$message({message:msg,type:'warning'});
 						this.uanmePrompt = msg;
 						this.generateVerify();
 					}
 				})
 			}
 		},
 		generateVerify(){
 			// //随机验证码的获取方法
 			// var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 			// var yzm = "";
 			// for(var i = 0;i < 4;i ++ ){
 			// 	var index = parseInt(Math.random()*str.length);
 			// 	yzm += str.charAt(index);
 			// }
 			// this.verify = yzm;
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
 		back(){
 			//返回的实现
			this.$router.go(-1);
		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	#admin-regist{
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		width:100%;
		.regist-title{
			width:100%;
			position: relative;
			background-color:#eee;
			height:44px;
			line-height:44px;
			.back{
				position:absolute;
				margin-left:10px;
				left:10px;
				height:44px;
				line-height:44px;
				font-size:20px;
			}
			p{
				text-align:center;
			 	font-weight:bold;
			 	margin:0;
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
				width:100%;
			}
		}
	}
</style>
