<template>
	<div class="evaluate">
		<div class="head">
			<i class="el-icon-arrow-left back" @click="back"></i>
			<span class="title">发表评价</span>
			<span class="release" @click="evaluate">发布</span>
		</div>
		<div class="evaluate-goods">
			<div class="goods-top">
				<img :src="'http://www.liuguanjin.top:8101'+evaluateGoods.goods_logo" alt="正在加载">
				<div class="goods-detail">
					<span>{{evaluateGoods.goods_name}}</span>
					<span>{{evaluateGoods.spec_value_names}}</span>
				</div>
			</div>
			<div class="describe">
				<div class="evaluate-grade">
					<span>描述相符</span>
					<span><i class="el-icon-jdhaoping"></i>好评</span>
					<span><i class="el-icon-jddisappointed-full"></i>中评</span>
					<span><i class="el-icon-jddisappointed-full"></i>差评</span>
				</div>
			</div>
			<div class="evaluate-keyword">
				<span v-for="(item,index) in keyword">{{item}}</span>
			</div>
			<textarea 
			placeholder="从多个角度评价宝贝，可以帮助更多想买的人"
			class="evaluate-input"
			rows="10"
			cols="50"
			v-model="evaluateData.content" 
			></textarea>
			<p class="tips">再写<span>10</span>字有机会被精选</p>
			<el-upload
	    	ref="upload"
            class="upload-demo"
            action="http://www.liuguanjin.top:8000/8101"
            :data="myData"
            :auto-upload="false"
        	multiple
            name="images"
            list-type="picture"
            :http-request="handleUpload"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :file-list="imagesList"
            :on-success = 'addImagesSuccess'
            :on-error="uploadError"
            >
                <el-button slot="trigger" size="small" type="primary">上传宝贝图片</el-button>
                <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">上传宝贝图片后点击上传服务器，jpg/jpeg/png/gif文件，且不超过10MB</div>
            </el-upload>
			<p class="tips">图片+10字有机会被选为<span>精选买家秀</span></p>
		</div>
		<div class="evaluate-shop">
			<span class="shop_name">{{evaluateGoods.shop_name}}</span>
			<div class="rate">
				<span>描述相符</span>
				<el-rate
	  				v-model="value1"
	  				show-text>
				</el-rate>
			</div>
			<div class="rate">
				<span>物流服务</span>
				<el-rate
	  				v-model="value2"
	  				show-text>
				</el-rate>
			</div>
			<div class="rate">
				<span>服务态度</span>
				<el-rate
	  				v-model="value3"
	  				show-text>
				</el-rate>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				id:0,
				evaluateGoods:{

				},
				keyword:[],
				text:"",
				value1:null,
				value2:null,
				value3:null,
				myData:{
					type:'evaluate'
				},
				imagesList:[],
				evaluateData:{
					goods_id:"",
					user_id:"",
					content:"",
					evaluate_images:[],
				}
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getGoods(){
				this.$homehttp({
					url:'evaluate-goods/'+this.id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.evaluateGoods = data;
						this.keyword = this.evaluateGoods.goods.evaluate_keyword.split(',');
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			evaluate(){
				this.evaluateData.goods_id = this.evaluateGoods.goods_id;
				var userinfo = JSON.parse(localStorage.getItem('userinfo'));
				this.evaluateData.user_id = userinfo.user_id;
				this.$homehttp({
					url:'evaluate/'+this.id,
					method:'post',
					data:this.evaluateData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'评论成功',type:'success'});
						this.$router.push('/mine');
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			handleUpload(row){
				this.imagesList.push(row);
			},
			//在上传logo时判断 格式大小是否为指定格式大小
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
      		//上传iamges成功 提示信息 将上传成功的地址添加到数据中
      		addImagesSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
			},
			//上传logo失败的逻辑 提示上传失败
			uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'});
	      	},
	      	submitUpload(){
				this.$refs.upload.submit();
				var fd = new window.FormData();
				fd.append('operator','刘观金');
				fd.append('type','evaluate');
				this.imagesList.forEach(function(file){
					fd.append('images[]',file.file);
				});
				this.$homehttp({
					url:'images',
					method:'post',
					data:fd
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.evaluateData.evaluate_images = data.success;
						this.$message({message:'上传成功',type:'success'});
					}else{
						this.$message({message:msg || data.error.name+'上传失败,失败原因:'+data.error.msg,type:'warning'});
					}
				})
			},
		},
		created(){
			this.id = this.$route.query.id;
			this.getGoods();
		},
	}
</script>

<style lang="less" scoped>
.evaluate{
	background-color:#eee;
	display:flex;
	flex-direction:column;
	align-items:center;
	.el-icon-jdhaoping{
		color:red;
	}
	.el-icon-jddisappointed-full{
		color:gray;
	}
	.evaluate-input{
		border:none;
		outline:none;
	}
	.head{
		width:100%;
		background-color:white;
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
		.release{
			color:#f23030;
			margin-right:10px;
		}
	}
	.evaluate-goods{
		width:88%;
		background-color:white;
		display:flex;
		flex-direction:column;
		border-radius:15px;
		padding:20px;
		margin:10px 0;
		.goods-top{
			display:flex;
			flex-direction:row;
			margin-bottom:20px;
			img{
				width:10%;
				height:10%;
			}
			.goods-detail{
				width:75%;
				display:flex;
				flex-direction:column;
				justify-content:center;
				margin-left:10px;
				span:nth-child(1){
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					margin-bottom:10px;
				}
				span:nth-child(2){
					color:#aaa;
					font-size:14px;
				}
			}
		}
		.describe{
			margin-bottom:20px;
			span:nth-child(2){
				margin-right:10%;
			}
			span:nth-child(3){
				margin-right:8%;
			}
			span:nth-child(1){
				margin-right:10px;
			}
		}
		.evaluate-keyword{
			display:flex;
			flex-direction:row;
			align-items:center;
			flex-wrap:wrap;
			margin-bottom:30px;
			span{
				padding:8px;
				border-radius:30px;
				border:1px solid #aaa;
				margin-right:5%;
				margin-bottom:5px;
				text-align:center;
				height:20px;
				line-height:20px;
			}
		}
		.tips{
			margin-bottom:10px;
			color:#aaa;
			span{
				color:#f23030;
			}
		}
	}
	.evaluate-shop{
		width:88%;
		background-color:white;
		display:flex;
		flex-direction:column;
		border-radius:15px;
		padding:20px;
		margin-bottom:20px;
		.shop_name{
			color:#aaa;
			margin-bottom:20px;
		}
		.rate{
			display:flex;
			flex-direction:row;
			margin-bottom:10px;
			span:nth-child(1){
				margin-right:10px;
			}
			/deep/ .el-rate__item{
				font-size:24px;
			}
		}
	}
}
</style>