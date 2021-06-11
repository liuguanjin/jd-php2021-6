<template>
	<div class="person-status">
		<div class="head">
  			<p class="back" @click="back">取消</p>
      		<p class="title">个性签名</p>
      		<p class="save" @click="save">保存</p>
  		</div>
  		<div class="personstatus-input">
			<el-input 
			v-model="personstatus" 
			placeholder="介绍一下自己,让大家了解和关注你~" 
			type="textarea"
		 	maxlength="100"
			show-word-limit
			:autosize="{ minRows: 10, maxRows: 10}"
			>
			</el-input>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				id:0,
				personstatus:"",
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.getSign();
		},
		methods:{
			back(){
				this.$router.push({name:'mymessage',query:{id:this.id}})
			},
			save(){
				this.$homehttp({
					url:'sign/'+this.id,
					method:'put',
					data:{sign:this.personstatus}
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
			getSign(){
				this.$homehttp({
					url:'sign/'+this.id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.personstatus = data;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.person-status{
		.head{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			padding:0 10px;
			background-color:#F6F6F6;
			.title{
				font-size:18px;
			}
			.save{
				color:#f23030;
			}
		}
	}
</style>