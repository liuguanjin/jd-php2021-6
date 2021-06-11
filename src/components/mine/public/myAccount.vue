<template>
	<div class="my-account">
		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="title">账户安全</p>
      		<i class="el-icon-more more"></i>
  		</div>
  		<div class="username">
  			<span>用户名</span>
  			<span>{{userDetail.username}}</span>
  		</div>
  		<div class="phone after">
  			<span>修改手机号码</span>
  			<span>{{userDetail.phone}}</span>
  		</div>
  		<div class="password after">
  			<span>修改登录密码</span>
  		</div>
  		<div class="cancellation after">
  			<span>注销账户</span>
  		</div>
  		<div class="protect after">
  			<span>账户保护</span>
  		</div>
  		<div class="security after">
  			<span>安全中心</span>
  		</div>
  		<div class="internal-password after">
  			<span>内置安全密码</span>
  		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				id:0,
				userDetail:{

				},
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.getUserDetail();
		},
		methods:{
			getUserDetail(){
      			this.$homehttp({
        			url:'user/'+this.id
      			}).then(result=>{
        			const {code,msg,data} = result.data;
        			if (code == 200) {
          				this.userDetail = data;
        			}else{

        			}
      			})
   	 		},
   	 		back(){
	 			this.$router.go(-1);
	 		},
		}
	}
</script>

<style lang="less" scoped>
	.my-account{
		.head{
			width:100%;
			background-color:#eee;
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			height:40px;
			line-height:40px;
			.back{
				margin-left:10px;
			}
			.title{
				font-size:18px;
				font-weight:550;
			}
			.more{
				margin-right:10px;
			}
		}
		.username{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			width:90%;
			margin:0 auto;
			span:nth-child(2){
				margin-right:50px;
			}
		}
		.after{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			width:90%;
			margin:0 auto;
		}
		.after:after{
			content:"";
			display:inline-block;
			width:6px;
			height:6px;
			border-color:#777;
			border-style:solid;
			border-width:2px 2px 0 0;
			-webkit-transform:rotate(45deg);
			transform:rotate(45deg);
		}
	}
</style>