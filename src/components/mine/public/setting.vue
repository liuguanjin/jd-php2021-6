<template>
  	<div class="setting">
  		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p>设置</p>
  		</div>
  		<div class="avatar" @click="toMyMessage">
  			<div>
	  			<img :src="userDetail.avatar?'http://www.liuguanjin.top:8101'+userDetail.avatar:''" alt="我的头像">
	  			<p>{{userDetail.nickname}}</p>
  			</div>
			<p class="enter">></p>
  		</div>
  		<div class="address" @click="toAddress">
  			<p>我的收货地址</p>
			<p class="enter">></p>
  		</div>
  		<div class="user" @click="toMyAccount">
  			<p>账户与安全</p>
  			<p class="enter">></p>
  		</div>
  		<div class="settingarea">
  			<p>地区设置</p>
  			<p class="enter">></p>
  		</div>
  		<div class="sound">
  			<p>音效与通知</p>
  			<p class="enter">></p>
  		</div>
  		<div class="common">
  			<p>通用</p>
  			<p class="enter">></p>
  		</div>
  		<div class="problem">
  			<p>问题反馈</p>
  			<p class="enter">></p>
  		</div>
  		<div class="about">
  			<p>关于</p>
  			<p class="enter">></p>
  		</div>
  		<div class="showleave" @click="showleave">
  			<p>退出当前账户</p>
  		</div>
  		<div class="leave" v-if="show">
  			<div class="leave-text">
  				<p>退出当前账户</p>
  			</div>
  			<div class="leave-confim">
  				<p class="sure" @click="leave">确定</p>
  				<p class="cansel" @click="cansel">取消</p>
  			</div>
  		</div>
  	</div>
</template>

<script>
export default {
	mounted(){
		if (!localStorage.getItem('userinfo')) {
			this.$store.state.cart.uanme = "";
			this.$router.push({path:'/mine'});
		}
	},
 	data(){
	 	return{
	 		show:false,
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
	 		this.$router.push({name:'logsuc',query:{id:this.id}});
	 	},
	 	showleave(){
	 		this.show = true;
	 	},
	 	leave(){
			this.$http({
				url:"homeLogout"
			}).then(result=>{
				if (result.data.code == 200) {
					localStorage.removeItem('userinfo');
			 		this.$store.state.cart.cartArr = [];
			 		this.$store.state.cart.total = 0;
			 		this.$store.state.cart.totalNum = 0;
	 				this.$router.push("/mine");
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
	 	},
	 	cansel(){
	 		this.show = false;
	 	},
	 	toAddress(){
	 		this.$router.push({name:'address',query:{id:this.id}});
	 	},
	 	toMyAccount(){
	 		this.$router.push({name:'myaccount',query:{id:this.id}});
	 	},
	 	toMyMessage(){
	 		this.$router.push({name:'mymessage',query:{id:this.id}});
	 	},
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.setting{
		height:1024px;
		background-color:#eee;
		div{
			background-color:#fff;
			.flexRowCenter();
			justify-content:space-between;
			margin-bottom:1px;
			padding:0 10px;
		}
		.avatar{
			img{
				width:66px;
				height:66px;
				border-radius:50%;
			}
		}
		.head{
			position: relative;
	      	background-color:#eee;
	      	height:44px;
	      	line-height:44px;
	      	display:inherit;
	      	.back{
	      		position:absolute;
	      		left:20px;
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
		.showleave{
			width:100%;
			position:fixed;
			bottom:56px;
			max-width:800px;
			background-color:#FF5C00;
			p{
				margin:10px auto;
				color:white;
			}
		}
		.user{
			margin-bottom:5px;
		}
		.common{
			margin-bottom:5px;
		}
		.leave{
			margin:10px auto;
			width:30%;
			.flexColumnCenter();
			.leave-text{
				width:100%;
				padding:10px;
				color:#d1d1d1;
				border-bottom:1px solid #eee;
				p{
					margin:0 auto;
				}
			}
			.leave-confim{
				width:100%;
				padding:10px;
				.flexRowCenter();
				justify-content:space-between;
				p{
					padding:10px;
					margin:0;
					border:1px solid red;
					border-radius:10px;
				}
				.sure{
					color:red;
				}
				.cansel{
					
				}
			}
		}
	}
</style>
