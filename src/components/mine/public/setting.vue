<template>
  	<div class="setting">
  		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p>设置</p>
  		</div>
  		<div class="avatar cursor" @click="toMyMessage">
  			<div>
	  			<img 
	  			:src="defaultImage" 
	 			v-real-img="'http://www.liuguanjin.top:8101'+userDetail.avatar"
	  			>
	  			<p>{{userDetail.nickname}}</p>
  			</div>
			<p class="enter">></p>
  		</div>
  		<div class="address cursor" @click="toAddress">
  			<p>我的收货地址</p>
			<p class="enter">></p>
  		</div>
  		<div class="user cursor" @click="toMyAccount">
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
	 		defaultImage:this.defaultImage,
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
			.flexRowCenter();
			justify-content:space-between;
			margin-bottom:1px;
			padding:0 10px;
			background-color:#fff;
		}
		.cursor{
			cursor: pointer;
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
	      	display:inherit;
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
      	 	p{
		        margin:0;
		        font-weight:bold;
		        text-align:center;
      		}
		}
		.showleave{
			position:fixed;
			bottom:56px;
			width:100%;
			max-width:800px;
			background-color:#FF5C00;
			cursor: pointer;
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
			.flexColumnCenter();
			width:30%;
			margin:10px auto;
			.leave-text{
				width:100%;
				padding:10px;
				border-bottom:1px solid #eee;
				color:#d1d1d1;
				p{
					margin:0 auto;
				}
			}
			.leave-confim{
				.flexRowCenter();
				justify-content:space-between;
				width:100%;
				padding:10px;
				p{
					margin:0;
					padding:10px;
					border:1px solid red;
					border-radius:10px;
				}
				.sure{
					color:red;
					cursor: pointer;
				}
				.cansel{
					cursor: pointer;
				}
			}
		}
	}
</style>
