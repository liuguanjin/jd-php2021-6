<template>
	<div class="nickname">
		<div class="nickname-top">
			<div class="head">
	  			<p class="back" @click="back">取消</p>
	      		<p class="title">昵称</p>
	      		<p class="save" @click="save">保存</p>
	  		</div>
	  		<div class="nickname-input">
				<el-input v-model="message.nickname" placeholder="请输入您的昵称" @blur="leaveNicknameInput"></el-input>
			</div>
			<p class="tips">{{tipsText}}。也可以试试推荐昵称:</p>
			<div class="nickname-recommend">
				<span v-for="(item,index) in message.nickname_recommend" :key="index" @click="changeNickname(index)">{{item}}</span>
			</div>
		</div>
		<div class="nickname-botoom">
			<p>为什么要设置昵称?</p>
			<div class="nickname-why">
				<i class="el-icon-jdbaohu"></i>
				<div class="why-right">
					<p>保护隐私</p>
					<p>昵称外显,保护您的隐私</p>
				</div>
			</div>
			<div class="nickname-why">
				<i class="el-icon-jdstar-smile-line"></i>
				<div class="why-right">
					<p>个性彰显</p>
					<p>表达你的态度,换掉无聊字符</p>
				</div>
			</div>
			<div class="nickname-why">
				<i class="el-icon-jdxiugai07"></i>
				<div class="why-right">
					<p>随时修改</p>
					<p>你的昵称你做主,想改随时更改</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				id:0,
				message:{
					nickanme:"",
					nickname_recommend:[],
				},
				tipsText:'限7个中文,14个字符以内'
			}
		},
		methods:{
			back(){
				this.$router.push({name:'mymessage',query:{id:this.id}})
			},
			save(){
				this.$homehttp({
					url:'nickname/'+this.id,
					method:'put',
					data:{nickname:this.message.nickname}
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'修改成功',type:'success'});
						setTimeout(()=>{
							this.$router.push({name:'mymessage',query:{id:this.id}});
						},1000)
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			getNickname(){
				this.$homehttp({
					url:'nickname/'+this.id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.message = data;
					}
				})
			},
			leaveNicknameInput(){
				this.$homehttp({
					url:'nickname',
					method:'post',
					data:{nickname:this.message.nickname}
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.tipsText = '当前昵称可用';
						this.message.nickname_recommend = data;
					}else if(code == 400){
						this.tipsText = msg;
						this.message.nickname_recommend = data;
					}
				})
			},
			changeNickname(index){
				this.message.nickname = this.message.nickname_recommend[index];
			},
		},
		created(){
			this.id = this.$route.query.id;
			this.getNickname();
		},
	}
</script>

<style lang="less" scoped>
	.nickname{
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		height:100%;
		min-height:800px;
		background-color:#eee;
		padding-bottom:30px;
		.head{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			padding:0 10px;
			background-color:#eee;
			.title{
				font-size:18px;
			}
			.save{
				color:#f23030;
			}
		}
		.nickname-input{
			margin:10px 0;
			padding:0 10px;
		}
		.tips{
			padding:0 10px;
			font-size:12px;
		}
		.nickname-recommend{
			display:flex;
			flex-direction:row;
			flex-wrap:wrap;
			span{
				margin:10px;
				padding:10px;
				border:1px solid white;
				border-radius:20px;
				cursor:pointer;
			}
		}
		.nickname-botoom{
			align-self:flex-start;
			display:flex;
			flex-direction:column;
			align-items:center;
			width:80%;
			margin:0 auto;
			background-color:white;
			border-radius:20px;
			.nickname-why{
				align-self:flex-start;
				display:flex;
				flex-direction:row;
				align-items:center;
				margin:8px 0;
				i{
					margin:0 20px;
					font-size:20px;
					color:#f23030;
				}
				p{
					padding:5px 0;
					margin:0;
				}
			}
		}
	}
</style>