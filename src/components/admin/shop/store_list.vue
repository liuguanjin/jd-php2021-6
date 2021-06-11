<template>
	<div class="store_list">
		<!-- 店铺列表界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			<el-breadcrumb-item>店铺列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索店铺"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getStoresList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加商品会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addStore">
					<el-button type="primary" @click="showAddStore">添加店铺</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部店铺列表表格 -->
		<el-table
	    :data="storeList"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="center"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="shop_name"
	    	label="店铺名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="shop_logo"
	    	label="店铺图片"
	    	align="center"
	    	>
		    	<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.shop_logo" alt="正在加载">
		      	</template>
	    	</el-table-column> 
    	 	<el-table-column
	    	prop="collect"
	    	label="收藏人数"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="admin_name"
	    	label="所属管理员"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editStore(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteStore(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
	    </el-table>
	    <!-- 添加店铺会话 -->
	  	<el-dialog 
	  	title="添加店铺" 
	  	:visible.sync="isShowAddStore"
	  	destroy-on-close
	  	>
	  		<el-form :model="addStoreData">
			    <el-form-item 
			    label="店铺名称" 
			    >
			      	<el-input 
			      	v-model="addStoreData.shop_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="店铺排序" 
			    >
			      	<el-input 
			      	v-model="addStoreData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="所属管理员" 
			    >
			      	<el-select
			      	v-model="admin"
			      	clearable
			      	placeholder="请选择管理员"
			      	@change="addAdminChange"
			      	>
				      	<el-option
				      	v-for="item in adminList"
				      	:key="item.id"
				      	:label="item.username"
				      	:value="item.id"
				      	>
				      	</el-option>
		      		</el-select>
			    </el-form-item>
			    <el-form-item 
			    label="店铺图片" 
			    >
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    :on-success = 'addUploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                        <el-button slot="trigger" size="small" type="primary">上传logo</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		    </el-form>
		    <div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddStore = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addStore"
			    >
			    确 定
				</el-button>
			</div>
	    </el-dialog>
	    <!-- 修改店铺会话 -->
	  	<el-dialog 
	  	title="修改店铺" 
	  	:visible.sync="isShowUpdateStore"
	  	destroy-on-close
	  	>
	  		<el-form :model="updateStoreData">
			    <el-form-item 
			    label="店铺名称" 
			    >
			      	<el-input 
			      	v-model="updateStoreData.shop_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="店铺排序" 
			    >
			      	<el-input 
			      	v-model="updateStoreData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="所属管理员" 
			    >
			      	<el-select
			      	v-model="admin"
			      	clearable
			      	placeholder="请选择管理员"
			      	@change="editAdminChange"
			      	>
				      	<el-option
				      	v-for="item in adminList"
				      	:key="item.id"
				      	:label="item.username"
				      	:value="item.id"
				      	>
				      	</el-option>
		      		</el-select>
			    </el-form-item>
			    <el-form-item 
			    label="店铺图片" 
			    >
			    	<img :src="'http://www.liuguanjin.top:8101'+updateStoreData.shop_logo" alt="正在加载">
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="updateFileList"
                    :on-success = 'updateUploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                        <el-button slot="trigger" size="small" type="primary">重新上传logo</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		    </el-form>
		    <div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowUpdateStore = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateStore"
			    >
			    确 定
				</el-button>
			</div>
	    </el-dialog>
	</div>
</template>

<script>
var token = localStorage.getItem('token');
export default {
	data(){
		return {
			keyword:"",
			isShowAddStore:false,
			isShowUpdateStore:false,
			storeList:[],
			addStoreData:{
				shop_name:"",
				sort:"",
				shop_logo:"",
				admin_id:"",
			},
			updateStoreData:{
				shop_name:"",
				sort:"",
				shop_logo:""
			},
			fileList:[],
			updateFileList:[],
			myHeader:{
				Authorization:token
			},
			myData:{
				type:'shop'
			},
			admin:"",
			adminList:[],
		}
	},
	mounted(){
		this.getStoresList();
		this.getAdminList();
	},
	methods:{
		getStoresList(keyword=""){
			this.$http({
				url:'store?keyword='+keyword
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.storeList = data;
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		getAdminList(){
			this.$http({
				url:'alladmin'
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.adminList = data;
				}
			})
		},
		addAdminChange(row){
			this.addAdminData.admin_id = row;
		},
		editAdminChange(row){
			this.updateStoreData.admin_id = row;
		},
		showAddStore(){
			this.isShowAddStore = true;
		},
		editStore(id){
			this.isShowUpdateStore = true;
			this.$http({
				url:'store/'+id,
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.updateStoreData = data;
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		deleteStore(id){
			this.$http({
				url:'store/'+id,
				method:'delete'
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.$message({message:'删除店铺成功',type:'success'});
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		updateStore(){
			this.$http({
				url:'store/'+this.updateStoreData.id,
				method:'put',
				data:this.updateStoreData
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.$message({message:'修改店铺成功',type:'success'});
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		addStore(){
			this.$http({
				url:'store',
				method:'post',
				data:this.addStoreData
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.$message({message:'添加店铺成功',type:'success'});
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		beforeAvatarUpload(file) {
	        var isRightImage = false;
	        var isLt10M = file.size / 1024 / 1024 < 10;
	        if(file.type === 'image/jpeg'
	        	|| file.type === 'image/jpg'
	        	|| file.type === 'image/png'
	        	|| file.type === 'image/gif'){

	        	isRightImage = true;
	       	}
	        if (!isRightImage) {
	          this.$message.error('上传头像图片只能是 jpg/jpeg/png/gif 格式!');
	        }
	        if (!isLt10M) {
	          this.$message.error('上传头像图片大小不能超过 10MB!');
	        }
	        return isRightImage && isLt10M;
      	},
      	handleRemove(file, fileList) {
    		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
  		},
  		beforeRemove(file, fileList) {
    		return this.$confirm(`确定移除 ${ file.name }？`);
  		},
  		addUploadSuccess(response,file,fileList){
      		this.$message({message:`${file.name}上传成功`,type:'success'});
      		this.addStoreData.shop_logo = response.data;
		},
		updateUploadSuccess(response,file,fileList){
      		this.$message({message:`${file.name}上传成功`,type:'success'});
      		this.updateStoreData.shop_logo = response.data;
		},
		uploadError(){
      		this.$message({message:'上传失败，请检查上传地址',type:'warning'})
      	},
	}
}
</script>

<style lang="less" scoped>
	.el-row{
		margin-top:10px;
		margin-bottom:10px;
	}
	.search{
		margin-top:10px;
		display:flex;
		flex-direction:row;
	}
	.el-dialog{
		.el-button{
			margin-top:10px;
		}
	}
	.el-form-item{
		img{
			width:50px;
			height:50px;
		}
	}
	.cell{
		img{
			width:50px;
			height:50px;
		}
	}
</style>