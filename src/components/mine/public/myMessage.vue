<template>
	<div class="my-message">
		<div class="head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="title">个人信息</p>
      		<i class="el-icon-more more"></i>
  		</div>
		<div class="img">
			<img :src="userDetail.avatar?'http://www.liuguanjin.top:8101'+userDetail.avatar:''" alt="正在加载">
			<el-upload
            class="upload-demo"
            action="http://www.liuguanjin.top:8101/logo"
            list-type="picture"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :on-success = 'addUploadSuccess'
            :limit="1"
            :on-error="uploadError"
            name="logo"
            :data="myData"
            >
                <el-button slot="trigger" size="small" type="primary">重新上传头像</el-button>
                <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif/webp文件，且不超过10MB</div>
            </el-upload>
		</div>
		<div class="username">
			<span>用户名</span>
			<span>{{userDetail.username}}</span>
		</div>
		<div class="nickname after" @click="toNickname">
			<span>我的昵称</span>
			<span>{{userDetail.nickname}}</span>
		</div>
		<div class="sex after" @click="showChooseSex">
			<span>性别</span>
			<span>{{userDetail.sex === 0 ? '男' : '女'}}</span>
		</div>
		<div class="sign after" @click="toPersonstatus">
			<span>个性签名</span>
			<span>{{userDetail.sign}}</span>
		</div>
		<div class="sex-choose" v-if="isShowChooseSex" @click.self="hideChooseSex">
			<div class="sex-options">
				<p @click="chooseSex(0)">男</p>
				<p @click="chooseSex(1)">女</p>
			</div>
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
				fileList:[],
				myData:{
					type:'avatar'
				},
				isShowChooseSex:false,
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.getUserDetail();
		},
		methods:{
			//获取用户信息
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
   	 		//返回上一级界面
   	 		back(){
   	 			this.$router.push({name:'setting',query:{id:this.id}})
	 		},
	 		//去修改昵称界面
	 		toNickname(){
	 			this.$router.push({name:'nickname',query:{id:this.id}});
	 		},
	 		//去设置个性签名界面
	 		toPersonstatus(){
	 			this.$router.push({name:'personstatus',query:{id:this.id}});
	 		},
	 		showChooseSex(){
	 			this.isShowChooseSex = true;
	 		},
	 		chooseSex(sex){
	 			this.$homehttp({
	 				url:'sex/'+this.id,
	 				method:'put',
	 				data:{sex:sex}
	 			}).then(result=>{
	 				const {code,msg,data} = result.data;
	 				if (code == 200) {
	 					this.$message({message:'修改成功',type:'success'});
	 					this.getUserDetail();
	 					this.isShowChooseSex = false;
	 				}else{
	 					this.$message({message:msg,type:'warning'});
	 				}
	 			})
	 		},
	 		hideChooseSex(){
	 			this.isShowChooseSex = false;
	 		},
	 		//头像上传前的图片类型判断
	 		beforeAvatarUpload(file) {
		        var isRightImage = false;
		        var isLt10M = file.size / 1024 / 1024 < 10;
		        if(file.type === 'image/jpeg'
		        	|| file.type === 'image/jpg'
		        	|| file.type === 'image/png'
		        	|| file.type === 'image/gif'
		        	|| file.type === 'image/webp'){

		        	isRightImage = true;
		       	}
		        if (!isRightImage) {
		          this.$message.error('上传头像图片只能是 jpg/jpeg/png/gif/webp 格式!');
		        }
		        if (!isLt10M) {
		          this.$message.error('上传头像图片大小不能超过 10MB!');
		        }
		        return isRightImage && isLt10M;
	      	},
	      	//移除已上传的logo 显示移除提示
	      	handleRemove(file, fileList) {
        		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
      		},
      		//在移除前的判断 提示是否移除
      		beforeRemove(file, fileList) {
        		return this.$confirm(`确定移除 ${ file.name }？`);
      		},
      		//添加商品上传logo成功 提示信息 将上传成功的地址添加到数据中
      		addUploadSuccess(response,file,fileList){
      			var avatar_url = {
      				"avatar_url":response.data
      			}
	      		this.$homehttp({
	      			url:'avatar/'+this.id,
	      			method:'post',
	      			data:avatar_url
	      		}).then(result=>{
	      			const {code,msg,data} = result.data;
	      			if (code == 200) {
	      				this.$message({message:`${file.name}上传成功`,type:'success'});
	      				this.getUserDetail();
	      			}else{
	      				this.$message({message:'上传失败，请检查上传地址',type:'warning'});
	      			}
	      		})
			},
			//上传logo失败的逻辑 提示上传失败
			uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'});
	      	},
		}
	}
</script>

<style lang="less" scoped>
	.my-message{
		display:flex;
		flex-direction:column;
		align-items:center;
		height:100%;
		min-height:800px;
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
		.img{
			width:90%;
			display:flex;
			flex-direction:column;
			align-items:center;
			padding:30px 0;
			border-bottom:1px solid #eee;
			img{
				width:100px;
				height:100px;
				border-radius:50%;
				border:1px solid #eee;
			}
			.upload-demo{
				display:flex;
				flex-direction:column;
				align-items:center;
			}
		}
		.username{
			width:90%;
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			padding:16px 0;
			border-bottom:1px solid #eee;
			cursor:pointer;
			span{
				width:50%;
			}
		}
		.after{
			width:90%;
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			padding:16px 0;
			border-bottom:1px solid #eee;
			cursor:pointer;
		}
		.after::after{
			content:"";
			display:inline-block;
			width:6px;
			height:6px;
			margin-top:6px;
			margin-right:6px;
			border-color:#777;
			border-style:solid;
			border-width:2px 2px 0 0;
			-webkit-transform:rotate(45deg);
			transform:rotate(45deg);
		}
		.sex-choose{
			position:fixed;
			bottom:0;
			left:0;
			right:0;
			margin:0 auto;
			max-width:800px;
			width:100%;
			height:100%;
			background-color:rgba(0,0,0,0.7);
			z-index:100;
			transition:all 1s;
			.sex-options{
				position:absolute;
				bottom:100px;
				width:100%;
				background-color:white;
				padding:10px 0;
				p{
					width:60%;
					padding:10px 0;
					margin:30px auto;
					border-bottom:1px solid #eee;
					text-align:center;
					cursor:pointer;
				}
			}
		}
	}
</style>