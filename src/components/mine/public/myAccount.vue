<template>
	<div class="my-account">
		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="title">账户安全</p>
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
  		<div class="username">
  			<span>用户名</span>
  			<span>{{userDetail.username}}</span>
  			<span></span>
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
		}
	}
</script>

<style lang="less" scoped>
	.my-account{
		.head{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			width:100%;
			height:40px;
			background-color:#eee;
			line-height:40px;
			.back{
				margin-left:20px;
				font-size:20px;
				cursor: pointer;
			}
			.title{
				font-size:18px;
				font-weight:550;
			}
			.more{
				margin-right:20px;
				cursor: pointer;
				.el-dropdown{
					font-size:20px;
				}
			}
		}
		.username{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			width:90%;
			margin:0 auto;
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